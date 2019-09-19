"use strict";

class Point4D {
    /** ---------------------------------------------------------------------
     * @return Float32Array A new 4-component vector
     */
    constructor (x, y, z, w) {
        this._vector = new Float32Array(4);
        this._vector[0] = 0;
        this._vector[1] = 0;
        this._vector[2] = 0;
        this._vector[3] = 1;
        if (arguments.length >= 1) this._vector[0] = x;
        if (arguments.length >= 2) this._vector[1] = y;
        if (arguments.length >= 3) this._vector[2] = z;
        if (arguments.length >= 4) this._vector[3] = w;
    };

    /** ---------------------------------------------------------------------
     * @return Float32Array A new 4-component point that has the same values as the input argument
     */
    createFrom(from) {
        this._vector = new Float32Array(4);
        if (from instanceof Array) {
            this._vector[0] = from[0];
            this._vector[1] = from[1];
            this._vector[2] = from[2];
            this._vector[3] = from[3];
        }
        if (from instanceof Point4D) {
            this._vector[0] = from._vector[0];
            this._vector[1] = from._vector[1];
            this._vector[2] = from._vector[2];
            this._vector[3] = from._vector[3];
        }
    };
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
     * to = from (copy the 2nd argument point to the first argument)
     */
    copy(from) {
        if (from instanceof Array) {
            this._vector[0] = from[0];
            this._vector[1] = from[1];
            this._vector[2] = from[2];
            this._vector[3] = from[3];
        } else if (from instanceof Point4D) {
            this._vector[0] = from._vector[0];
            this._vector[1] = from._vector[1];
            this._vector[2] = from._vector[2];
            this._vector[3] = from._vector[3];
        }
    };
    static copy(to, from) {
        if (from instanceof Array && to instanceof Point4D) {
            to._vector[0] = from[0];
            to._vector[1] = from[1];
            to._vector[2] = from[2];
            to._vector[3] = from[3];
            return to;
        } else if (from instanceof Point4D && to instanceof Point4D) {
            to._vector[0] = from._vector[0];
            to._vector[1] = from._vector[1];
            to._vector[2] = from._vector[2];
            to._vector[3] = from._vector[3];
            return to;
        } else {
            return undefined;
        }
    };

    /** ---------------------------------------------------------------------
     * @return Number The distance between 2 points
     */
    distanceBetween(p2) {
        var dx, dy, dz;
        if (p2 instanceof Array) {
            dx = this._vector[0] - p2[0];
            dy = this._vector[1] - p2[1];
            dz = this._vector[2] - p2[2];
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        if (p2 instanceof Point4D) {
            dx = this._vector[0] - p2._vector[0];
            dy = this._vector[1] - p2._vector[1];
            dz = this._vector[2] - p2._vector[2];
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
    };
    static distanceBetween(p1, p2) {
        var dx, dy, dz;
        if (p1 instanceof Point4D){
            if (p2 instanceof Array) {
                dx = p1._vector[0] - p2[0];
                dy = p1._vector[1] - p2[1];
                dz = p1._vector[2] - p2[2];
                return Math.sqrt(dx * dx + dy * dy + dz * dz);
            }
            if (p2 instanceof Point4D) {
                dx = p1._vector[0] - p2._vector[0];
                dy = p1._vector[1] - p2._vector[1];
                dz = p1._vector[2] - p2._vector[2];
                return Math.sqrt(dx * dx + dy * dy + dz * dz);
            }
        }
    };
    /** ---------------------------------------------------------------------
     * Normalize the point by dividing by its homogeneous coordinate w
     */
    normalize() {
        if (this._vector[3] !== 0) {
            this._vector[0] = this._vector[0] / this._vector[3];
            this._vector[1] = this._vector[1] / this._vector[3];
            this._vector[2] = this._vector[2] / this._vector[3];
            this._vector[3] = 1;
        }
    };
    static normalize(p) {
        if (p instanceof Point3D) {
            if (p._vector[3] !== 0) {
                p._vector[0] = p._vector[0] / p._vector[3];
                p._vector[1] = p._vector[1] / p._vector[3];
                p._vector[2] = p._vector[2] / p._vector[3];
                p._vector[3] = 1;
            }
            return p;
        }
    };

    /** ---------------------------------------------------------------------
     * Print the vector on the console.
     */
    print(name) {
        var maximum = Math.max(this._vector[0], this._vector[1], this._vector[2], this._vector[3]);
        var order = Math.floor(Math.log(maximum) / Math.LN10 + 0.000000001);
        var digits = (order <= 0) ? 5 : (order > 5) ? 0 : (5 - order);

        console.log("Point4D: " + (name ? name : '') + ": "
            + this._vector[0].toFixed(digits) + " "
            + this._vector[1].toFixed(digits) + " "
            + this._vector[2].toFixed(digits) + " "
            + this._vector[3].toFixed(digits));
    };
    static print(name, p) {
        if (p instanceof Point4D) {
            var maximum = Math.max(p._vector[0], p._vector[1], p._vector[2], p._vector[3]);
            var order = Math.floor(Math.log(maximum) / Math.LN10 + 0.000000001);
            var digits = (order <= 0) ? 5 : (order > 5) ? 0 : (5 - order);

            console.log("Point4D: " + (name ? name : '') + ": "
                + p._vector[0].toFixed(digits) + " "
                + p._vector[1].toFixed(digits) + " "
                + p._vector[2].toFixed(digits) + " "
                + p._vector[3].toFixed(digits));
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
        if (p instanceof Point4D) {
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
        if (p instanceof Point4D) {
            let properties = new Set()
            let currentObj = p
            do {
                Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
            } while ((currentObj = Object.getPrototypeOf(currentObj)))
            return {attributes: [...properties.keys()].sort().filter(item => typeof p[item] !== 'function')};
        }
    }
}

exports.Point4D = Point4D;
