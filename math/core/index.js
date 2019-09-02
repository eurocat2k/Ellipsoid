/**
 * Math core functions collection
 */
'use strict';

const Constants = require('../../constants/');

/**
 * @function min
 * @return {number}
 */
exports.min = function min(a, b) {
    return Math.min(a,b);
}
/**
 * @function log
 * @return {number}
 */
exports.log = function log(b) {
    return Math.log(b);
}
/**
 * @function max
 * @return {number}
 */
exports.max = function max(a, b) {
    return Math.max(a,b);
}
/**
 * @function round
 * @return {number}
 */
exports.round = function round(n, factor = 1) {
    return Math.round(n / factor) * factor;
}
/**
 * @function pow
 * @return {number}
 */
exports.pow = function pow(n, exponent = 1) {
    return Math.pow(n, exponent);
}
/**
 * @function abs
 * @return {number}
 */
exports.abs = function abs(n) {
    return Math.abs(n);
}
/**
 * @function sin
 * @return {number}
 */
exports.sin = function sin(a) {
    return Math.sin(a);
}
/**
 * @function asin
 * @return {number}
 */
exports.asin = function asin(a) {
    return Math.asin(a);
}
/**
 * @function cos
 * @return {number}
 */
exports.cos = function cos(a) {
    return Math.cos(a);
}
/**
 * @function acos
 * @return {number}
 */
exports.acos = function acos(a) {
    return Math.acos(a);
}
/**
 * @function tan
 * @return {number}
 */
exports.tan = function tan(a) {
    return Math.tan(a);
}
/**
 * @function atan
 * @return {number}
 */
exports.atan = function atan(a) {
    return Math.atan(a);
}
/**
 * @function atan2
 * @return {number}
 */
exports.atan2 = function atan(a,b) {
    return Math.atan2(a,b);
}
/**
 * @function sqrd
 * @return {number}
 */
exports.sqrt = function sqrt(a) {
    return Math.sqrt(a);
}
/**
 * @function floor
 * @return {number}
 */
exports.floor = function floor(n, number = 1) {
    return Math.floor(n / number) * number;
}
/**
 * @function floor
 * @return {number}
 */
exports.ceil = function ceil(n, number = 1) {
    return Math.ceil(n / number) * number;
}
exports.roundNearest = function roundNearest(num, acc){
    if ( acc < 0 ) {
        return Math.round(num*acc)/acc;
    } else {
        return Math.round(num/acc)*acc;
    }
}
/**
 * @function randomInteger
 * @return {number}
 */
exports.randomInteger = function randomInteger(low = -1, high = 1) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
}
/**
 * Checks whether or not a given value is between (inclusive) two given values
 *
 * Note: The more efficient order is to pass (value, minimum, maximum), but if the
 * relative values are not known, the function will still conduct the comparison
 * correctly.
 *
 * @function isWithin
 * @param value {number}    the value in question
 * @param limit1 {number}   constraining value (inclusive)
 * @param limit2 {number}   constraining value (inclusive)
 * @return {boolean}
 */
exports.isWithin = (value = 0, limit1 = 0, limit2 = 0) => {
    //console.log({val: value, olimit1: limit1, olimit2:limit2});
    if (limit1 > limit2) {
        const oldLimit1 = limit1;
        limit1 = limit2;
        limit2 = oldLimit1;
        //console.log({val: value, nlimit1: limit1, nlimit2:limit2});
    }
    //console.log({test:"limit1 <= value && value <= limit2", result: (limit1 <= value && value <= limit2)});
    return (limit1 <= value && value <= limit2);
};
/**
 * Given a number, find the middle value.
 *
 * @method calculateMiddle
 * @param  {number} value
 * @return {number}
 */
exports.calculateMiddle = function calculateMiddle(value = 0) {
    if (!isNaN(value)) {
        throw new TypeError(`Invalid parameter, expected a number but found ${typeof value}`);
    }

    return round(value / 2);
}
/**
 *
 * @function mod
 * @param firstValue {number}
 * @param secondValue {number}
 * @return {number}
 */
exports.mod = function mod(firstValue, secondValue) {
    return ((firstValue % secondValue) + secondValue) % secondValue;
}
/**
 * Clamp a value to be within a certain range
 * Note: For the opposite, see `spread()`
 *
 * @function clamp
 * @param min {number}
 * @param valueToClamp {number}
 * @param max {number} (optional)
 * @return {number}
 */
exports.clamp = function clamp(valueToClamp, min, max = Infinity) {
    let temp;

    if (!isNaN(valueToClamp)) {
        throw new TypeError('Invalid parameter. Expected `valueToClamp` to be a number');
    }

    if (max === Infinity) {
        if (min > valueToClamp) {
            return min;
        }

        return valueToClamp;
    }

    if (min > max) {
        temp = max;
        max = min;
        min = temp;
    }

    if (min > valueToClamp) {
        return min;
    }

    if (max < valueToClamp) {
        return max;
    }

    return valueToClamp;
}
/**
 * Spread a value to be OUTSIDE OF a certain range
 * Note: For the opposite, see `clamp()`
 *
 * @function spread
 * @param value {number} the value in question
 * @param lowerLimit {number} the minimum value that is considered unacceptable
 * @param upperLimit {number} the maximum value that is considered unacceptable
 * @return {number}
 */
exports.spread = function spread(value, lowerLimit, upperLimit) {
    const averageOfLimits = (lowerLimit + upperLimit) / 2;

    if (value <= lowerLimit || value >= upperLimit) {
        return value;
    }

    if (value < averageOfLimits) {
        return lowerLimit;
    }

    return upperLimit;
}
/**
 * Takes a value's position relative to a given range, and extrapolates to another range.
 *
 * Note: Return will be outside range2 if target_val is outside range1.
 *       If you wish to clamp it within range2, use extrapolate_range_clamp.
 *
 * @function extrapolate_range
 * @param  {number} range1_min minimum value of range 1
 * @param  {number} target_val target value within range 1
 * @param  {number} range1_max maximum value of range 1
 * @param  {number} range2_min minimum value of range 2
 * @param  {number} range2_max maximum value of range 2
 * @return {number}            target value wihtin range 2
 */
function extrapolate_range(range1_min, target_val, range1_max, range2_min, range2_max) {
    return range2_min + (range2_max - range2_min) * (target_val - range1_min) / (range1_max - range1_min);
}
/**
 * Take a value's location relative to a given range then extrapolate to (and clamp within) another range.
 *
 * Note: Return will be clamped within range2, even if target_val is outside range1.
 *       If you wish to allow extrapolation beyond the bounds of range2, us extrapolate_range.
 *
 * @function extrapolate_range_clamp
 * @param  {number} range1Min       minimum value of range1
 * @param  {number} targetValue     target value relative to range1
 * @param  {number} range1Max       maximum value of range1
 * @param  {number} range2Min       minimum value of range2
 * @param  {number} range2Max       maximum value of range2
 * @return {number}                 target value within range2
 */
exports.extrapolate_range_clamp = function extrapolate_range_clamp(range1Min, targetValue, range1Max, range2Min, range2Max) {
    const extrapolationResult = extrapolate_range(range1Min, targetValue, range1Max, range2Min, range2Max);

    return clamp(extrapolationResult, range2Min, range2Max);
}
/**
 * Generate a random number with each digit between 0-7
 *
 * @function generateRandomOctalWithLength
 * @return {string}                         number with digits between 0-7
 */
exports.generateRandomOctalWithLength = function generateRandomOctalWithLength(length = 1) {
    const value = [];
    function _random(low = -1, high = 1) {
        return Math.floor(Math.random() * (high - low + 1)) + low;
    }
    for (let i = 0; i < length; i++) {
        const randomOctal = _random(0, 7);
        value.push(randomOctal);
    }
    //return leftPad(value.join(''), length);
    return value.join('');
}
/**
 * Normalize angle
 * @function normalizeAngle
 * @param {Number} angle in decimal degrees
 * @return {Number} a normalized angle between 0 and 360 degrees
 */
/*
exports.normalizeAngle = function normalizeAngle(a = 0) {
    let v = a * Constants.MATH.DEG2RAD;
    if (v >= 0.0 && v < Constants.MATH.TWOPI) return (v * Constants.MATH.RAD2DEG);
    if (v < 0.0)
        v = Constants.MATH.TWOPI + (v % Constants.MATH.TWOPI);
    else
        v = v % Constants.MATH.TWOPI;
    return (v * Constants.MATH.RAD2DEG);
}
*/
exports.normalizeAngle = function normalizeAngle(a = 0) {
    if (0<=a && a<360) return a; // avoid rounding due to arithmetic ops if within range
    return ((a % 360) + 360) % 360;
}
/**
 * Remove element from array by its value
 * @function rm_ElemFromArrayByValue
 * @param array
 * @param elem
 * @return new array without element(s) equal to elem
 */
exports.rm_ElemFromArrayByValue = function rm_ElemFromArrayByValue(arr = []) {
    let what, a = arguments, L = a.length, ax;
    // IE8 compatibility fix
    if(!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(what, i) {
            i = i || 0;
            let H = this.length;
            while (i < H) {
                if(this[i] === what) return i;
                ++i;
            }
            return -1;
        };
    }
    //
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
};
