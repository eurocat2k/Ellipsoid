"use strict";
const Vector3D = require('../vector3d/').Vector3D;

class Point3D extends Vector3D {
    constructor(x=0,y=0,z=0) {
        /** ---------------------------------------------------------------------
         * @return Float32Array A new 3-component vector
         */
        super(x, y, z);
        this._vector = new Float32Array(3);
        this._vector[0] = 0;
        this._vector[1] = 0;
        this._vector[2] = 0;
        //if (arguments.length >= 1) { this._vectorp[0] = x; }
        //if (arguments.length >= 2) { this._vectorp[1] = y; }
        //if (arguments.length >= 3) { this._vectorp[2] = z; }
    }
    /** ---------------------------------------------------------------------
     * @return Float32Array A new 3-component point that has the same values as the input argument
     */
    createFrom(from) {
        if (from instanceof Array && from.length == 3) {
            this._vector = new Float32Array(3);
            this._vector[0] = from[0];
            this._vector[1] = from[1];
            this._vector[2] = from[2];
            return this;
        }
    };
    /** ---------------------------------------------------------------------
     * Set the component values of a point
     */
    set(x=0, y=0, z=0) {
        this._vector[0] = x;
        this._vector[1] = y;
        this._vector[2] = z;
        return this;
    };
    /** ---------------------------------------------------------------------
     * Add a point and a vector; result = p + v
     */
    addVector (v) {
        if (v instanceof Point3D || v instanceof Vector3D) {
            this._vector[0] += v._vector[0];
            this._vector[1] += v._vector[1];
            this._vector[2] += v._vector[2];
        } else {
            this._vector[0] += v;
            this._vector[1] += v;
            this._vector[2] += v;
        }
        return this;

    };
    static addVector(p, v) {
        if (p instanceof Point3D || p instanceof Vector3D) {
            if (v instanceof Point3D || v instanceof Vector3D) {
                p._vector[0] += v._vector[0];
                p._vector[1] += v._vector[1];
                p._vector[2] += v._vector[2];
            } else {
                p._vector[0] += v;
                p._vector[1] += v;
                p._vector[2] += v;
            }
            return p;
        }
    };
    /** ---------------------------------------------------------------------
     * Add a point and a vector; result = p + v
     */
    subtractVector(v) {
        if (v instanceof Point3D || v instanceof Vector3D) {
            this._vector[0] -= v._vector[0];
            this._vector[1] -= v._vector[1];
            this._vector[2] -= v._vector[2];
            return this;
        } else {
            this._vector[0] -= v;
            this._vector[1] -= v;
            this._vector[2] -= v;
            return this;
        }
        return false;
    };
    static subtractVector(p, v) {
        if (p instanceof Point3D || p instanceof Vector3D) {
            if (v instanceof Point3D || v instanceof Vector3D) {
                p._vector[0] -= v._vector[0];
                p._vector[1] -= v._vector[1];
                p._vector[2] -= v._vector[2];
                return p;
            } else {
                p._vector[0] -= v;
                p._vector[1] -= v;
                p._vector[2] -= v;
                return p;
            }
        }
        return false;
    };
    /** ---------------------------------------------------------------------
     * @return Number The distance between 2 points
     */
    distanceBetween(p2) {
        console.log(p2);
        if (p2 instanceof Point3D || p2 instanceof Vector3D) {
            var dx = this._vector[0] - p2._vector[0];
            var dy = this._vector[1] - p2._vector[1];
            var dz = this._vector[2] - p2._vector[2];
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        return false;
    };
    static distanceBetween(p1, p2) {
        if (p1 instanceof Point3D || p1 instanceof Vector3D) {
            if (p2 instanceof Point3D || p2 instanceof Vector3D) {
                var dx = p1._vector[0] - p2._vector[0];
                var dy = p1._vector[1] - p2._vector[1];
                var dz = p1._vector[2] - p2._vector[2];
                return Math.sqrt(dx * dx + dy * dy + dz * dz);
            }
        }
        return false;
    };
    /** ---------------------------------------------------------------------
     * Print the vector on the console.
     */
    print(name="Point") {
        var maximum = Math.max(this._vector[0], this._vector[1], this._vector[2]);
        var order = Math.floor(Math.log(maximum) / Math.LN10 + 0.000000001);
        var digits = (order <= 0) ? 5 : (order > 5) ? 0 : (5 - order);
        console.log("Point3: " + name + ": " + this._vector[0].toFixed(digits) + " " + this._vector[1].toFixed(digits) + " " + this._vector[2].toFixed(digits));
    };
    static print(name="Point", p) {
        if (p instanceof Point3D) {
            var maximum = Math.max(p._vector[0], p._vector[1], p._vector[2]);
            var order = Math.floor(Math.log(maximum) / Math.LN10 + 0.000000001);
            var digits = (order <= 0) ? 5 : (order > 5) ? 0 : (5 - order);
            console.log("Point3: " + name + ": " + p._vector[0].toFixed(digits) + " " + p._vector[1].toFixed(digits) + " " + p._vector[2].toFixed(digits));
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
        if (p instanceof Point3D || p instanceof Vector3D) {
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
    static getAttrs(p) {
        if (p instanceof Point3D || p instanceof Vector3D) {
            let properties = new Set()
            let currentObj = p
            do {
                Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
            } while ((currentObj = Object.getPrototypeOf(currentObj)))
            return {attributes: [...properties.keys()].sort().filter(item => typeof p[item] !== 'function')};
        }
    }
}

exports.Point3D = Point3D;
