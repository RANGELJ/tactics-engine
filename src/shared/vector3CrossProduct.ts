const vector3CrossProduct = (vectorA: number[], vectorB: number[]) => [
    vectorA[1] * vectorB[2] - vectorA[2] * vectorB[1],
    vectorA[2] * vectorB[0] - vectorA[0] * vectorB[2],
    vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0]
]

export default vector3CrossProduct
