/**
 * Math object
 */
// BEGIN IMPORTS
const Constants = require('../constants/');
const UNIT_CONVERSION_CONSTANTS = Constants.PHYSICS;
const MATH_CONSTANTS = Constants.MATH;
const NUMBER_CONSTANTS = Constants.MATH;
const DECIMAL_RADIX = MATH_CONSTANTS.DECIMAL_RADIX;
/**
 * Import core functions
 */
const MATH_CORE = require('./core/');
const round                         = MATH_CORE.round;
const min                           = MATH_CORE.min;
const max                           = MATH_CORE.max;
const pow                           = MATH_CORE.pow;
const sqrt                          = MATH_CORE.sqrt;
const abs                           = MATH_CORE.abs;
const sin                           = MATH_CORE.sin;
const cos                           = MATH_CORE.cos;
const tan                           = MATH_CORE.tan;
const asin                          = MATH_CORE.asin;
const acos                          = MATH_CORE.acos;
const atan                          = MATH_CORE.atan;
const atan2                         = MATH_CORE.atan2;
const floor                         = MATH_CORE.floor;
const randomInteger                 = MATH_CORE.randomInteger;
const isWithin                      = MATH_CORE.isWithin;
const calculateMiddle               = MATH_CORE.calculateMiddle;
const mod                           = MATH_CORE.mod;
const clamp                         = MATH_CORE.clamp;
const spread                        = MATH_CORE.spread;
const extrapolate_range_clamp       = MATH_CORE.extrapolate_range_clamp;
const generateRandomOctalWithLength = MATH_CORE.generateRandomOctalWithLength;
// END IMPORTS
/**
 * NM -> KM
 * @param nm nautic mile to conver to km
 * @return km
 */
const km = (nm = 0) => {
    return nm * UNIT_CONVERSION_CONSTANTS.NM_KM;
};
exports.km = km;
/**
 * KM -> NM
 * @param km to conver to nautic mile
 * @return nm
 */
const nm = (kilometers = 0) => {
    return kilometers / UNIT_CONVERSION_CONSTANTS.NM_KM;
};
exports.nm = nm;
/**
 * meters -> feet
 *
 * @function m_ft
 * @param {number} [meters=0]
 * @return {number}
 */
const m_ft = (meters = 0) => {
    return meters / UNIT_CONVERSION_CONSTANTS.M_FT;
};
exports.m_ft = m_ft;
/**
 * kilometers --> feet
 *
 * @function km_ft
 * @param kilometers {number}
 * @return {number}
 */
const km_ft = (kilometers = 0) => {
    return kilometers / UNIT_CONVERSION_CONSTANTS.KM_FT;
};
exports.km_ft = km_ft;
/**
 * feet --> kilometers
 *
 * @function ft_km
 * @param nm {number}
 * @return {number}
 */
const ft_km = (ft = 0) => {
    return ft * UNIT_CONVERSION_CONSTANTS.KM_FT;
};
exports.ft_km = ft_km;
/**
 * knots to m/s
 *
 * @function kn_ms
 * @param kn {number}
 * @return {number}
 */
const kn_ms = (kn = 0) => {
    return kn * UNIT_CONVERSION_CONSTANTS.KN_MS;
};
exports.kn_ms = kn_ms;
/**
 * nautical miles to feet
 *
 * @function nm_ft
 * @param nm {number}
 * @return {number}
 */
const nm_ft = (nm) => {
    return nm * UNIT_CONVERSION_CONSTANTS.NM_FT;
};
exports.nm_ft = nm_ft;
/**
 * convert radians to degrees
 *
 * @function radiansToDegrees
 * @param radians {number}
 * @return {number}
 */
const radiansToDegrees = (radians) => {
    return (radians / (MATH_CONSTANTS.TWOPI)) * NUMBER_CONSTANTS.FULL_CIRCLE_DEGREES;
};
exports.radiansToDegrees = radiansToDegrees;
/**
 * convert degrees to radians
 *
 * @function degreesToRadians
 * @param degrees {number}
 * @return {number}
 */
const degreesToRadians = (degrees) => {
    return (degrees / NUMBER_CONSTANTS.FULL_CIRCLE_DEGREES) * (MATH_CONSTANTS.TWOPI);
};
exports.degreesToRadians = degreesToRadians;
/**
 * @function convertMinutesToSeconds
 * @param minutes {number}
 * @return {number}
 */
const convertMinutesToSeconds = (minutes) => minutes * 60;
exports.convertMinutesToSeconds = convertMinutesToSeconds;
/**
 * Utility function to convert a number to thousands.
 * Given a flightlevel FL180, this function outputs 18,000
 * @function covertToThousands
 * @param  {number} value
 * @return {number}
 */
const convertToThousands = (value) => parseInt(value, DECIMAL_RADIX) * UNIT_CONVERSION_CONSTANTS.FL_FT;
exports.convertToThousands = convertToThousands;
/**
 * Attempt to convert a string to a number
 * The implementor will have to handle the case where `parseInt` returns `NaN`
 * @function convertStringToNumber
 * @param  value {string|*}
 * @return {number|NaN}
 */
const convertStringToNumber = (value) => parseInt(value, DECIMAL_RADIX);
exports.convertStringToNumber = convertStringToNumber;
/**
 * Convert a heading in radians to a 360 degree string
 * @function heading_to_string
 * @param heading {string}  heading in radians
 * @return {string}
 */
const heading_to_string = (heading) => {
    heading = round(mod(radiansToDegrees(heading), 360)).toString();
    if (heading === '0') {
        heading = '360';
    }
    if (heading.length === 1) {
        heading = `00${heading}`;
    }
    if (heading.length === 2) {
        heading = `0${heading}`;
    }
    return heading;
};
exports.heading_to_string = heading_to_string;
/**
 * Accept a string elevation and return a number representing elevation in ft.
 *
 * @function parseElevation
 * @param elevation {string}    ex: 13.4ft, 3m, 5ft
 * @return {number}             elevation in feet
 */
const parseElevation = (elevation) => {
    // TODO: move to master REGEX constant
    // this regex will catch the following: `-`, `m`, `ft`, `Infinity`, and is used to extract a number
    // from a string containing these symbols.
    const REGEX = /(-)|(m|ft|Infinity)/gi;

    // if its a number, we're done here.
    // This will catch whole numbers, floats, Infinity and -Infinity.
    // This checks if strings are given will skip the regex and exit early
    // Also stops the function from returning NaN
    if (isNaN(elevation) || elevation === 'Infinity' || elevation === '-Infinity') {
        return parseFloat(elevation);
    }

    let parsedElevation = elevation.replace(REGEX, '');
    const elevationUnit = elevation.match(REGEX);

    // if its in meters, convert it to feet
    if (elevationUnit === 'm') {
        parsedElevation = m_ft(parsedElevation);
    }

    // if it came in as a negative number,return it as a negative number
    if (elevation[0] === '-') {
        parsedElevation *= -1;
    }
    return parseFloat(parsedElevation);
};
exports.parseElevation = parseElevation;

