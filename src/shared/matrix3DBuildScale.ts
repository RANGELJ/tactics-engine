const matrix3DBuildScale = (x: number, y: number, z: number) => [
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1
]

export default matrix3DBuildScale
