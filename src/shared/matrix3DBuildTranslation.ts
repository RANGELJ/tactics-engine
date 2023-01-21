const matrix3DBuildTranslation = (x: number, y: number, z: number) => [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
]

export default matrix3DBuildTranslation
