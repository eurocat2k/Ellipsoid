# Ellipsoid
Check if point (3D) is inside the ellipsoid - positioned, and rotated
## PointInOrientedEllipsoid(center, point, A, B, C, roll, pitch, yaw)
### param center {Vector3D}
default value: {0, 0, 0}
### param point {Point3D}
default value: {0, 0, 0}
### param A {Number} axis length
default value: 0
### param B {Number} axis length
default value: 0
### param C {Number} axis length
default value: 0
### roll (in degress)
default value: 0
### pitch (in degrees)
default value: 0
### yaw (in degrees)
default value: 0
### return {Object}
- distance: {Number} if this value >= 1, the point is not inside the ellipsoid
- inside: {Boolean}
- rMatrix: {Matrix3D} rotation matrix, just for debug
- R: {Matrix3D} rotation matrix, just for debug
## Usage

```javascript
let obj = PointInOrientedEllipsoid(new Vector3D(0,0,0), new Point(2,1,0), 4, 2, 2, 0, 0, 0);

console.log(obj.distance); // 0.5;

console.log(obj.inside);   // true,
```

