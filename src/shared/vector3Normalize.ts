const vector3Normalize = (vector: number[]) => {
    const length = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2])
    // make sure we don't divide by 0.
    if (length > 0.00001) {
        return [vector[0] / length, vector[1] / length, vector[2] / length]
    }

    return [0, 0, 0]
}

export default vector3Normalize
