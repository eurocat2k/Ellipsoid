/**
 * Geometry object
 */

/**
 * GEO - the system's center of the current simulation
 */
const GEO = {
    SYS_CENTER_LON:19.2322222222222,
    SYS_CENTER_LAT:47.4452777777778
};
exports.GEO = GEO;

/**
 * Initial constants
 */
const FT2M                   = 0.3048;                  // FT to meter
const PI                     = 4.0 * Math.atan(1.0);    // Math.PI calculated
const NM2M                   = 1852;                    // NM to meters
const TURNRATE               = 3;                       // standard rate of turn
const EARTH_RADIUS_WGS84_M   = 6378137.0;               // WGS84 value of Earth main axis length
//const TAIL_LENGTH            = 5;                       // number of previous positions kept in tail
const TAIL_LENGTH            = 8;                       // number of previous positions kept in tail
const ATTITUDE_CHG_RATE_COEF = 0.57619048;              // set coef value for maximum the climb descent rates of the selected aircraft
const ROUTE_WIDTH_M          = 10000;                   // 10 km with route segments

/**
 * companies for callsigns and squawks
 */
const OPERATORS = {
    'DLH': {_min:932,_max:963},
    'DHL': {_min:964,_max:995},
    'AFR': {_min:996,_max:1127},
    'BAW': {_min:1128,_max:1159},
    'DAL': {_min:1160,_max:1191},
    'SAS': {_min:1192,_max:1223},
    'AFR': {_min:1224,_max:1255},
    'THY': {_min:1255,_max:1287},
    'AUA': {_min:1288,_max:1319},
    'UAE': {_min:1320,_max:1351},
    'UPS': {_min:1352,_max:1383}
};
exports.OPERATORS = OPERATORS;

/**
 * ALERTS constants
 */
const ALERTS = {
    OOM:1
    ,RAM:2
    ,STCW:4
    ,DAIW:8
    ,STCA:16
    ,CRASH:32
};
exports.ALERTS = ALERTS;

const SNMS_SECTOR_STATUS_PREACTIVARED_PERIMETER            = 15 * NM2M;    // preactivated perimeter 15 NM
const SNMS_SECTOR_STATUS_PREACTIVARED_VERTICAL_PERIMETER   = 3;            // preactivated vertical perimeter 300 feet

exports.PI                                                 = PI;
exports.NM2M                                               = NM2M;
exports.TURNRATE                                           = TURNRATE;
exports.EARTH_RADIUS_WGS84_M                               = EARTH_RADIUS_WGS84_M;
exports.TAIL_LENGTH                                        = TAIL_LENGTH;
exports.ATTITUDE_CHG_RATE_COEF                             = ATTITUDE_CHG_RATE_COEF;
exports.ROUTE_WIDTH_M                                      = ROUTE_WIDTH_M;
exports.SNMS_SECTOR_STATUS_PREACTIVARED_PERIMETER          = SNMS_SECTOR_STATUS_PREACTIVARED_PERIMETER;
exports.SNMS_SECTOR_STATUS_PREACTIVARED_VERTICAL_PERIMETER = SNMS_SECTOR_STATUS_PREACTIVARED_VERTICAL_PERIMETER;
exports.SNMS_STCW_VERTICAL_PERIMETER                       = 500 * FT2M;  // 500 ft
exports.SNMS_STCA_VERTICAL_PERIMETER                       = 300 * FT2M;  // 300 ft
exports.SNMS_CRASH_VERTICAL_PERIMETER                      = 100 * FT2M;  // 100 ft
// STCA + CRASH LIMITS
exports.SNMS_STCW_HORIZONTAL_PERIMETER            = 15 * NM2M;  // 15 NM apprx. 3 minutes before STCA
exports.SNMS_STCA_HORIZONTAL_PERIMETER            = 2.5 * NM2M;  // 2.5 NM
exports.SNMS_CRASH_HORIZONTAL_PERIMETER           = 0.01 * NM2M; // ~100 ft
//
/**
 * required function to check function's mandatory arguments
 */
const required = (requiredParamName) => {
    console.info (new Error(`Missing required parameter ${requiredParamName}`))
};
exports.required = required;

/**
 * MATH constants
 */
const MATH = {
    EPSILON:0.0000001,
    PI: PI,
    TWOPI: (2 * PI),
    HALFPI: (0.5 * PI),
    DEG2RAD: (PI / 180.0),
    RAD2DEG: (180.0 / PI),
    DECIMAL_RADIX: 10,
    FULL_CIRCLE_DEGREES: 360
};
exports.MATH = MATH;

/**
 * UI CLOCK's constants
 */
const CLOCK_MODE = {
    SIM: 0,
    REAL: 1
};
exports.CLOCK_MODE = CLOCK_MODE;

exports.FALSE = 0;
exports.TRUE = 1;

/**
 * TIME generic time conversion table
 */
const TIME = {
    ONE_HOUR_IN_SECONDS: 3600,
    ONE_HOUR_IN_MINUTES: 60,
    ONE_HOUR_IN_MILLISECONDS: 3600000,
    ONE_MINUTE_IN_HOURS: 1 / 60,
    ONE_MINUTE_IN_SECONDS: 60,
    ONE_MINUTE_IN_MILLISECONDS: 60000,
    ONE_SECOND_IN_HOURS: 1 / 3600,
    ONE_SECOND_IN_MINUTES: 1 / 60,
    ONE_SECOND_IN_MILLISECONDS: 1000,
    ONE_MILLISECOND_IN_HOURS: 1 / 3600000,
    ONE_MILLISECOND_IN_MINUTES: 1 / 60000,
    ONE_MILLISECOND_IN_SECONDS: 1 / 1000
}
exports.TIME = TIME;

/**
 * RADAR evolution
 */
const RADAR = {
    ACC: 5000,
    APP: 4000
};
exports.RADAR = RADAR;

/**
 * Basic physics unit conversion table
 */
const PHYSICS = {
    EARTH_RADIUS_WGS84_M: EARTH_RADIUS_WGS84_M,
    NM2M: NM2M,
    M2NM: 1.0 / NM2M,
    TURNRATE: TURNRATE,
    KT: {
        KMH: NM2M / 1000,   // 1 knot -> kilometers per hour
        FPS: 1.687810,      // 1 knot -> feet per second
        MPH: 1.150779       // 1 knot -> miles per hour
    },
    MPH: {
        KT: 0.868976,
        KMH: 1.609344,
        FPS: 1.466667
    },
    KMH: {
        KT:0.539968,
        FPS:0.911344,
        MPH:0.621371
    },
    FPM_FPS: 0.0166666667,
    FPM_MS: 0.00508,
    NM_FT: 6076.115485564,
    NM_KM: 1.852,
    NM_M: 1852,
    M_FT: 0.3048,
    KM_FT: 0.0003048,
    KN_MS: 0.51444444,
    KN_MPS: 0.000319661,
    FL_FT: 100,
    FT_FL: 0.01,
    EARTH_RADIUS_KM: EARTH_RADIUS_WGS84_M / 1000
}
exports.PHYSICS = PHYSICS;



