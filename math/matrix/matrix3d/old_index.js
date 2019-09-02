/**
 * This file defines the Matrix4x4 class.
 * @file Matrix4x4.js
 */

/**
 * Generic class for representing 4x4 matrices.
 * @constructor
 * @param {Object} matrix - An object with the initial values for the Matrix4x4.
 * Can be either an Object or Matrix4x4.
 */
class Matrix3D {
    /**
     * @constructor
     * @param {Object} matrix - An object with the initial values for the Matrix4x4.
     * Can be either an Object or Matrix3D.
     */
    constructor(matrix) {    
        if (matrix) {
            this.set_from_object(matrix);
        } else {
            this.set_identity();
        }
        /**
         * xx component of the matrix.
         * @type {Number}
         * @public
         */
        this.xx = 0;
        /**
         * xy component of the matrix.
         * @type {Number}
         * @public
         */
        this.xy = 0;
        /**
         * xz component of the matrix.
         * @type {Number}
         * @public
         */
        this.xz = 0;
        /**
         * xw component of the matrix.
         * @type {Number}
         * @public
         */
        this.xw = 0;
        /**
         * yx component of the matrix.
         * @type {Number}
         * @public
         */
        this.yx = 0;
        /**
         * yy component of the matrix.
         * @type {Number}
         * @public
         */
        this.yy = 0;
        /**
         * yz component of the matrix.
         * @type {Number}
         * @public
         */
        this.yz = 0;
        /**
        * yw component of the matrix.
        * @type {Number}
        * @public
        */
        this.yw = 0;
        /**
        * zx component of the matrix.
        * @type {Number}
        * @public
        */
        this.zx = 0;
        /**
        * zy component of the matrix.
        * @type {Number}
        * @public
        */
        this.zy = 0;
        /**
        * zz component of the matrix.
        * @type {Number}
        * @public
        */
        this.zz = 0;
        /**
        * zw component of the matrix.
        * @type {Number}
        * @public
        */
        this.zw = 0;
        /**
        * wx component of the matrix.
        * @type {Number}
        * @public
        */
        this.wx = 0;
        /**
        * wy component of the matrix.
        * @type {Number}
        * @public
        */
        this.wy = 0;
        /**
        * wz component of the matrix.
        * @type {Number}
        * @public
        */
        this.wz = 0;
        /**
        * ww component of the matrix.
        * @type {Number}
        * @public
        */
        this.ww = 0;
    }

    /**
    * Set matrix components from object
    * @param {Object} obj - Object with each component of the matrix, all components must be present.
    * @public
    */
    set_from_object = (obj) => {
        this.xx = obj.xx; this.xy = obj.xy; this.xz = obj.xz; this.xw = obj.xw;
        this.yx = obj.yx; this.yy = obj.yy; this.yz = obj.yz; this.yw = obj.yw;
        this.zx = obj.zx; this.zy = obj.zy; this.zz = obj.zz; this.zw = obj.zw;
        this.wx = obj.wx; this.wy = obj.wy; this.wz = obj.wz; this.ww = obj.ww;
    }
    /**
    * Set all matrix components to 0.
    * @public
    */
    clear = () => {
        this.xx = this.xy = this.xz = this.xw =
        this.yx = this.yy = this.yz = this.yw =
        this.zx = this.zy = this.zz = this.zw =
        this.wx = this.wy = this.wz = this.ww = 0;
    }
    /**
    * Set matrix to the identity matrix.
    * @public
    */
    set_identity = () => {
        this.clear();
        this.xx = this.yy = this.zz = this.ww = 1;
    }
    /**
    * Sets this matrix to a rotation matrix.
    * @param {Number} axis - The vector to rotate around.
    * @param {Number} angle - The angle to rotate in radians.
    * @public
    */
    set_rotation = (axis, angle) => {
        var rad = angle * Math.PI / 180;
        this.set_identity();

        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var t = 1-c;
        var X = axis.x;
        var Y = axis.y;
        var Z = axis.z;

        this.xx = t * X * X + c;
        this.xy = t * X * Y + s * Z;
        this.xz = t * X * Z - s * Y;

        this.yx = t * X * Y - s * Z;
        this.yy = t * Y * Y + c;
        this.yz = t * Y * Z + s * X;

        this.zx = t * X * Z + s * Y;
        this.zy = t * Y * Z - s * X;
        this.zz = t * Z * Z + c;
    }
    /**
    * Sets this matrix to a scaling matrix.
    * @param {Number} x - Scaling factor in the x axis.
    * @param {Number} y - Scaling factor in the y axis.
    * @param {Number} z - Scaling factor in the z axis.
    * @public
    */
    set_scaling = (x, y, z) => {
        this.set_identity();

        this.xx = x;
        this.yy = y;
        this.zz = z;
    }

    /**
    * Sets the translation elements of this matrix while leaving the
    * rest of the matrix untouched.
    * @param {Number} x - Translation amount in the x axis.
    * @param {Number} y - Translation amount in the y axis.
    * @param {Number} z - Translation amount in the z axis.
    */
    set_translation_elements = (x, y, z) => {
        this.wx = x;
        this.wy = y;
        this.wz = z;
    }

    /**
    * Sets this matrix to the dot product between this matrix and the
    * matrix specified by rhs.
    * @param {Matrix4x4} matrix - The matrix on the right hand side of the dot product.
    */
    multiply = (matrix = new Matrix3D) {

        var _mat = new Matrix4x4(this);

        this.xx = _mat.xx * matrix.xx + _mat.xy * matrix.yx + _mat.xz * matrix.zx + _mat.xw * matrix.wx;
        this.xy = _mat.xx * matrix.xy + _mat.xy * matrix.yy + _mat.xz * matrix.zy + _mat.xw * matrix.wy;
        this.xz = _mat.xx * matrix.xz + _mat.xy * matrix.yz + _mat.xz * matrix.zz + _mat.xw * matrix.wz;
        this.xw = _mat.xx * matrix.xw + _mat.xy * matrix.yw + _mat.xz * matrix.zw + _mat.xw * matrix.ww;
        this.yx = _mat.yx * matrix.xx + _mat.yy * matrix.yx + _mat.yz * matrix.zx + _mat.yw * matrix.wx;
        this.yy = _mat.yx * matrix.xy + _mat.yy * matrix.yy + _mat.yz * matrix.zy + _mat.yw * matrix.wy;
        this.yz = _mat.yx * matrix.xz + _mat.yy * matrix.yz + _mat.yz * matrix.zz + _mat.yw * matrix.wz;
        this.yw = _mat.yx * matrix.xw + _mat.yy * matrix.yw + _mat.yz * matrix.zw + _mat.yw * matrix.ww;
        this.zx = _mat.zx * matrix.xx + _mat.zy * matrix.yx + _mat.zz * matrix.zx + _mat.zw * matrix.wx;
        this.zy = _mat.zx * matrix.xy + _mat.zy * matrix.yy + _mat.zz * matrix.zy + _mat.zw * matrix.wy;
        this.zz = _mat.zx * matrix.xz + _mat.zy * matrix.yz + _mat.zz * matrix.zz + _mat.zw * matrix.wz;
        this.zw = _mat.zx * matrix.xw + _mat.zy * matrix.yw + _mat.zz * matrix.zw + _mat.zw * matrix.ww;
        this.wx = _mat.wx * matrix.xx + _mat.wy * matrix.yx + _mat.wz * matrix.zx + _mat.ww * matrix.wx;
        this.wy = _mat.wx * matrix.xy + _mat.wy * matrix.yy + _mat.wz * matrix.zy + _mat.ww * matrix.wy;
        this.wz = _mat.wx * matrix.xz + _mat.wy * matrix.yz + _mat.wz * matrix.zz + _mat.ww * matrix.wz;
        this.ww = _mat.wx * matrix.xw + _mat.wy * matrix.yw + _mat.wz * matrix.zw + _mat.ww * matrix.ww;
    }

    /**
    * Returns a deep copy of this matrix.
    * @return {Matrix4x4} A deep copy of this matrix.
    */
    clone = () => {
        return new Matrix3D(this);
    }

    /**
    * Returns a pretty print string representation of the matrix.
    * @return {String} Pretty printed string of the matrix.
    */
    to_string = () => {
        return '{\n'
            + '\t"xx": ' + this.xx + ', "xy": ' + this.xy + ', "xz": ' + this.xz + ', "xw": ' + this.xw + ',\n'
            + '\t"yx": ' + this.yx + ', "yy": ' + this.yy + ', "yz": ' + this.yz + ', "yw": ' + this.yw + ',\n'
            + '\t"zx": ' + this.zx + ', "zy": ' + this.zy + ', "zz": ' + this.zz + ', "zw": ' + this.zw + ',\n'
            + '\t"wx": ' + this.wx + ', "wy": ' + this.wy + ', "wz": ' + this.wz + ', "ww": ' + this.ww + '\n'
            +'}';
    }
}

exports.Matrix3D = Matrix3D;
