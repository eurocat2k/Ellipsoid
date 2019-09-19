/**
 * check point 3D is in ellipsoid
 */
const CONSTANTS = require('./constants/');
const MATH      = require('./math/');
const CORE      = require('./math/core/');
const MATRIX    = require('./math/matrix/');

const Matrix3D = MATRIX.Matrix3D;
const Vector3D = MATRIX.Vector3D;
const Point3D  = MATRIX.Point3D;

const PI                        = CONSTANTS.PI;
const DEG2RAD                   = CONSTANTS.MATH.DEG2RAD;
const required                  = CONSTANTS.required;
/**
 * Import core functions
 */
const round                         = CORE.round;
const min                           = CORE.min;
const log                           = CORE.log;
const max                           = CORE.max;
const pow                           = CORE.pow;
const sqrt                          = CORE.sqrt;
const abs                           = CORE.abs;
const sin                           = CORE.sin;
const cos                           = CORE.cos;
const tan                           = CORE.tan;
const asin                          = CORE.asin;
const acos                          = CORE.acos;
const atan                          = CORE.atan;
const atan2                         = CORE.atan2;
const floor                         = CORE.floor;
const randomInteger                 = CORE.randomInteger;
const isWithin                      = CORE.isWithin;
const calculateMiddle               = CORE.calculateMiddle;
const mod                           = CORE.mod;
const clamp                         = CORE.clamp;
const spread                        = CORE.spread;
const extrapolate_range_clamp       = CORE.extrapolate_range_clamp;
const generateRandomOctalWithLength = CORE.generateRandomOctalWithLength;

const TEST = true;
/**
 * Classic point in ellipsoid check: the ellipsoid centered at origo, and not oriented anyhow.
 * The point is represented by a vector from origo. Using the basic equation: x^2/a^2 + y^2/b^2 + z^2/c^2 = 1.
 * @function Classic_Point_In_Ellipsoid
 * @param p {Vector3D}
 * @param a {Number} axis A
 * @param b {Number} axis B
 * @param c {Number} axis C
 */
const Classic_Point_In_Ellipsoid = (p = new Vector3D, a = 2, b = 2, c = 2) => {
    let ec = new Vector3D();
    let v  = Vector3D.subtract(ec, p);
    return (((v._vector[0] * v._vector[0]) / (a * a)) + ((v._vector[1] * v._vector[1]) / (b * b)) + ((v._vector[2] * v._vector[2]) / (c * c))) <= 1;
};

/**
 * Classic point in ellipsoid check: the ellipsoid centered at ec {Vector3D}, and still not oriented anyhow.
 * The point is represented by a vector from origo. Using the basic equation: x^2/a^2 + y^2/b^2 + z^2/c^2 = 1.
 * @function Classic_Point_In_Ellipsoid
 * @param ec {Vector3D}
 * @param p {Vector3D}
 * @param a {Number} axis A
 * @param b {Number} axis B
 * @param c {Number} axis C
 */
const Classic_Point_In_Ellipsoid_Relocated = (ec = new Vector3D, p = new Vector3D, a = 2, b = 2, c = 2) => {
    //let ec = new Vector3D();
    let v  = Vector3D.subtract(ec, p);
    return (((v._vector[0] * v._vector[0]) / (a * a)) + ((v._vector[1] * v._vector[1]) / (b * b)) + ((v._vector[2] * v._vector[2]) / (c * c))) <= 1;
}

/**
 * PointInOrientedEllipse checks if point 3D is inside the oriented positioned ellipsoid
 * @function PointInOrientedEllipse
 * @param center {Vector3D} the center of the ellipsoid
 * @param point {Point3D} the point will be checked if it is located inside the ellipsoid
 * @param a {Number} X axis of the ellipsoid
 * @param b {Number} Y axis of the ellipsoid
 * @param c {Number} Z axis of the ellipsoid
 * @param angleX {Number} - roll, range [-PI/2..PI/2] in decimal degrees - negative value left roll, otherwise right roll
 * @param angleY {Number} - pitch, range [-PI/2..PI/2] in decimal degrees - negative value down, otherwise up
 * @param angleZ {Number} - yaw, range [-PI..PI] in decimal degrees - negative value CCW turn, otherwise CW turn
 */
const PointInOrientedEllipsoid = (center = new Vector3D, point = new Point3D, a = 2, b = 1, c = 1, angleX = 0, angleY = 0, angleZ = 0) => {
    let R = new Matrix3D;
    let MR = Matrix3D.rotate(R, angleX, angleY, angleZ);
    let MR_RX = Matrix3D.rotateX(R,angleX);
    let MR_RY = Matrix3D.rotateY(R,angleY);
    let MR_RZ = Matrix3D.rotateZ(R,angleZ);
    let MRS = Matrix3D.multiplySeries(MR_RZ, MR_RY, MR_RX);
    let VDIFF = Vector3D.subtract(point,center);
    let VR = Matrix3D.multiplyP3(MRS, VDIFF);
    let result = ((VR._vector[0]*VR._vector[0]) / (a*a)) + ((VR._vector[1]*VR._vector[1]) / (b*b)) + ((VR._vector[2]*VR._vector[2]) / (c*c));
    return ({
        distance: result,
        inside: result <= 1,
        rMatrix: MRS,
        R: MR
    });
};

if (TEST) {    
    let cx     = 0;
    let cy     = 0;
    let cz     = 0;
    let a      = 4;
    let b      = 2;
    let c      = 2;
    //----------------
    let roll  = 0;     // ROLL : negative alpha CCW turn/roll to left, positive alpha CW roll to right
    let pitch = 0;    // PITCH: negative betha turns positive X  axis down direction meanwhile the other end goes upward: so, the range [-PI .. 0 .. PI]
    let yaw   = 0;    // YAW  : negative gamma means CCW turn (eg. heading angles between [180 .. 360], positive gamma means CW turn eg. [0..180])

    let V0 = new Vector3D(cx, cy, cz);
    let VP = new Vector3D(2,1,0);
    let obj = PointInOrientedEllipsoid(V0, VP, a, b, c, roll, pitch, yaw);
    console.log("obj", obj);
}
//
exports.PointInOrientedEllipsoid             = PointInOrientedEllipsoid;
exports.Classic_Point_In_Ellipsoid           = Classic_Point_In_Ellipsoid;
exports.Classic_Point_In_Ellipsoid_Relocated = Classic_Point_In_Ellipsoid_Relocated;
