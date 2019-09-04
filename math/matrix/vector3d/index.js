"use strict";
/**
 * @class Vector3D
 */
class Vector3D {
    /** ---------------------------------------------------------------------
     * @constructor Create a new 3-component vector.
     * @param dx Number The change in x of the vector.
     * @param dy Number The change in y of the vector.
     * @param dz Number The change in z of the vector.
     * @return Float32Array A new 3-component vector
     */
    constructor (dx = 0, dy = 0, dz = 0) {
        this._vector = new Float32Array(3);
        if (arguments.length >= 1) { this._vector[0] = dx; }
        if (arguments.length >= 2) { this._vector[1] = dy; }
        if (arguments.length >= 3) { this._vector[2] = dz; }
    };
    _typeOf(value) {
        var type = typeof value;

        switch(type) {
            case 'object':
            return value === null ? 'null' : Object.prototype.toString.toLowerCase().call(value).match(/^\[object (.*)\]$/)[1]

            case 'function':
            return 'Function'.toLowerCase();

            default:
            return type.toLowerCase();
        }
    }
    static _typeOf(value) {
        var type = typeof value;

        switch(type) {
            case 'object':
            return value === null ? 'null' : Object.prototype.toString.toLowerCase().call(value).match(/^\[object (.*)\]$/)[1]

            case 'function':
            return 'Function'.toLowerCase();

            default:
            return type.toLowerCase();
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
    /** ---------------------------------------------------------------------
     * Create a new 3-component vector and set its components equal to an existing vector.
     * @param from Float32Array An existing vector.
     * @return Float32Array A new 3-component vector with the same values as "from"
     */
    createFrom(from) {
        //this._vector = new Float32Array(3);
        if (from instanceof Array && from.length == 3) {
            this._vector[0] = from[0];
            this._vector[1] = from[1];
            this._vector[2] = from[2];
        }
        if (from instanceof Vector3D) {
            this._vector[0] = from._vector[0];
            this._vector[1] = from._vector[1];
            this._vector[2] = from._vector[2];
        }
    };

    /** ---------------------------------------------------------------------
     * Create a vector using two existing points.
     * @param tail Float32Array A 3-component point.
     * @param head Float32Array A 3-component point.
     * @return Float32Array A new 3-component vector defined by 2 points
     */
    createFrom2Points(tail, head) {
        //this._vector = new Float32Array(3);
        this.subtract(head, tail);
    };

    /** ---------------------------------------------------------------------
     * Copy a 3-component vector into another 3-component vector
     * @param to Float32Array A 3-component vector that you want changed.
     * @param from Float32Array A 3-component vector that is the source of data
     * @returns Float32Array The "to" 3-component vector
     */
    copy(from) {
        if (from instanceof Vector3D) {
            this._vector[0] = from._vector[0];
            this._vector[1] = from._vector[1];
            this._vector[2] = from._vector[2];
            return this;
        }
    };
    static copy(V, from) {
        if (from instanceof Vector3D || from instanceof Point3D && V instanceof Vector3D) {
            V._vector[0] = from._vector[0];
            V._vector[1] = from._vector[1];
            V._vector[2] = from._vector[2];
            return V;
        }
    };

    /** ---------------------------------------------------------------------
    * Set the components of a 3-component vector.
    * @param v Float32Array The vector to change.
    * @param dx Number The change in x of the vector.
    * @param dy Number The change in y of the vector.
    * @param dz Number The change in z of the vector.
    */
    set(dx = 0, dy = 0, dz = 0) {
        this._vector[0] = dx;
        this._vector[1] = dy;
        this._vector[2] = dz;
        return this;
    };
    static set(v, dx = 0, dy = 0, dz = 0) {
        if (v instanceof Vector3D) {
            v._vector[0] = dx;
            v._vector[1] = dy;
            v._vector[2] = dz;
            return v;
        }
    };

    /** ---------------------------------------------------------------------
     * Calculate the length of a vector.
     * @param v Float32Array A 3-component vector.
     * @return Number The length of a vector
     */
    length() {
        return Math.sqrt(this._vector[0] * this._vector[0] + this._vector[1] * this._vector[1] + this._vector[2] * this._vector[2]);
    };
    static length(v) {
        if (v instanceof Vector3D)
        return Math.sqrt(v._vector[0] * v._vector[0] + v._vector[1] * v._vector[1] + v._vector[2] * v._vector[2]);
    };
    /** --------------------------------------------------------------------
     * toAngles
     */
    toAngles() {
        return {
            theta: Math.atan2(this._vector[2], this._vector[0]),
            phi: Math.asin(this._vector[1] / this.length())
        };
    }

    static toAngles(v) {
        return {
            theta: Math.atan2(v._vector[2], v._vector[0]),
            phi: Math.asin(v._vector[1] / v.length())
        };
    }

    angleTo(a) {
        return Math.acos(this.dotProduct(a) / (this.length() * a.length()));
    }

    static angleTo(v, a) {
        return Math.acos(v.dotProduct(a) / (v.length() * a.length()));
    }
    /** ---------------------------------------------------------------------
     * Make a vector have a length of 1.
     * @param v Float32Array A 3-component vector.
     * @return Float32Array The input vector normalized to unit length. Or null if the vector is zero length.
     */
    normalize() {
        var length, percent;
        length = this._vector.length();
        if (Math.abs(length) < 0.0000001) {
            return null; // Invalid vector
        }
        percent = 1.0 / length;
        this._vector[0] = this._vector[0] * percent;
        this._vector[1] = this._vector[1] * percent;
        this._vector[2] = this._vector[2] * percent;
        return this;
    };
    static normalize(v) {
        if (v instanceof Vector3D) {
            var length, percent;

            length = v._vector.length();
            if (Math.abs(length) < 0.0000001) {
                return null; // Invalid vector
            }

            percent = 1.0 / length;
            v._vector[0] = v._vector[0] * percent;
            v._vector[1] = v._vector[1] * percent;
            v._vector[2] = v._vector[2] * percent;
            return v;
        }
    };

    /** ---------------------------------------------------------------------
    * Add two vectors:  result = V0 + v1
    * @param result Float32Array A 3-component vector.
    * @param v0 Float32Array A 3-component vector.
    * @param v1 Float32Array A 3-component vector.
    */
    add(v1) {
        if (v1 instanceof Array && v1.length == 3) {
            this._vector[0] += v1[0];
            this._vector[1] += v1[1];
            this._vector[2] += v1[2];
        }
        if (v1 instanceof Vector3D) {
            this._vector[0] += v1._vector[0];
            this._vector[1] += v1._vector[1];
            this._vector[2] += v1._vector[2];
            return this;
        }
    };
    static add(v0, v1) {
        if (v0 instanceof Vector3D) {
            if (v1 instanceof Array && v1.length == 3) {
                v0._vector[0] += v1[0];
                v0._vector[1] += v1[1];
                v0._vector[2] += v1[2];
            }
            if (v1 instanceof Vector3D) {
                v0._vector[0] += v1._vector[0];
                v0._vector[1] += v1._vector[1];
                v0._vector[2] += v1._vector[2];
            }
            return v0;
        }
    };

    /** ---------------------------------------------------------------------
     * Subtract two vectors:  result = v0 - v1
     * @param result Float32Array A 3-component vector.
     * @param v0 Float32Array A 3-component vector.
     * @param v1 Float32Array A 3-component vector.
     */
    subtract(v1) {
        if (v1 instanceof Array && v1.length == 3) {
            this._vector[0] -= v1[0];
            this._vector[1] -= v1[1];
            this._vector[2] -= v1[2];
        }
        if (v1 instanceof Vector3D) {
            this._vector[0] -= v1._vector[0];
            this._vector[1] -= v1._vector[1];
            this._vector[2] -= v1._vector[2];
        }
        return this;
    };
    static subtract(v0, v1) {
        let v = new Vector3D;
        Vector3D.copy(v, v0);
        if (v0 instanceof Vector3D) {
            if (v1 instanceof Array && v1.length == 3) {
                v._vector[0] -= v1[0];
                v._vector[1] -= v1[1];
                v._vector[2] -= v1[2];
            }
            if (v1 instanceof Vector3D) {
                v._vector[0] -= v1._vector[0];
                v._vector[1] -= v1._vector[1];
                v._vector[2] -= v1._vector[2];
            }
        } else if (v0 instanceof Point3D) {
            if (v1 instanceof Array && v1.length == 3) {
                v._vector[0] -= v1[0];
                v._vector[1] -= v1[1];
                v._vector[2] -= v1[2];
            }
            if (v1 instanceof Vector3D) {
                v._vector[0] -= v1._vector[0];
                v._vector[1] -= v1._vector[1];
                v._vector[2] -= v1._vector[2];
            }
        }
        return v;
    };

    /** ---------------------------------------------------------------------
     * Scale a vector:  result = s * v0
     * @param result Float32Array A 3-component vector.
     * @param v0 Float32Array A 3-component vector.
     * @param s Number A scale factor.
     */
    scale(s = 1) {
        if (this._typeOf(s) == 'number') {
            this._vector[0] *= s;
            this._vector[1] *= s;
            this._vector[2] *= s;
            return this;
        }
    };
    static scale(v, s = 1) {
        if (v instanceof Vector3D) {
            if (Vector3D._typeOf(s) == 'number') {
                v._vector[0] *= s;
                v._vector[1] *= s;
                v._vector[2] *= s;
                return v;
            }
        }
    };

    /** ---------------------------------------------------------------------
     * Calculate the cross product of 2 vectors: result = v0 x v1 (order matters)
     * @param result Float32Array A 3-component vector.
     * @param v0 Float32Array A 3-component vector.
     * @param v1 Float32Array A 3-component vector.
     */
    crossProduct(v1) {
        if (v1 instanceof Vector3D) {
            let vr = new Vector3D;
            vr._vector[0] = this._vector[1] * v1._vector[2] - this._vector[2] * v1._vector[1];
            vr._vector[1] = this._vector[2] * v1._vector[0] - this._vector[0] * v1._vector[2];
            vr._vector[2] = this._vector[0] * v1._vector[1] - this._vector[1] * v1._vector[0];
            return vr;
        }
    };
    static crossProduct(v0, v1) {
        if (v0 instanceof Vector3D) {
            if (v1 instanceof Vector3D) {
                let vr = new Vector3D;
                vr._vector[0] = v0._vector[1] * v1._vector[2] - v0._vector[2] * v1._vector[1];
                vr._vector[1] = v0._vector[2] * v1._vector[0] - v0._vector[0] * v1._vector[2];
                vr._vector[2] = v0._vector[0] * v1._vector[1] - v0._vector[1] * v1._vector[0];
                return vr;
            }
        }
    };

    /** ---------------------------------------------------------------------
     * Calculate the dot product of 2 vectors
     * @param v0 Float32Array A 3-component vector.
     * @param v1 Float32Array A 3-component vector.
     * @return Number Float32Array The dot product of v0 and v1
     */
    dotProduct(v1) {
        if (v1 instanceof Vector3D) {
            return this._vector[0] * v1._vector[0] + this._vector[1] * v1._vector[1] + this._vector[2] * v1._vector[2];
        }
    };
    static dotProduct(v0, v1) {
        if (v0 instanceof Vector3D) {
            if (v1 instanceof Vector3D) {
                return v0._vector[0] * v1._vector[0] + v0._vector[1] * v1._vector[1] + v0._vector[2] * v1._vector[2];
            }
        }
    };

    /** ---------------------------------------------------------------------
     * Print a vector on the console.
     * @param name String A description of the vector to be printed.
     * @param v Float32Array A 3-component vector.
     */
    print(name="Vector3D") {
        var maximum, order, digits;

        maximum = Math.max(this._vector[0], this._vector[1], this._vector[2]);
        order = Math.floor(Math.log(maximum) / Math.LN10 + 0.000000001);
        digits = (order <= 0) ? 5 : (order > 5) ? 0 : (5 - order);

        console.log("Vector3: " + name + ": " + this._vector[0].toFixed(digits) + " "
                                            + this._vector[1].toFixed(digits) + " "
                                            + this._vector[2].toFixed(digits));
    };
    static print(name="Vector3D", v) {
        if (v instanceof Vector3D) {
            var maximum, order, digits;

            maximum = Math.max(this._vector[0], this._vector[1], this._vector[2]);
            order = Math.floor(Math.log(maximum) / Math.LN10 + 0.000000001);
            digits = (order <= 0) ? 5 : (order > 5) ? 0 : (5 - order);

            console.log("Vector3: " + name + ": " + this._vector[0].toFixed(digits) + " "
                                                + this._vector[1].toFixed(digits) + " "
                                                + this._vector[2].toFixed(digits));
        }
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
    }
    static getMethods(p){
        if (p instanceof Vector3D) {
            let properties = new Set()
            let currentObj = p
            do {
                Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
            } while ((currentObj = Object.getPrototypeOf(currentObj)))
            return {methods: [...properties.keys()].sort().filter(item => typeof p[item] === 'function')};
        }
    }
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
    }
    static getAttrs(p){
        if (p instanceof Vector3D) {
            let properties = new Set()
            let currentObj = p
            do {
                Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
            } while ((currentObj = Object.getPrototypeOf(currentObj)))
            return {attributes: [...properties.keys()].sort().filter(item => typeof p[item] !== 'function')};
        }
    }
};

exports.Vector3D = Vector3D;
