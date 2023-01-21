const matrix3DGetProjection = (width: number, height: number, depth: number) => [
    // The 0,0 will be at the top left corner of the canvas
    2 / width, 0, 0, 0,
    0, -2 / height, 0, 0,
    0, 0, 2 / depth, 0,
    -1, 1, 0, 1
]

export default matrix3DGetProjection
