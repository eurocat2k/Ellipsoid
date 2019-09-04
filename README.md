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

- **center**: {***Point3D***} the center of the ellipsoid

- **point**: {***Point3D***} the point checked if it is inside the ellipsoid

- **polar**: {***Object***} the point's polar coordinates

  - **distance**: the distance between center and point
  
  - **phi**: degrees in range [*-180..180*]
  
  - **theta**: degrees in range [*-90..90*]

- **result**: {***Number***} if this value >= 1, the point is not inside the ellipsoid

- **inside**: {***Boolean***}

- **rMatrix**: {***Matrix3D***} rotation matrix, just for debug

- **R**: {***Matrix3D***} rotation matrix, just for debug

## Example

```javascript
let obj = PointInOrientedEllipsoid(new Vector3D(10,-20,30), new Point(9,-19,29), 9, 3, 3, 0, 0, 0);

console.log(obj);  // we expect the following result:
                   // {
                   //     bool: true,
                   //     center: { x: 10, y: -20, z: 30 },
                   //     point: { x: 9, y: -19, z: 29 },
                   //     polar: {
                   //         distance: 35.81898937714463,
                   //         phi: -32.03551940773309, 
                   //         theta: 72.75854060106003 
                   //     },
                   //     result: 0.2345679012345679,
                   //     inside: true,
                   //     rMatrix: {Object: Matrix3D},
                   //     R: {Object: Matrix3D}
                   // }

```

