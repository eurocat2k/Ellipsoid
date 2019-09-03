# Ellipsoid
## Usage
Check if point (***3D***) is inside the ellipsoid - which is repositioned (***translated***) by its *center*, and ***rotated*** by *roll*,*pitch*,*yaw* angles.
```javascript
obj = PointInOrientedEllipsoid(center, point, A, B, C, roll, pitch, yaw)
```
- param **center** {***Vector3D***}

  default value: **new Vector3D**(0, 0, 0)

- param **point** {***Point3D***}

  default value: **new Point3D**(***0***, ***0***, ***0***)

- param **A** {***Number***} axis length

  default value: ***0***

- param **B** {***Number***} axis length

  default value: ***0***

- param **C** {***Number***} axis length

  default value: ***0***

- **roll** (*in degress*)

  default value: ***0***

- **pitch** (*in degrees*)

  default value: ***0***

- **yaw** (*in degrees*)

  default value: ***0***

**return {Object}**

- **distance**: {***Number***} the distance between point and the center of the ellipsoid

- **result**: {***Number***} if this value >= 1, the point is not inside the ellipsoid

- **inside**: {***Boolean***}

- **rMatrix**: {***Matrix3D***} rotation matrix, just for debug

- **R**: {***Matrix3D***} rotation matrix, just for debug

## Example

```javascript
let obj = PointInOrientedEllipsoid(new Vector3D(0,0,0), new Point(2,1,0), 4, 2, 2, 0, 0, 0);

console.log(obj.distance);  // 2.23606797749979

console.log(obj.result);    // 0.5

console.log(obj.inside);    // true
```

