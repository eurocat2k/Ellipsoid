"use strict";

const Point3D = require('../point3d').Point3D;
const Vector3D = require('../vector3d').Vector3D;

/**
 * @class Matrix3D
 */
class Matrix3D {
    /**
     * @constructor Create an instance of the Matrix3D class
     * @param from - optional - {Array} the array dimension must fit 3x3 matrix
     */
    constructor(from) {
        /** -----------------------------------------------------------------
         * @return Float32Array returns an uninitialized matrix.
         */
        if (!from) {
            this._matrix = new Float32Array(9);
        } else if (from instanceof Array && from.length > 0 && from.length <= 9) {
            this._matrix = new Float32Array(9);
            for (let j = 0, len = from.length; j < 9; j += 1) {
                if (j < len) {
                    this._matrix[j] = from[j];
                } else {
                    this._matrix[j] = 0;
                }
            }
        }
        // Temporary matrices and vectors for calculations. They are reused to
        // prevent new objects from being constantly re-created and then garbage
        // collected.
        this._v2 = new Float32Array(2);
        this._p3 = new Float32Array(3);
        //
    }
    /**
     *
     */
    createFrom(from) {
        if (from instanceof Array && from.length > 0 && from.length <= 9) {
            for (let j = 0, len = from.length; j < len; j += 1) {
                this._matrix[j] = from[j];
            }
        }
    };
    /** -----------------------------------------------------------------
     * M = I (identity Matrix)
     */
    setIdentity() {
        this._matrix[0] = 1;  this._matrix[3] = 0;  this._matrix[6] = 0;
        this._matrix[1] = 0;  this._matrix[4] = 1;  this._matrix[7] = 0;
        this._matrix[2] = 0;  this._matrix[5] = 0;  this._matrix[8] = 1;
        return this;
    };
    _typeOf(value) {
        var type = typeof value;

        switch(type) {
            case 'object':
            return value === null ? 'null' : Object.prototype.toString.call(value).match(/^\[object (.*)\]$/)[1]

            case 'function':
            return 'Function'.toLowerCase();

            default:
            return type;
        }
    }
    static _typeOf(value) {
        var type = typeof value;

        switch(type) {
            case 'object':
            return value === null ? 'null' : Object.prototype.toString.call(value).match(/^\[object (.*)\]$/)[1]

            case 'function':
            return 'Function'.toLowerCase();

            default:
            return type;
        }
    }

    /** -----------------------------------------------------------------
     * @return number Convert the input angle in degrees to radians
     */
    _toRadians(angleInDegrees) {
        return angleInDegrees * Math.PI / 180;
    };
    static _toRadians(angleInDegrees) {
        return angleInDegrees * Math.PI / 180;
    };

    /** -----------------------------------------------------------------
     * @return number Convert the input angle in radians to degrees
     */
    _toDegrees(angleInRadians) {
        return angleInRadians * 180 / Math.PI;
    };
    static _toDegrees(angleInRadians) {
        return angleInRadians * 180 / Math.PI;
    };

    /** -----------------------------------------------------------------
    * To = From (an element-by-element copy)
    * @return To (a 16 element Float32Array)
    */
    copy(From) {
        if (From instanceof Array && From.length == 9) {
            for (let j = 0; j < 9; j += 1) {
                this._matrix[j] = From[j];
            }
        }
        if (From instanceof Matrix3D) {
            for (let j = 0; j < 9; j += 1) {
                this._matrix[j] = From._matrix[j];
            }
        }
        return this;
    };
    static copy(To, From) {
        if (To instanceof Matrix3D) {
            if (From instanceof Array && From.length == 9) {
                for (let j = 0; j < 9; j += 1) {
                    To._matrix[j] = From[j];
                }
            }
            if (From instanceof Matrix3D) {
                for (let j = 0; j < 9; j += 1) {
                    To._matrix[j] = From._matrix[j];
                }
            }
            return To;
        }
    };

    /** -----------------------------------------------------------------
     * R = A * B (Matrix Multiplication); NOTE: order matters!
     */
    static multiply(A, B) {
        let R = new Matrix3D;
        let T1 = new Matrix3D;
        let T2 = new Matrix3D;
        if (A instanceof Matrix3D && B instanceof Matrix3D) {
            // A and B can't change during the operation.
            // If R is the same as A and/or B, Make copies of A and B
            // The comparison must use ==, not ===. We are comparing for identical
            // objects, not if two objects might have the same values.
            if (A._matrix == R._matrix) {
                A = Matrix3D.copy(T1, A);
            }
            if (B == R._matrix) {
                B = Matrix3D.copy(T2, B);
            }

            R._matrix[0] = A._matrix[0] * B._matrix[0]  + A._matrix[3] * B._matrix[1]  + A._matrix[6] * B._matrix[2];
            R._matrix[1] = A._matrix[1] * B._matrix[0]  + A._matrix[4] * B._matrix[1]  + A._matrix[7] * B._matrix[2];
            R._matrix[2] = A._matrix[2] * B._matrix[0]  + A._matrix[5] * B._matrix[1]  + A._matrix[8] * B._matrix[2];

            R._matrix[3] = A._matrix[0] * B._matrix[3]  + A._matrix[3] * B._matrix[4]  + A._matrix[6] * B._matrix[5];
            R._matrix[4] = A._matrix[1] * B._matrix[3]  + A._matrix[4] * B._matrix[4]  + A._matrix[7] * B._matrix[5];
            R._matrix[5] = A._matrix[2] * B._matrix[3]  + A._matrix[5] * B._matrix[4]  + A._matrix[8] * B._matrix[5];

            R._matrix[6] = A._matrix[0] * B._matrix[6]  + A._matrix[3] * B._matrix[7]  + A._matrix[6] * B._matrix[8];
            R._matrix[7] = A._matrix[1] * B._matrix[6]  + A._matrix[4] * B._matrix[7]  + A._matrix[7] * B._matrix[8];
            R._matrix[8] = A._matrix[2] * B._matrix[6]  + A._matrix[5] * B._matrix[7]  + A._matrix[8] * B._matrix[8];
            return R;
        }
    };
    multiply(A) {
        if (A instanceof Matrix3D) {
            // A and B can't change during the operation.
            // If R is the same as A and/or B, Make copies of A and B
            // The comparison must use ==, not ===. We are comparing for identical
            // objects, not if two objects might have the same values.
            let T1 = new Matrix3D;
            //
            if (A._matrix == this._matrix) {
                A = this.copy(T1, A);
            }

            this._matrix[0] = A._matrix[0] * this._matrix[0]  + A._matrix[3] * this._matrix[1]  + A._matrix[6] * this._matrix[2];
            this._matrix[1] = A._matrix[1] * this._matrix[0]  + A._matrix[4] * this._matrix[1]  + A._matrix[7] * this._matrix[2];
            this._matrix[2] = A._matrix[2] * this._matrix[0]  + A._matrix[5] * this._matrix[1]  + A._matrix[8] * this._matrix[2];

            this._matrix[3] = A._matrix[0] * this._matrix[3]  + A._matrix[3] * this._matrix[4]  + A._matrix[6] * this._matrix[5];
            this._matrix[4] = A._matrix[1] * this._matrix[3]  + A._matrix[4] * this._matrix[4]  + A._matrix[7] * this._matrix[5];
            this._matrix[5] = A._matrix[2] * this._matrix[3]  + A._matrix[5] * this._matrix[4]  + A._matrix[8] * this._matrix[5];

            this._matrix[6] = A._matrix[0] * this._matrix[6]  + A._matrix[3] * this._matrix[7]  + A._matrix[6] * this._matrix[8];
            this._matrix[7] = A._matrix[1] * this._matrix[6]  + A._matrix[4] * this._matrix[7]  + A._matrix[7] * this._matrix[8];
            this._matrix[8] = A._matrix[2] * this._matrix[6]  + A._matrix[5] * this._matrix[7]  + A._matrix[8] * this._matrix[8];
            return this;
        }
    };

    /** -----------------------------------------------------------------
     * R = A * B * C * D ... (Matrix Multiplication); NOTE: order matters!
     */
    static multiplySeries() {
        if (arguments.length >= 2) {
            if (arguments[0] instanceof Matrix3D && arguments[1]) {
                let result = Matrix3D.multiply(arguments[0], arguments[1]);
                for (let j = 2; j < arguments.length; j += 1) {
                    if (arguments[j] instanceof Matrix3D) {
                        result = Matrix3D.multiply(result, arguments[j]);
                        return result;
                    }
                }
            }
        }
    };

    /** -----------------------------------------------------------------
     * r = M * v (M is a 3x3 matrix, v is a 2-component vector)
     */
    static multiplyV2(M, v) {
        if (M instanceof Matrix3D && v instanceof Array && v.length == 2) {
            let r = new Float32Array(2);
            // v can't change during the operation. If r and v are the same, make a copy of v
            if (r == v) {
                this._v2[0] = v[0];
                this._v2[1] = v[1];
                v = this._v2;
            }
            r[0] = M._matrix[0] * v[0] + M._matrix[3] * v[1];
            r[1] = M._matrix[1] * v[0] + M._matrix[4] * v[1];
            return r;
        }
    };

    /** -----------------------------------------------------------------
     * r = M * p (M is a 3x3 matrix, p is a 3-component point (x,y,1))
     */
    static multiplyP3(M, p) {
        if (M instanceof Matrix3D && p instanceof Point3D) {
            let r = new Point3D;
            // p can't change during the operation, so make a copy of p.
            if (r._vector == p._vector) {
                this._p3[0] = p._vector[0];
                this._p3[1] = p._vector[1];
                this._p3[2] = p._vector[2];
                p = this._p3;
            }
            r._vector[0] = M._matrix[0] * p._vector[0] + M._matrix[3] * p._vector[1] + M._matrix[6] * p._vector[2];
            r._vector[1] = M._matrix[1] * p._vector[0] + M._matrix[4] * p._vector[1] + M._matrix[7] * p._vector[2];
            r._vector[2] = M._matrix[2] * p._vector[0] + M._matrix[5] * p._vector[1] + M._matrix[8] * p._vector[2];
            return r;
        } else if (M instanceof Matrix3D && p instanceof Vector3D) {
            let r = new Point3D;
            //console.log(r, p);
            // p can't change during the operation, so make a copy of p.
            if (r._vector == p._vector) {
                this._p3[0] = p._vector[0];
                this._p3[1] = p._vector[1];
                this._p3[2] = p._vector[2];
                p = this._p3;
            }
            r._vector[0] = M._matrix[0] * p._vector[0] + M._matrix[3] * p._vector[1] + M._matrix[6] * p._vector[2];
            r._vector[1] = M._matrix[1] * p._vector[0] + M._matrix[4] * p._vector[1] + M._matrix[7] * p._vector[2];
            r._vector[2] = M._matrix[2] * p._vector[0] + M._matrix[5] * p._vector[1] + M._matrix[8] * p._vector[2];
            return r;
        }
    };
    /** -----------------------------------------------------------------
     * Console.log(name, M)
     */
    print(name="Matrix3D") {
        var fieldSize = 11;
        var numText;
        var row, offset, rowText, number;
        console.log(name + ":");
        for (row = 0; row < 3; row += 1) {
            rowText = "";
            for (offset = 0; offset < 9; offset += 3) {
                number = Number(this._matrix[row + offset]);
                numText = number.toFixed(4);
                rowText += new Array(fieldSize - numText.length).join(" ") + numText;
            }
            console.log(rowText);
        }
    };
    static print(name="Matrix3D", M) {
        if (M instanceof Matrix3D) {
            var fieldSize = 11;
            var numText;
            var row, offset, rowText, number;
            console.log(name + ":");
            for (row = 0; row < 3; row += 1) {
                rowText = "";
                for (offset = 0; offset < 9; offset += 3) {
                    number = Number(M._matrix[row + offset]);
                    numText = number.toFixed(4);
                    rowText += new Array(fieldSize - numText.length).join(" ") + numText;
                }
                console.log(rowText);
            }
        }
    };
    /**
     * toString
     */
    toStr(name="Matrix3D") {
        var fieldSize = 11;
        var numText = "";
        var row, offset, rowText, number;
        numText += name + ":";
        for (row = 0; row < 3; row += 1) {
            rowText = "";
            for (offset = 0; offset < 9; offset += 3) {
                number = Number(this._matrix[row + offset]);
                numText = number.toFixed(4);
                rowText += new Array(fieldSize - numText.length).join(" ") + numText;
            }
            numText += rowText;
            //return rowText;
        }
        return numText;
    };
    static toStr(name="Matrix3D", M) {
        if (M instanceof Matrix3D) {
            var fieldSize = 11;
            var numText = "";
            var row, offset, rowText, number;
            numText += name + ":";
            for (row = 0; row < 3; row += 1) {
                rowText = "";
                for (offset = 0; offset < 9; offset += 3) {
                    number = Number(M._matrix[row + offset]);
                    numText = number.toFixed(4);
                    rowText += new Array(fieldSize - numText.length).join(" ") + numText;
                }
                numText += rowText;
                //return rowText;
            }
            return numText;
        }
    };
    /** -----------------------------------------------------------------
     * M = M' (transpose the matrix)
     */
    transpose() {
        var t;
        // The diagonal values don't move; 3 non-diagonal elements are swapped.
        t = this._matrix[1];  this._matrix[1] = this._matrix[3];  this._matrix[3] = t;
        t = this._matrix[2];  this._matrix[2] = this._matrix[6];  this._matrix[6] = t;
        t = this._matrix[5];  this._matrix[5] = this._matrix[7];  this._matrix[7] = t;
        return this;
    };
    static transpose(M) {
        if (M instanceof Matrix3D) {
            var t;
            // The diagonal values don't move; 3 non-diagonal elements are swapped.
            t = M._matrix[1];  M._matrix[1] = M._matrix[3];  M._matrix[3] = t;
            t = M._matrix[2];  M._matrix[2] = M._matrix[6];  M._matrix[6] = t;
            t = M._matrix[5];  M._matrix[5] = M._matrix[7];  M._matrix[7] = t;
            return M;
        }
    };

    /** -----------------------------------------------------------------
     * Set the matrix for scaling.
     * @param M The matrix to set to a scaling matrix
     * @param sx The scale factor along the x-axis
     * @param sy The scale factor along the y-axis
     */
    scale(sx = 1, sy = 1) {
        if (this._typeOf(sx) == 'number' && this._typeOf(sy) == 'number') {
            this._matrix[0] = sx;  this._matrix[3] = 0;   this._matrix[6] = 0;
            this._matrix[1] = 0;   this._matrix[4] = sy;  this._matrix[7] = 0;
            this._matrix[2] = 0;   this._matrix[5] = 0;   this._matrix[8] = 1;
            return this;
        }
    };
    static scale(M, sx, sy) {
        if (M instanceof Matrix3D && this._typeOf(sx) == 'number' && this._typeOf(sy) == 'number') {
            M._matrix[0] = sx;  M._matrix[3] = 0;   M._matrix[6] = 0;
            M._matrix[1] = 0;   M._matrix[4] = sy;  M._matrix[7] = 0;
            M._matrix[2] = 0;   M._matrix[5] = 0;   M._matrix[8] = 1;
            return M;
        }
    };

    /** -----------------------------------------------------------------
     * Set the matrix for translation.
     * @param M The matrix to set to a translation matrix.
     * @param dx The X value of a translation.
     * @param dy The Y value of a translation.
     */
    translate(dx, dy) {
        if (this._typeOf(dx) == 'number' && this._typeOf(dy) == 'number') {
            this._matrix[0] = 1;  this._matrix[3] = 0;  this._matrix[6] = dx;
            this._matrix[1] = 0;  this._matrix[4] = 1;  this._matrix[7] = dy;
            this._matrix[2] = 0;  this._matrix[5] = 0;  this._matrix[8] = 1;
            return this;
        }
    };
    static translate(M, dx, dy) {
        if (M instanceof Matrix3D && this._typeOf(dx) == 'number' && this._typeOf(dy) == 'number') {
            M._matrix[0] = 1;  M._matrix[3] = 0;  M._matrix[6] = dx;
            M._matrix[1] = 0;  M._matrix[4] = 1;  M._matrix[7] = dy;
            M._matrix[2] = 0;  M._matrix[5] = 0;  M._matrix[8] = 1;
            return M;
        }
    };

    /** -----------------------------------------------------------------
     * Set the matrix to a rotation matrix. The axis of rotation axis is the Z axis.
     * @param angle The angle of rotation (degrees)
     */
    rotateZ(angle = 0) {
        if (this._typeOf(angle) == 'number') {
            var s, c;
            angle = this._toRadians(angle);
            s = Math.sin(angle);
            c = Math.cos(angle);
            this._matrix[0] = c;  this._matrix[3] = -s;  this._matrix[6] = 0;
            this._matrix[1] = s;  this._matrix[4] = c;   this._matrix[7] = 0;
            this._matrix[2] = 0;  this._matrix[5] = 0;   this._matrix[8] = 1;
            return this;
        }
    };
    static rotateZ(M = new Matrix3D, angle = 0) {
        if (M instanceof Matrix3D && Matrix3D._typeOf(angle) == 'number') {
            let MR = new Matrix3D;
            Matrix3D.copy(MR,M);
            var s, c;
            angle = Matrix3D._toRadians(angle);
            s = Math.sin(angle);
            c = Math.cos(angle);
            MR._matrix[0] = c;  MR._matrix[3] = -s;  MR._matrix[6] = 0;
            MR._matrix[1] = s;  MR._matrix[4] = c;   MR._matrix[7] = 0;
            MR._matrix[2] = 0;  MR._matrix[5] = 0;   MR._matrix[8] = 1;
            return MR;
        } else {
            //console.log(`${angle} ${typeof angle} instance of ${angle.instance}`);
            console.log(`Z is matrix3d ${M instanceof Matrix3D}, is angle number ${(Matrix3D._typeOf(angle) == 'number') ? 'yes' : 'no'}, it is: [${Matrix3D._typeOf(angle)}]`);
        }
    };
    /** -----------------------------------------------------------------
     * Set the matrix to a rotation matrix. The axis of rotation axis is the Y axis.
     * @param angle The angle of rotation (degrees)
     */
    rotateY(angle = 0) {
        if (this._typeOf(angle) == 'number') {
            var s, c;
            angle = this._toRadians(angle);
            s = Math.sin(angle);
            c = Math.cos(angle);
            this._matrix[0] =  c;  this._matrix[3] = 0;  this._matrix[6] = s;
            this._matrix[1] =  0;  this._matrix[4] = 1;  this._matrix[7] = 0;
            this._matrix[2] = -s;  this._matrix[5] = 0;  this._matrix[8] = c;
            return this;
        }
    };
    static rotateY(M = new Matrix3D, angle = 0) {
        if (M instanceof Matrix3D && Matrix3D._typeOf(angle) == 'number') {
            let MR = new Matrix3D;
            Matrix3D.copy(MR,M);
            var s, c;
            angle = Matrix3D._toRadians(angle);
            s = Math.sin(angle);
            c = Math.cos(angle);
            MR._matrix[0] =  c;  MR._matrix[3] = 0;  MR._matrix[6] = s;
            MR._matrix[1] =  0;  MR._matrix[4] = 1;  MR._matrix[7] = 0;
            MR._matrix[2] = -s;  MR._matrix[5] = 0;  MR._matrix[8] = c;
            return MR;
        } else {
            //console.log(`${angle} ${typeof angle} instance of ${angle.instance}`);
            console.log(`Y is matrix3d ${M instanceof Matrix3D}, is angle number ${(Matrix3D._typeOf(angle) == 'number') ? 'yes' : 'no'}, it is: [${Matrix3D._typeOf(angle)}]`);
        }
    };
    /** -----------------------------------------------------------------
     * Set the matrix to a rotation matrix. The axis of rotation axis is the X axis.
     * @param angle The angle of rotation (degrees)
     */
    rotateX(angle = 0) {
        if (this._typeOf(angle) == 'number') {
            var s, c;
            angle = this._toRadians(angle);
            s = Math.sin(angle);
            c = Math.cos(angle);
            this._matrix[0] = 1;  this._matrix[3] = 0;  this._matrix[6] =  0;
            this._matrix[1] = 0;  this._matrix[4] = c;  this._matrix[7] = -s;
            this._matrix[2] = 0;  this._matrix[5] = s;  this._matrix[8] =  c;
            return this;
        }
    };
    static rotateX(M = new Matrix3D, angle = 0) {
        if (M instanceof Matrix3D && Matrix3D._typeOf(angle) == 'number') {
            let MR = new Matrix3D;
            Matrix3D.copy(MR,M);
            var s, c;
            angle = Matrix3D._toRadians(angle);
            s = Math.sin(angle);
            c = Math.cos(angle);
            MR._matrix[0] = 1;  MR._matrix[3] = 0;  MR._matrix[6] =  0;
            MR._matrix[1] = 0;  MR._matrix[4] = c;  MR._matrix[7] = -s;
            MR._matrix[2] = 0;  MR._matrix[5] = s;  MR._matrix[8] =  c;
            return MR;
        } else {
            //console.log(`${angle} ${typeof angle} instance of ${Matrix3D._typeOf(angle)}`);
            console.log(`X is matrix3d ${M instanceof Matrix3D} it is [${Matrix3D._typeOf(M)}], is angle number ${(Matrix3D._typeOf(angle) == 'number') ? 'yes' : 'no'}, it is: [${Matrix3D._typeOf(angle)}]`);
        }
    };
    /**
     * set rotation matrix for all axes in one step by defining rotation angles for each axises
     * @function rotate
     * @param alpha {Number} angle in degrees for rotation around X axis
     * @param betha {Number} angle in degrees for rotation around Y axis
     * @param gamma {Number} angle in degrees for rotation around Z axis
     */
    rotate(alpha = 0, betha = 0, gamma = 0) {
        let ax = Matrix3D._toRadians(alpha);
        let by = Matrix3D._toRadians(betha);
        let cg = Matrix3D._toRadians(gamma);

        let R = new Matrix3D;
        let MR_RX = Matrix3D.rotateX(R,alpha);
        let MR_RY = Matrix3D.rotateY(R,betha);
        let MR_RZ = Matrix3D.rotateZ(R,gamma);

        //MR_RX.print("MR_RX");
        //MR_RY.print("MR_RY");
        //MR_RZ.print("MR_RZ");

        let MRS = Matrix3D.multiplySeries(MR_RZ, MR_RY, MR_RX);
        //MRS.print("MRS ROTATION MATRIX");

        Matrix3D.copy(this, MRS);

        return this;
    }
    static rotate(M, alpha = 0, betha = 0, gamma = 0) {
        if (M instanceof Matrix3D) {

            let MR = new Matrix3D;
            Matrix3D.copy(MR, M);
            let MR_RX = Matrix3D.rotateX(MR,alpha);
            let MR_RY = Matrix3D.rotateY(MR,betha);
            let MR_RZ = Matrix3D.rotateZ(MR,gamma);

            let MRS = Matrix3D.multiplySeries(MR_RZ, MR_RY, MR_RX);
            return MRS;
        }
    }
    /**
     * List all methods of current class
     * @return Array of method names
     */
    getMethods(){
        let properties = new Set()
        let currentObj = this
        do {
            Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
        } while ((currentObj = Object.getPrototypeOf(currentObj)))
        return {methods: [...properties.keys()].sort().filter(item => typeof this[item] === 'function')};
    };
    static getMethods(m){
        if (m instanceof Matrix3D) {
            let properties = new Set()
            let currentObj = m
            do {
                Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
            } while ((currentObj = Object.getPrototypeOf(currentObj)))
            return {methods: [...properties.keys()].sort().filter(item => typeof m[item] === 'function')};
        }
    };
    /**
     * List all attributes of current class
     * @return Array of attribute names
     */
    getAttrs(){
        let properties = new Set()
        let currentObj = this
        do {
            Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
        } while ((currentObj = Object.getPrototypeOf(currentObj)))
        return {attributes: [...properties.keys()].sort().filter(item => typeof this[item] !== 'function')};
    };
    static getAttrs(m){
        if (m instanceof Matrix3D) {
            let properties = new Set()
            let currentObj = m
            do {
                Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
            } while ((currentObj = Object.getPrototypeOf(currentObj)))
            return {attributes: [...properties.keys()].sort().filter(item => typeof m[item] !== 'function')};
        }
    };
};

exports.Matrix3D = Matrix3D;
