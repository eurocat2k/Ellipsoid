"use strict";
const Vector3D = require('../vector3d').Vector3D;
const Point4D =require('../point4d').Point4D;

class Matrix4D {
    /**
     * @constructor Create an instance of the Learn_webgl_matrix class
     */
    constructor() {
        /** -----------------------------------------------------------------
         * @return Float32Array returns an uninitialized matrix.
         */
        this._matrix = new Float32Array(16);
        // Temporary matrices and vectors for calculations. They are reused to
        // prevent new objects from being constantly re-created and then garbage
        // collected.
        this.V = Vector3D;
        this.v3 = new Vector3D;
        this.axis_of_rotation = new Vector3D;
        this.u = new Vector3D;
        this.v = new Vector3D;
        this.n = new Vector3D;
        this.center = new Vector3D;
        this.eye = new Vector3D;
        this.up = new Vector3D;
     }

    /** -----------------------------------------------------------------
     * M = I (identity Matrix)
     */
    setIdentity() {
        this._matrix[0] = 1;  this._matrix[4] = 0;  this._matrix[8] = 0;  this._matrix[12] = 0;
        this._matrix[1] = 0;  this._matrix[5] = 1;  this._matrix[9] = 0;  this._matrix[13] = 0;
        this._matrix[2] = 0;  this._matrix[6] = 0;  this._matrix[10] = 1; this._matrix[14] = 0;
        this._matrix[3] = 0;  this._matrix[7] = 0;  this._matrix[11] = 0; this._matrix[15] = 1;
    };
    static setIdentity(M) {
        if (M instanceof Matrix4D) {
            M._matrix[0] = 1;  M._matrix[4] = 0;  M._matrix[8] = 0;  M._matrix[12] = 0;
            M._matrix[1] = 0;  M._matrix[5] = 1;  M._matrix[9] = 0;  M._matrix[13] = 0;
            M._matrix[2] = 0;  M._matrix[6] = 0;  M._matrix[10] = 1; M._matrix[14] = 0;
            M._matrix[3] = 0;  M._matrix[7] = 0;  M._matrix[11] = 0; M._matrix[15] = 1;
        }
    };

    /** -----------------------------------------------------------------
     * @return number Convert the input angle in degrees to radians
     */
    _toRadians(angleInDegrees) {
        return angleInDegrees * 0.017453292519943295;  // Math.PI / 180
    };
    /** -----------------------------------------------------------------
     * @return number Convert the input angle in radians to degrees
     */
    _toDegrees(angleInRadians) {
        return angleInRadians * 57.29577951308232;  // 180 / Math.PI
    };

    /** -----------------------------------------------------------------
     * To = From (an element-by-element copy)
     * @return To (a 16 element Float32Array)
     */
    copy(From) {
        if (From instanceof Array && From.length == 16) {
            for (let j = 0; j < 16; j += 1) {
                this._matrix[j] = From[j];
            }
        }
        if (From instanceof Matrix4D) {
            for (let j = 0; j < 16; j += 1) {
                this._matrix[j] = From._matrix[j];
            }
        }
        return this;
    };
    static copy(To, From) {
        if (To instanceof Matrix4D) {
            if (From instanceof Array && From.length == 16) {
                for (let j = 0; j < 16; j += 1) {
                    To._matrix[j] = From[j];
                }
            }
            if (From instanceof Matrix4D) {
                for (let j = 0; j < 16; j += 1) {
                    To._matrix[j] = From._matrix[j];
                }
            }
            return To;
        }
    };

    /** -----------------------------------------------------------------
    * R = A * B (Matrix Multiplication); NOTE: order matters!
    */
    multiply(A) {

        // A and B can't change during the operation.
        // If R is the same as A and/or B, Make copies of A and B
        // The comparison must use ==, not ===. We are comparing for identical
        // objects, not if two objects might have the same values.
        let T1 = new Matrix4D;
        //let R  = new Matrix4D;
        //
        if (A._matrix == this._matrix) {
            A = this.copy(T1, A);
        }

        this._matrix[0]  = this._matrix[0] * A._matrix[0]  + this._matrix[4] * A._matrix[1]  + this._matrix[8]  * A._matrix[2]  + this._matrix[12] * A._matrix[3];
        this._matrix[1]  = this._matrix[1] * A._matrix[0]  + this._matrix[5] * A._matrix[1]  + this._matrix[9]  * A._matrix[2]  + this._matrix[13] * A._matrix[3];
        this._matrix[2]  = this._matrix[2] * A._matrix[0]  + this._matrix[6] * A._matrix[1]  + this._matrix[10] * A._matrix[2]  + this._matrix[14] * A._matrix[3];
        this._matrix[3]  = this._matrix[3] * A._matrix[0]  + this._matrix[7] * A._matrix[1]  + this._matrix[11] * A._matrix[2]  + this._matrix[15] * A._matrix[3];

        this._matrix[4]  = this._matrix[0] * A._matrix[4]  + this._matrix[4] * A._matrix[5]  + this._matrix[8]  * A._matrix[6]  + this._matrix[12] * A._matrix[7];
        this._matrix[5]  = this._matrix[1] * A._matrix[4]  + this._matrix[5] * A._matrix[5]  + this._matrix[9]  * A._matrix[6]  + this._matrix[13] * A._matrix[7];
        this._matrix[6]  = this._matrix[2] * A._matrix[4]  + this._matrix[6] * A._matrix[5]  + this._matrix[10] * A._matrix[6]  + this._matrix[14] * A._matrix[7];
        this._matrix[7]  = this._matrix[3] * A._matrix[4]  + this._matrix[7] * A._matrix[5]  + this._matrix[11] * A._matrix[6]  + this._matrix[15] * A._matrix[7];

        this._matrix[8]  = this._matrix[0] * A._matrix[8]  + this._matrix[4] * A._matrix[9]  + this._matrix[8]  * A._matrix[10] + this._matrix[12] * A._matrix[11];
        this._matrix[9]  = this._matrix[1] * A._matrix[8]  + this._matrix[5] * A._matrix[9]  + this._matrix[9]  * A._matrix[10] + this._matrix[13] * A._matrix[11];
        this._matrix[10] = this._matrix[2] * A._matrix[8]  + this._matrix[6] * A._matrix[9]  + this._matrix[10] * A._matrix[10] + this._matrix[14] * A._matrix[11];
        this._matrix[11] = this._matrix[3] * A._matrix[8]  + this._matrix[7] * A._matrix[9]  + this._matrix[11] * A._matrix[10] + this._matrix[15] * A._matrix[11];

        this._matrix[12] = this._matrix[0] * A._matrix[12] + this._matrix[4] * A._matrix[13] + this._matrix[8]  * A._matrix[14] + this._matrix[12] * A._matrix[15];
        this._matrix[13] = this._matrix[1] * A._matrix[12] + this._matrix[5] * A._matrix[13] + this._matrix[9]  * A._matrix[14] + this._matrix[13] * A._matrix[15];
        this._matrix[14] = this._matrix[2] * A._matrix[12] + this._matrix[6] * A._matrix[13] + this._matrix[10] * A._matrix[14] + this._matrix[14] * A._matrix[15];
        this._matrix[15] = this._matrix[3] * A._matrix[12] + this._matrix[7] * A._matrix[13] + this._matrix[11] * A._matrix[14] + this._matrix[15] * A._matrix[15];

        return this;
    };
    static multiply(A, B) {
        if (A instanceof Matrix4D && B instanceof Matrix4D) {
            // A and B can't change during the operation.
            // If R is the same as A and/or B, Make copies of A and B
            // The comparison must use ==, not ===. We are comparing for identical
            // objects, not if two objects might have the same values.
            let T1 = new Matrix4D;
            let T2 = new Matrix4D;
            let R  = new Matrix4D;
            //
            if (A._matrix == R._matrix) {
                A = Matrix4D.copy(T1, A);
            }
            if (B._matrix == R._matrix) {
                B = Matrix4D.copy(T2, B);
            }

            R._matrix[0]  = A._matrix[0] * B._matrix[0]  + A._matrix[4] * B._matrix[1]  + A._matrix[8]  * B._matrix[2]  + A._matrix[12] * B._matrix[3];
            R._matrix[1]  = A._matrix[1] * B._matrix[0]  + A._matrix[5] * B._matrix[1]  + A._matrix[9]  * B._matrix[2]  + A._matrix[13] * B._matrix[3];
            R._matrix[2]  = A._matrix[2] * B._matrix[0]  + A._matrix[6] * B._matrix[1]  + A._matrix[10] * B._matrix[2]  + A._matrix[14] * B._matrix[3];
            R._matrix[3]  = A._matrix[3] * B._matrix[0]  + A._matrix[7] * B._matrix[1]  + A._matrix[11] * B._matrix[2]  + A._matrix[15] * B._matrix[3];

            R._matrix[4]  = A._matrix[0] * B._matrix[4]  + A._matrix[4] * B._matrix[5]  + A._matrix[8]  * B._matrix[6]  + A._matrix[12] * B._matrix[7];
            R._matrix[5]  = A._matrix[1] * B._matrix[4]  + A._matrix[5] * B._matrix[5]  + A._matrix[9]  * B._matrix[6]  + A._matrix[13] * B._matrix[7];
            R._matrix[6]  = A._matrix[2] * B._matrix[4]  + A._matrix[6] * B._matrix[5]  + A._matrix[10] * B._matrix[6]  + A._matrix[14] * B._matrix[7];
            R._matrix[7]  = A._matrix[3] * B._matrix[4]  + A._matrix[7] * B._matrix[5]  + A._matrix[11] * B._matrix[6]  + A._matrix[15] * B._matrix[7];

            R._matrix[8]  = A._matrix[0] * B._matrix[8]  + A._matrix[4] * B._matrix[9]  + A._matrix[8]  * B._matrix[10] + A._matrix[12] * B._matrix[11];
            R._matrix[9]  = A._matrix[1] * B._matrix[8]  + A._matrix[5] * B._matrix[9]  + A._matrix[9]  * B._matrix[10] + A._matrix[13] * B._matrix[11];
            R._matrix[10] = A._matrix[2] * B._matrix[8]  + A._matrix[6] * B._matrix[9]  + A._matrix[10] * B._matrix[10] + A._matrix[14] * B._matrix[11];
            R._matrix[11] = A._matrix[3] * B._matrix[8]  + A._matrix[7] * B._matrix[9]  + A._matrix[11] * B._matrix[10] + A._matrix[15] * B._matrix[11];

            R._matrix[12] = A._matrix[0] * B._matrix[12] + A._matrix[4] * B._matrix[13] + A._matrix[8]  * B._matrix[14] + A._matrix[12] * B._matrix[15];
            R._matrix[13] = A._matrix[1] * B._matrix[12] + A._matrix[5] * B._matrix[13] + A._matrix[9]  * B._matrix[14] + A._matrix[13] * B._matrix[15];
            R._matrix[14] = A._matrix[2] * B._matrix[12] + A._matrix[6] * B._matrix[13] + A._matrix[10] * B._matrix[14] + A._matrix[14] * B._matrix[15];
            R._matrix[15] = A._matrix[3] * B._matrix[12] + A._matrix[7] * B._matrix[13] + A._matrix[11] * B._matrix[14] + A._matrix[15] * B._matrix[15];

            return R;
        }
    };

    /** -----------------------------------------------------------------
     * R = A * B * C * D ... (Matrix Multiplication); NOTE: order matters!
     */
    static multiplySeries() {
        if (arguments.length >= 2 && arguments[0] instanceof Matrix4D && arguments[1] instanceof Matrix4D) {
            let result = Matrix4D.multiply(arguments[0], arguments[1]);
            for (let j = 2; j < arguments.length; j += 1) {
                if (arguments[j] instanceof Matrix4D) {
                    result = Matrix4D.multiply(result, arguments[j]);
                }
            }
        }
    };

    /** -----------------------------------------------------------------
     * r = M * v (M is a 4x4 matrix, v is a 3-component vector)
     */
    static multiplyV3(M, v) {
        if (M instanceof Matrix4D && v instanceof Vector3D) {
            // v can't change during the operation. If r and v are the same, make a copy of v
            let r = new Vector3D;
            //
            if (r._vector == v._vector) {
                v = Vector3D.copy(this.v3, v);
            }

            r._vector[0] = M._matrix[0] * v._vector[0] + M._matrix[4] * v._vector[1] + M._matrix[8]  * v._vector[2];
            r._vector[1] = M._matrix[1] * v._vector[0] + M._matrix[5] * v._vector[1] + M._matrix[9]  * v._vector[2];
            r._vector[2] = M._matrix[2] * v._vector[0] + M._matrix[6] * v._vector[1] + M._matrix[10] * v._vector[2];

            return r;
        }
    };

    /** -----------------------------------------------------------------
     * r = M * p (M is a 4x4 matrix, p is a 4-component point)
     */
    static multiplyP4(M, p) {
        if (M instanceof Matrix4D && p instanceof Point4D) {
            // p can't change during the operation, so make a copy of p.
            let P = new Point4D;
            let r = new Point4D;
            //
            this.p4 = Point4D.copy(this.p4, p);

            r._vector[0] = M._matrix[0] * this.p4._vector[0] + M._matrix[4] * this.p4._vector[1] + M._matrix[8]  * this.p4._vector[2] + M._matrix[12] * this.p4._vector[3];
            r._vector[1] = M._matrix[1] * this.p4._vector[0] + M._matrix[5] * this.p4._vector[1] + M._matrix[9]  * this.p4._vector[2] + M._matrix[13] * this.p4._vector[3];
            r._vector[2] = M._matrix[2] * this.p4._vector[0] + M._matrix[6] * this.p4._vector[1] + M._matrix[10] * this.p4._vector[2] + M._matrix[14] * this.p4._vector[3];
            r._vector[3] = M._matrix[3] * this.p4._vector[0] + M._matrix[7] * this.p4._vector[1] + M._matrix[11] * this.p4._vector[2] + M._matrix[15] * this.p4._vector[3];

            return r;
        }
  };

    /** -----------------------------------------------------------------
     * Console.log(name, M)
     */
    print(name="Matrix4D") {
        var fieldSize = 11;
        var numText;
        var row, offset, rowText, number;
        console.log(name + ":");
        for (row = 0; row < 4; row += 1) {
            rowText = "";
            for (offset = 0; offset < 16; offset += 4) {
                number = Number(this._matrix[row + offset]);
                numText = number.toFixed(4);
                rowText += new Array(fieldSize - numText.length).join(" ") + numText;
            }
            console.log(rowText);
        }
    };
    static print(name="Matrix4D", M) {
        if (M instanceof Matrix4D) {
            var fieldSize = 11;
            var numText;
            var row, offset, rowText, number;
            console.log(name + ":");
            for (row = 0; row < 4; row += 1) {
                rowText = "";
                for (offset = 0; offset < 16; offset += 4) {
                    number = Number(M._matrix[row + offset]);
                    numText = number.toFixed(4);
                    rowText += new Array(fieldSize - numText.length).join(" ") + numText;
                }
                console.log(rowText);
            }
        }
    };

    /** -----------------------------------------------------------------
     * M = M' (transpose the matrix)
     */
    transpose() {
        var t;
        // The diagonal values don't move; 6 non-diagonal elements are swapped.
        t = this._matrix[1];  this._matrix[1]  = this._matrix[4];  this._matrix[4]  = t;
        t = this._matrix[2];  this._matrix[2]  = this._matrix[8];  this._matrix[8]  = t;
        t = this._matrix[3];  this._matrix[3]  = this._matrix[12]; this._matrix[12] = t;
        t = this._matrix[6];  this._matrix[6]  = this._matrix[9];  this._matrix[9]  = t;
        t = this._matrix[7];  this._matrix[7]  = this._matrix[13]; this._matrix[13] = t;
        t = this._matrix[11]; this._matrix[11] = this._matrix[14]; this._matrix[14] = t;
        return this;
    };
    static transpose(M) {
        if (M instanceof Matrix4D) {
            var t;
            // The diagonal values don't move; 6 non-diagonal elements are swapped.
            t = M._matrix[1];  M._matrix[1]  = M._matrix[4];  M._matrix[4]  = t;
            t = M._matrix[2];  M._matrix[2]  = M._matrix[8];  M._matrix[8]  = t;
            t = M._matrix[3];  M._matrix[3]  = M._matrix[12]; M._matrix[12] = t;
            t = M._matrix[6];  M._matrix[6]  = M._matrix[9];  M._matrix[9]  = t;
            t = M._matrix[7];  M._matrix[7]  = M._matrix[13]; M._matrix[13] = t;
            t = M._matrix[11]; M._matrix[11] = M._matrix[14]; M._matrix[14] = t;
            return M;
        }
    };

    /** -----------------------------------------------------------------
     * Inv = M(-1) (Inv is set to the inverse of M)
     *
     */
    inverse() {
        /* Structure of matrix
            0   1   2   3
            ______________
        0 | 0   4   8  12
        1 | 1   5   9  13
        2 | 2   6  10  14
        3 | 3   7  11  15
        */
        let Inv = new Matrix4D;

        // Factored out common terms
        var t9_14_13_10 = this._matrix[9] * this._matrix[14] - this._matrix[13] * this._matrix[10];
        var t13_6_5_14  = this._matrix[13] * this._matrix[6] - this._matrix[5] * this._matrix[14];
        var t5_10_9_6   = this._matrix[5] * this._matrix[10] - this._matrix[9] * this._matrix[6];
        var t12_10_8_14 = this._matrix[12] * this._matrix[10] - this._matrix[8] * this._matrix[14];
        var t4_14_12_6  = this._matrix[4] * this._matrix[14] - this._matrix[12] * this._matrix[6];
        var t8_6_4_10   = this._matrix[8] * this._matrix[6] - this._matrix[4] * this._matrix[10];
        var t8_13_12_9  = this._matrix[8] * this._matrix[13] - this._matrix[12] * this._matrix[9];
        var t12_5_4_13  = this._matrix[12] * this._matrix[5] - this._matrix[4] * this._matrix[13];
        var t4_9_8_5    = this._matrix[4] * this._matrix[9] - this._matrix[8] * this._matrix[5];
        var t1_14_13_2  = this._matrix[1] * this._matrix[14] - this._matrix[13] * this._matrix[2];
        var t9_2_1_10   = this._matrix[9] * this._matrix[2] - this._matrix[1] * this._matrix[10];
        var t12_2_0_14  = this._matrix[12] * this._matrix[2] - this._matrix[0] * this._matrix[14];
        var t0_10_8_2   = this._matrix[0] * this._matrix[10] - this._matrix[8] * this._matrix[2];
        var t0_13_12_1  = this._matrix[0] * this._matrix[13] - this._matrix[12] * this._matrix[1];
        var t8_1_0_9    = this._matrix[8] * this._matrix[1] - this._matrix[0] * this._matrix[9];
        var t1_6_5_2    = this._matrix[1] * this._matrix[6] - this._matrix[5] * this._matrix[2];
        var t4_2_0_6    = this._matrix[4] * this._matrix[2] - this._matrix[0] * this._matrix[6];
        var t0_5_4_1    = this._matrix[0] * this._matrix[5] - this._matrix[4] * this._matrix[1];

        Inv._matrix[0] = this._matrix[7] * t9_14_13_10 + this._matrix[11] * t13_6_5_14 + this._matrix[15] * t5_10_9_6;
        Inv._matrix[4] = this._matrix[7] * t12_10_8_14 + this._matrix[11] * t4_14_12_6 + this._matrix[15] * t8_6_4_10;
        Inv._matrix[8] = this._matrix[7] * t8_13_12_9 + this._matrix[11] * t12_5_4_13 + this._matrix[15] * t4_9_8_5;
        Inv._matrix[12] = this._matrix[6] * -t8_13_12_9 + this._matrix[10] * -t12_5_4_13 + this._matrix[14] * -t4_9_8_5;
        Inv._matrix[1] = this._matrix[3] * -t9_14_13_10 + this._matrix[11] * t1_14_13_2 + this._matrix[15] * t9_2_1_10;
        Inv._matrix[5] = this._matrix[3] * -t12_10_8_14 + this._matrix[11] * t12_2_0_14 + this._matrix[15] * t0_10_8_2;
        Inv._matrix[9] = this._matrix[3] * -t8_13_12_9 + this._matrix[11] * t0_13_12_1 + this._matrix[15] * t8_1_0_9;
        Inv._matrix[13] = this._matrix[2] * t8_13_12_9 + this._matrix[10] * -t0_13_12_1 + this._matrix[14] * -t8_1_0_9;
        Inv._matrix[2] = this._matrix[3] * -t13_6_5_14 + this._matrix[7] * -t1_14_13_2 + this._matrix[15] * t1_6_5_2;
        Inv._matrix[6] = this._matrix[3] * -t4_14_12_6 + this._matrix[7] * -t12_2_0_14 + this._matrix[15] * t4_2_0_6;
        Inv._matrix[10] = this._matrix[3] * -t12_5_4_13 + this._matrix[7] * -t0_13_12_1 + this._matrix[15] * t0_5_4_1;
        Inv._matrix[14] = this._matrix[2] * t12_5_4_13 + this._matrix[6] * t0_13_12_1 + this._matrix[14] * -t0_5_4_1;
        Inv._matrix[3] = this._matrix[3] * -t5_10_9_6 + this._matrix[7] * -t9_2_1_10 + this._matrix[11] * -t1_6_5_2;
        Inv._matrix[7] = this._matrix[3] * -t8_6_4_10 + this._matrix[7] * -t0_10_8_2 + this._matrix[11] * -t4_2_0_6;
        Inv._matrix[11] = this._matrix[3] * -t4_9_8_5 + this._matrix[7] * -t8_1_0_9 + this._matrix[11] * -t0_5_4_1;
        Inv._matrix[15] = this._matrix[2] * t4_9_8_5 + this._matrix[6] * t8_1_0_9 + this._matrix[10] * t0_5_4_1;

        var det;
        det =
            this._matrix[3]  * (this._matrix[6] * -t8_13_12_9 + this._matrix[10] * -t12_5_4_13 + this._matrix[14] * -t4_9_8_5) +
            this._matrix[7]  * (this._matrix[2] * t8_13_12_9  + this._matrix[10] * -t0_13_12_1 + this._matrix[14] * -t8_1_0_9) +
            this._matrix[11] * (this._matrix[2] * t12_5_4_13  + this._matrix[6] * t0_13_12_1   + this._matrix[14] * -t0_5_4_1) +
            this._matrix[15] * (this._matrix[2] * t4_9_8_5    + this._matrix[6] * t8_1_0_9     + this._matrix[10] * t0_5_4_1);

        if (det !== 0) {
            var j;
            var scale = 1 / det;
            for (j = 0; j < 16; j += 1) {
                Inv[j] = Inv[j] * scale;
            }
        }
        this.copy(Inv);
        return this;
    };

    static inverse(M) {
        /* Structure of matrix
            0   1   2   3
            ______________
        0 | 0   4   8  12
        1 | 1   5   9  13
        2 | 2   6  10  14
        3 | 3   7  11  15
        */
        let Inv = new Matrix4D;
        if (M instanceof Matrix4D) {

            // Factored out common terms
            var t9_14_13_10 = M._matrix[9] * M._matrix[14] - M._matrix[13] * M._matrix[10];
            var t13_6_5_14  = M._matrix[13] * M._matrix[6] - M._matrix[5] * M._matrix[14];
            var t5_10_9_6   = M._matrix[5] * M._matrix[10] - M._matrix[9] * M._matrix[6];
            var t12_10_8_14 = M._matrix[12] * M._matrix[10] - M._matrix[8] * M._matrix[14];
            var t4_14_12_6  = M._matrix[4] * M._matrix[14] - M._matrix[12] * M._matrix[6];
            var t8_6_4_10   = M._matrix[8] * M._matrix[6] - M._matrix[4] * M._matrix[10];
            var t8_13_12_9  = M._matrix[8] * M._matrix[13] - M._matrix[12] * M._matrix[9];
            var t12_5_4_13  = M._matrix[12] * M._matrix[5] - M._matrix[4] * M._matrix[13];
            var t4_9_8_5    = M._matrix[4] * M._matrix[9] - M._matrix[8] * M._matrix[5];
            var t1_14_13_2  = M._matrix[1] * M._matrix[14] - M._matrix[13] * M._matrix[2];
            var t9_2_1_10   = M._matrix[9] * M._matrix[2] - M._matrix[1] * M._matrix[10];
            var t12_2_0_14  = M._matrix[12] * M._matrix[2] - M._matrix[0] * M._matrix[14];
            var t0_10_8_2   = M._matrix[0] * M._matrix[10] - M._matrix[8] * M._matrix[2];
            var t0_13_12_1  = M._matrix[0] * M._matrix[13] - M._matrix[12] * M._matrix[1];
            var t8_1_0_9    = M._matrix[8] * M._matrix[1] - M._matrix[0] * M._matrix[9];
            var t1_6_5_2    = M._matrix[1] * M._matrix[6] - M._matrix[5] * M._matrix[2];
            var t4_2_0_6    = M._matrix[4] * M._matrix[2] - M._matrix[0] * M._matrix[6];
            var t0_5_4_1    = M._matrix[0] * M._matrix[5] - M._matrix[4] * M._matrix[1];

            Inv._matrix[0] = M._matrix[7] * t9_14_13_10 + M._matrix[11] * t13_6_5_14 + M._matrix[15] * t5_10_9_6;
            Inv._matrix[4] = M._matrix[7] * t12_10_8_14 + M._matrix[11] * t4_14_12_6 + M._matrix[15] * t8_6_4_10;
            Inv._matrix[8] = M._matrix[7] * t8_13_12_9 + M._matrix[11] * t12_5_4_13 + M._matrix[15] * t4_9_8_5;
            Inv._matrix[12] = M._matrix[6] * -t8_13_12_9 + M._matrix[10] * -t12_5_4_13 + M._matrix[14] * -t4_9_8_5;
            Inv._matrix[1] = M._matrix[3] * -t9_14_13_10 + M._matrix[11] * t1_14_13_2 + M._matrix[15] * t9_2_1_10;
            Inv._matrix[5] = M._matrix[3] * -t12_10_8_14 + M._matrix[11] * t12_2_0_14 + M._matrix[15] * t0_10_8_2;
            Inv._matrix[9] = M._matrix[3] * -t8_13_12_9 + M._matrix[11] * t0_13_12_1 + M._matrix[15] * t8_1_0_9;
            Inv._matrix[13] = M._matrix[2] * t8_13_12_9 + M._matrix[10] * -t0_13_12_1 + M._matrix[14] * -t8_1_0_9;
            Inv._matrix[2] = M._matrix[3] * -t13_6_5_14 + M._matrix[7] * -t1_14_13_2 + M._matrix[15] * t1_6_5_2;
            Inv._matrix[6] = M._matrix[3] * -t4_14_12_6 + M._matrix[7] * -t12_2_0_14 + M._matrix[15] * t4_2_0_6;
            Inv._matrix[10] = M._matrix[3] * -t12_5_4_13 + M._matrix[7] * -t0_13_12_1 + M._matrix[15] * t0_5_4_1;
            Inv._matrix[14] = M._matrix[2] * t12_5_4_13 + M._matrix[6] * t0_13_12_1 + M._matrix[14] * -t0_5_4_1;
            Inv._matrix[3] = M._matrix[3] * -t5_10_9_6 + M._matrix[7] * -t9_2_1_10 + M._matrix[11] * -t1_6_5_2;
            Inv._matrix[7] = M._matrix[3] * -t8_6_4_10 + M._matrix[7] * -t0_10_8_2 + M._matrix[11] * -t4_2_0_6;
            Inv._matrix[11] = M._matrix[3] * -t4_9_8_5 + M._matrix[7] * -t8_1_0_9 + M._matrix[11] * -t0_5_4_1;
            Inv._matrix[15] = M._matrix[2] * t4_9_8_5 + M._matrix[6] * t8_1_0_9 + M._matrix[10] * t0_5_4_1;

            let det =
                M._matrix[3]  * (M._matrix[6] * -t8_13_12_9 + M._matrix[10] * -t12_5_4_13 + M._matrix[14] * -t4_9_8_5) +
                M._matrix[7]  * (M._matrix[2] * t8_13_12_9  + M._matrix[10] * -t0_13_12_1 + M._matrix[14] * -t8_1_0_9) +
                M._matrix[11] * (M._matrix[2] * t12_5_4_13  + M._matrix[6] * t0_13_12_1   + M._matrix[14] * -t0_5_4_1) +
                M._matrix[15] * (M._matrix[2] * t4_9_8_5    + M._matrix[6] * t8_1_0_9     + M._matrix[10] * t0_5_4_1);

            if (det !== 0) {
                var j;
                var scale = 1 / det;
                for (j = 0; j < 16; j += 1) {
                    Inv._matrix[j] = Inv._matrix[j] * scale;
                }
            }
            return Inv;
        }
    };

    /** -----------------------------------------------------------------
     * Create an orthographic projection matrix.
     * @param left   Number Farthest left on the x-axis
     * @param right  Number Farthest right on the x-axis
     * @param bottom Number Farthest down on the y-axis
     * @param top    Number Farthest up on the y-axis
     * @param near   Number Distance to the near clipping plane along the -Z axis
     * @param far    Number Distance to the far clipping plane along the -Z axis
     * @return Float32Array The orthographic transformation matrix
     */
    static createOrthographic(left, right, bottom, top, near, far) {

        var M = new Matrix4D;

        // Make sure there is no division by zero
        if (left === right || bottom === top || near === far) {
            console.log("Invalid createOrthographic parameters");
            Matrix4D.setIdentity(M);
            return M;
        }

        var widthRatio  = 1.0 / (right - left);
        var heightRatio = 1.0 / (top - bottom);
        var depthRatio  = 1.0 / (far - near);

        var sx = 2 * widthRatio;
        var sy = 2 * heightRatio;
        var sz = -2 * depthRatio;

        var tx = -(right + left) * widthRatio;
        var ty = -(top + bottom) * heightRatio;
        var tz = -(far + near) * depthRatio;

        M._matrix[0] = sx;  M._matrix[4] = 0;   M._matrix[8] = 0;   M._matrix[12] = tx;
        M._matrix[1] = 0;   M._matrix[5] = sy;  M._matrix[9] = 0;   M._matrix[13] = ty;
        M._matrix[2] = 0;   M._matrix[6] = 0;   M._matrix[10] = sz; M._matrix[14] = tz;
        M._matrix[3] = 0;   M._matrix[7] = 0;   M._matrix[11] = 0;  M._matrix[15] = 1;

        return M;
  };

  /** -----------------------------------------------------------------
   * Set a perspective projection matrix based on limits of a frustum.
   * @param left   Number Farthest left on the x-axis
   * @param right  Number Farthest right on the x-axis
   * @param bottom Number Farthest down on the y-axis
   * @param top    Number Farthest up on the y-axis
   * @param near   Number Distance to the near clipping plane along the -Z axis
   * @param far    Number Distance to the far clipping plane along the -Z axis
   * @return Float32Array A perspective transformation matrix
   */
  static createFrustum(left, right, bottom, top, near, far) {
      var M = new Matrix4D;

        // Make sure there is no division by zero
        if (left === right || bottom === top || near === far) {
            console.log("Invalid createFrustum parameters");
            Matrix4D.setIdentity(M);
        }
        if (near <= 0 || far <= 0) {
            console.log('For a perspective projection, the near and far distances must be positive');
            Matrix4D.setIdentity(M);
        } else {

            var sx = 2 * near / (right - left);
            var sy = 2 * near / (top - bottom);

            var c2 = - (far + near) / (far - near);
            var c1 = 2 * near * far / (near - far);

            var tx = -near * (left + right) / (right - left);
            var ty = -near * (bottom + top) / (top - bottom);

            M._matrix[0] = sx; M._matrix[4] = 0;  M._matrix[8] = 0;    M._matrix[12] = tx;
            M._matrix[1] = 0;  M._matrix[5] = sy; M._matrix[9] = 0;    M._matrix[13] = ty;
            M._matrix[2] = 0;  M._matrix[6] = 0;  M._matrix[10] = c2;  M._matrix[14] = c1;
            M._matrix[3] = 0;  M._matrix[7] = 0;  M._matrix[11] = -1;  M._matrix[15] = 0;
        }

        return M;
    };

    /** -----------------------------------------------------------------
     * Set a perspective projection matrix based on limits of a frustum.
     * @param left   Number Farthest left on the x-axis
     * @param right  Number Farthest right on the x-axis
     * @param bottom Number Farthest down on the y-axis
     * @param top    Number Farthest up on the y-axis
     * @param near   Number Distance to the near clipping plane along the -Z axis
     * @param far    Number Distance to the far clipping plane along the -Z axis
     * @return Float32Array A perspective transformation matrix
     */
    static createFrustumTextbook(left, right, bottom, top, near, far) {

        var M = new Matrix4D;

        // Make sure there is no division by zero
        if (left === right || bottom === top || near === far) {
            console.log("Invalid createFrustum parameters");
            Matrix4D.setIdentity(M);
        }
        if (near <= 0 || far <= 0) {
            console.log('For a perspective projection, the near and far distances must be positive');
            Matrix4D.setIdentity(M);
        } else {

            var sx = 2 * near / (right - left);
            var sy = 2 * near / (top - bottom);

            var A = (right + left) / (right - left);
            var B = (top + bottom) / (top - bottom);

            var c1 = -2 * near * far / (far - near);
            var c2 = - (far + near) / (far - near);

            M._matrix[0] = sx; M._matrix[4] = 0;  M._matrix[8] = A;    M._matrix[12] = 0;
            M._matrix[1] = 0;  M._matrix[5] = sy; M._matrix[9] = B;    M._matrix[13] = 0;
            M._matrix[2] = 0;  M._matrix[6] = 0;  M._matrix[10] = c2;  M._matrix[14] = c1;
            M._matrix[3] = 0;  M._matrix[7] = 0;  M._matrix[11] = -1;  M._matrix[15] = 0;
        }

        return M;
    };

    /** -----------------------------------------------------------------
     * Create a perspective projection matrix using a field-of-view and an aspect ratio.
     * @param fovy  Number The angle between the upper and lower sides of the viewing frustum.
     * @param aspect Number The aspect ratio of the view window. (width/height).
     * @param near Number  Distance to the near clipping plane along the -Z axis.
     * @param far  Number  Distance to the far clipping plane along the -Z axis.
     * @return Float32Array The perspective transformation matrix.
     */
    static createPerspective(fovy, aspect, near, far) {

        var M = new Matrix4D;

        if (fovy <= 0 || fovy >= 180 || aspect <= 0 || near >= far || near <= 0) {
            console.log('Invalid parameters to createPerspective');
            Matrix4D.setIdentity(M);
        } else {
            var half_fovy = self.toRadians(fovy) / 2;

            var top = near * Math.tan(half_fovy);
            var bottom = -top;
            var right = top * aspect;
            var left = -right;

            M = Matrix4D.createFrustum(left, right, bottom, top, near, far);
        }

        return M;
    };

    /** -----------------------------------------------------------------
     * Set the matrix for scaling.
     * @param M The matrix to set to a scaling matrix
     * @param sx The scale factor along the x-axis
     * @param sy The scale factor along the y-axis
     * @param sz The scale factor along the z-axis
     */
    scale(sx, sy, sz) {
        if (sx instanceof Number && sy instanceof Number && sz instanceof Number) {
            this._matrix[0] = sx;  this._matrix[4] = 0;   this._matrix[8] = 0;   this._matrix[12] = 0;
            this._matrix[1] = 0;   this._matrix[5] = sy;  this._matrix[9] = 0;   this._matrix[13] = 0;
            this._matrix[2] = 0;   this._matrix[6] = 0;   this._matrix[10] = sz; this._matrix[14] = 0;
            this._matrix[3] = 0;   this._matrix[7] = 0;   this._matrix[11] = 0;  this._matrix[15] = 1;
            return this;
        }
    };
    static scale(M, sx, sy, sz) {
        if (M instanceof Matrix4D) {
            M._matrix[0] = sx;  M._matrix[4] = 0;   M._matrix[8] = 0;   M._matrix[12] = 0;
            M._matrix[1] = 0;   M._matrix[5] = sy;  M._matrix[9] = 0;   M._matrix[13] = 0;
            M._matrix[2] = 0;   M._matrix[6] = 0;   M._matrix[10] = sz; M._matrix[14] = 0;
            M._matrix[3] = 0;   M._matrix[7] = 0;   M._matrix[11] = 0;  M._matrix[15] = 1;
            return M;
        }
    };

    /** -----------------------------------------------------------------
     * Set the matrix for translation.
     * @param M The matrix to set to a translation matrix.
     * @param dx The X value of a translation.
     * @param dy The Y value of a translation.
     * @param dz The Z value of a translation.
     */
    translate(dx, dy, dz) {
        if (sx instanceof Number && sy instanceof Number && sz instanceof Number) {
            this._matrix[0] = 1;  this._matrix[4] = 0;  this._matrix[8]  = 0;  this._matrix[12] = dx;
            this._matrix[1] = 0;  this._matrix[5] = 1;  this._matrix[9]  = 0;  this._matrix[13] = dy;
            this._matrix[2] = 0;  this._matrix[6] = 0;  this._matrix[10] = 1;  this._matrix[14] = dz;
            this._matrix[3] = 0;  this._matrix[7] = 0;  this._matrix[11] = 0;  this._matrix[15] = 1;
        }
    };
    static translate(M, dx, dy, dz) {
        if (M instanceof Matrix4D) {
            M._matrix[0] = 1;  M._matrix[4] = 0;  M._matrix[8]  = 0;  M._matrix[12] = dx;
            M._matrix[1] = 0;  M._matrix[5] = 1;  M._matrix[9]  = 0;  M._matrix[13] = dy;
            M._matrix[2] = 0;  M._matrix[6] = 0;  M._matrix[10] = 1;  M._matrix[14] = dz;
            M._matrix[3] = 0;  M._matrix[7] = 0;  M._matrix[11] = 0;  M._matrix[15] = 1;
        }
    };

    /** -----------------------------------------------------------------
     * Set the matrix to a rotation matrix. The axis of rotation axis may not be normalized.
     * @paraM angle The angle of rotation (degrees)
     * @paraM x_axis The X coordinate of axis vector for rotation.
     * @paraM y_axis The Y coordinate of axis vector for rotation.
     * @paraM z_axis The Z coordinate of axis vector for rotation.
     */
    rotate(angle, x_axis, y_axis, z_axis) {
        var s, c, c1, xy, yz, zx, xs, ys, zs, ux, uy, uz;

        angle = Matrix4D.toRadians(angle);

        s = Math.sin(angle);
        c = Math.cos(angle);

        if (x_axis !== 0 && y_axis === 0 && z_axis === 0) {
            // Rotation around the X axis
            if (x_axis < 0) {
                s = -s;
            }

            this._matrix[0] = 1;  this._matrix[4] = 0;  this._matrix[8]  = 0;  this._matrix[12] = 0;
            this._matrix[1] = 0;  this._matrix[5] = c;  this._matrix[9]  = -s; this._matrix[13] = 0;
            this._matrix[2] = 0;  this._matrix[6] = s;  this._matrix[10] = c;  this._matrix[14] = 0;
            this._matrix[3] = 0;  this._matrix[7] = 0;  this._matrix[11] = 0;  this._matrix[15] = 1;

        } else if (x_axis === 0 && y_axis !== 0 && z_axis === 0) {
            // Rotation around Y axis
            if (y_axis < 0) {
                s = -s;
            }

            this._matrix[0] = c;  this._matrix[4] = 0;  this._matrix[8]  = s;  this._matrix[12] = 0;
            this._matrix[1] = 0;  this._matrix[5] = 1;  this._matrix[9]  = 0;  this._matrix[13] = 0;
            this._matrix[2] = -s; this._matrix[6] = 0;  this._matrix[10] = c;  this._matrix[14] = 0;
            this._matrix[3] = 0;  this._matrix[7] = 0;  this._matrix[11] = 0;  this._matrix[15] = 1;

        } else if (x_axis === 0 && y_axis === 0 && z_axis !== 0) {
            // Rotation around Z axis
            if (z_axis < 0) {
                s = -s;
            }

            this._matrix[0] = c;  this._matrix[4] = -s;  this._matrix[8]  = 0;  this._matrix[12] = 0;
            this._matrix[1] = s;  this._matrix[5] = c;   this._matrix[9]  = 0;  this._matrix[13] = 0;
            this._matrix[2] = 0;  this._matrix[6] = 0;   this._matrix[10] = 1;  this._matrix[14] = 0;
            this._matrix[3] = 0;  this._matrix[7] = 0;   this._matrix[11] = 0;  this._matrix[15] = 1;

        } else {
            // Rotation around any arbitrary axis
            this.axis_of_rotation[0] = x_axis;
            this.axis_of_rotation[1] = y_axis;
            this.axis_of_rotation[2] = z_axis;
            this.V.normalize(this.axis_of_rotation);
            ux = this.axis_of_rotation[0];
            uy = this.axis_of_rotation[1];
            uz = this.axis_of_rotation[2];

            c1 = 1 - c;

            this._matrix[0] = c + ux * ux * c1;
            this._matrix[1] = uy * ux * c1 + uz * s;
            this._matrix[2] = uz * ux * c1 - uy * s;
            this._matrix[3] = 0;

            this._matrix[4] = ux * uy * c1 - uz * s;
            this._matrix[5] = c + uy * uy * c1;
            this._matrix[6] = uz * uy * c1 + ux * s;
            this._matrix[7] = 0;

            this._matrix[8] = ux * uz * c1 + uy * s;
            this._matrix[9] = uy * uz * c1 - ux * s;
            this._matrix[10] = c + uz * uz * c1;
            this._matrix[11] = 0;

            this._matrix[12] = 0;
            this._matrix[13] = 0;
            this._matrix[14] = 0;
            this._matrix[15] = 1;
        }
    };

    static rotate(M, angle, x_axis, y_axis, z_axis) {
        if (M instanceof Matrix4D) {
            var s, c, c1, xy, yz, zx, xs, ys, zs, ux, uy, uz;

            angle = Matrix4D.toRadians(angle);

            s = Math.sin(angle);
            c = Math.cos(angle);

            if (x_axis !== 0 && y_axis === 0 && z_axis === 0) {
                // Rotation around the X axis
                if (x_axis < 0) {
                    s = -s;
                }

                M._matrix[0] = 1;  M._matrix[4] = 0;  M._matrix[8]  = 0;  M._matrix[12] = 0;
                M._matrix[1] = 0;  M._matrix[5] = c;  M._matrix[9]  = -s; M._matrix[13] = 0;
                M._matrix[2] = 0;  M._matrix[6] = s;  M._matrix[10] = c;  M._matrix[14] = 0;
                M._matrix[3] = 0;  M._matrix[7] = 0;  M._matrix[11] = 0;  M._matrix[15] = 1;

            } else if (x_axis === 0 && y_axis !== 0 && z_axis === 0) {
                // Rotation around Y axis
                if (y_axis < 0) {
                    s = -s;
                }

                M._matrix[0] = c;  M._matrix[4] = 0;  M._matrix[8]  = s;  M._matrix[12] = 0;
                M._matrix[1] = 0;  M._matrix[5] = 1;  M._matrix[9]  = 0;  M._matrix[13] = 0;
                M._matrix[2] = -s; M._matrix[6] = 0;  M._matrix[10] = c;  M._matrix[14] = 0;
                M._matrix[3] = 0;  M._matrix[7] = 0;  M._matrix[11] = 0;  M._matrix[15] = 1;

            } else if (x_axis === 0 && y_axis === 0 && z_axis !== 0) {
                // Rotation around Z axis
                if (z_axis < 0) {
                    s = -s;
                }

                M._matrix[0] = c;  M._matrix[4] = -s;  M._matrix[8]  = 0;  M._matrix[12] = 0;
                M._matrix[1] = s;  M._matrix[5] = c;   M._matrix[9]  = 0;  M._matrix[13] = 0;
                M._matrix[2] = 0;  M._matrix[6] = 0;   M._matrix[10] = 1;  M._matrix[14] = 0;
                M._matrix[3] = 0;  M._matrix[7] = 0;   M._matrix[11] = 0;  M._matrix[15] = 1;

            } else {
                // Rotation around any arbitrary axis
                this.axis_of_rotation[0] = x_axis;
                this.axis_of_rotation[1] = y_axis;
                this.axis_of_rotation[2] = z_axis;
                this.V.normalize(this.axis_of_rotation);
                ux = this.axis_of_rotation[0];
                uy = this.axis_of_rotation[1];
                uz = this.axis_of_rotation[2];

                c1 = 1 - c;

                M._matrix[0] = c + ux * ux * c1;
                M._matrix[1] = uy * ux * c1 + uz * s;
                M._matrix[2] = uz * ux * c1 - uy * s;
                M._matrix[3] = 0;

                M._matrix[4] = ux * uy * c1 - uz * s;
                M._matrix[5] = c + uy * uy * c1;
                M._matrix[6] = uz * uy * c1 + ux * s;
                M._matrix[7] = 0;

                M._matrix[8] = ux * uz * c1 + uy * s;
                M._matrix[9] = uy * uz * c1 - ux * s;
                M._matrix[10] = c + uz * uz * c1;
                M._matrix[11] = 0;

                M._matrix[12] = 0;
                M._matrix[13] = 0;
                M._matrix[14] = 0;
                    M._matrix[15] = 1;
            }
            return M;
        }
    };

    /** -----------------------------------------------------------------
     * Set a camera matrix.
     * @param M Float32Array The matrix to contain the camera transformation.
     * @param eye_x Number The x component of the eye point.
     * @param eye_y Number The y component of the eye point.
     * @param eye_z Number The z component of the eye point.
     * @param center_x Number The x component of a point being looked at.
     * @param center_y Number The y component of a point being looked at.
     * @param center_z Number The z component of a point being looked at.
     * @param up_dx Number The x component of a vector in the up direction.
     * @param up_dy Number The y component of a vector in the up direction.
     * @param up_dz Number The z component of a vector in the up direction.
     */
    lookAt(eye_x, eye_y, eye_z, center_x, center_y, center_z, up_dx, up_dy, up_dz) {

        // Local coordinate system for the camera:
        //   u maps to the x-axis
        //   v maps to the y-axis
        //   n maps to the z-axis

        this.center = Vector3D.set(center_x, center_y, center_z);
        this.eye = Vector3D.set( eye_x, eye_y, eye_z);
        this.up = Vector3D.set(up_dx, up_dy, up_dz);

        this.n = Vector3D.subtract(this.eye, this.center);  // n = eye - center
        this.n = Vector3D.normalize(this.n);

        this.u = Vector3D.crossProduct(this.up, this.n);
        this.u = Vector3D.normalize(this.u);

        this.v = Vector3D.crossProduct(this.n, this.u);
        this.v = Vector3D.normalize(this.v);

        var tx = - Vector3D.dotProduct(this.u,this.eye);
        var ty = - Vector3D.dotProduct(this.v,this.eye);
        var tz = - Vector3D.dotProduct(this.n,this.eye);

        // Set the camera matrix
        M._matrix[0] = this.u[0];  M._matrix[4] = this.u[1];  M._matrix[8]  = this.u[2];  M._matrix[12] = tx;
        M._matrix[1] = this.v[0];  M._matrix[5] = this.v[1];  M._matrix[9]  = this.v[2];  M._matrix[13] = ty;
        M._matrix[2] = this.n[0];  M._matrix[6] = this.n[1];  M._matrix[10] = this.n[2];  M._matrix[14] = tz;
        M._matrix[3] = 0;     M._matrix[7] = 0;     M._matrix[11] = 0;     M._matrix[15] = 1;
    };
    static lookAt(M, eye_x, eye_y, eye_z, center_x, center_y, center_z, up_dx, up_dy, up_dz) {

        // Local coordinate system for the camera:
        //   u maps to the x-axis
        //   v maps to the y-axis
        //   n maps to the z-axis

        this.center = Vector3D.set(center_x, center_y, center_z);
        this.eye = Vector3D.set(eye_x, eye_y, eye_z);
        this.up = Vector3D.set(up_dx, up_dy, up_dz);

        this.n = Vector3D.subtract(this.eye, this.center);  // n = eye - center
        this.n = Vector3D.normalize(this.n);

        this.u = Vector3D.crossProduct(this.up, this.n);
        this.u = Vector3D.normalize(this.u);

        this.v = Vector3D.crossProduct(this.n, this.u);
        this.v = Vector3D.normalize(this.v);

        var tx = - Vector3D.dotProduct(this.u,this.eye);
        var ty = - Vector3D.dotProduct(this.v,this.eye);
        var tz = - Vector3D.dotProduct(this.n,this.eye);

        // Set the camera matrix
        M._matrix[0] = this.u[0];  M._matrix[4] = this.u[1];  M._matrix[8]  = this.u[2];  M._matrix[12] = tx;
        M._matrix[1] = this.v[0];  M._matrix[5] = this.v[1];  M._matrix[9]  = this.v[2];  M._matrix[13] = ty;
        M._matrix[2] = this.n[0];  M._matrix[6] = this.n[1];  M._matrix[10] = this.n[2];  M._matrix[14] = tz;
        M._matrix[3] = 0;     M._matrix[7] = 0;     M._matrix[11] = 0;     M._matrix[15] = 1;
    };
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
        if (m instanceof Matrix4D) {
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
        if (m instanceof Matrix4D) {
            let properties = new Set()
            let currentObj = m
            do {
                Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
            } while ((currentObj = Object.getPrototypeOf(currentObj)))
            return {attributes: [...properties.keys()].sort().filter(item => typeof m[item] !== 'function')};
        }
    };
};

exports.Matrix4D = Matrix4D;
