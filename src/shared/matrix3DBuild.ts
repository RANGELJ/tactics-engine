import matrix3DMultiply from './matrix3DMultiply'

const matrix3DBuild = (initial: number[]) => ({
    value: initial,
    translate: (x: number, y: number, z: number) => {
        const translationMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1
        ]
        return matrix3DBuild(matrix3DMultiply(initial, translationMatrix))
    },
    scale: (x: number, y: number, z: number) => {
        const scaleMatrix = [
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ]
        return matrix3DBuild(matrix3DMultiply(initial, scaleMatrix))
    },
    rotateX: (angleInRadians: number) => {
        const c = Math.cos(angleInRadians)
        const s = Math.sin(angleInRadians)
        const rotationMatrix = [
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1
        ]
        return matrix3DBuild(matrix3DMultiply(initial, rotationMatrix))
    },
    rotateY: (angleInRadians: number) => {
        const c = Math.cos(angleInRadians)
        const s = Math.sin(angleInRadians)
        const rotationMatrix = [
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1
        ]
        return matrix3DBuild(matrix3DMultiply(initial, rotationMatrix))
    },
    rotateZ: (angleInRadians: number) => {
        const c = Math.cos(angleInRadians)
        const s = Math.sin(angleInRadians)
        const rotationMatrix = [
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
        return matrix3DBuild(matrix3DMultiply(initial, rotationMatrix))
    },
    multiply: (matrix: number[]) => matrix3DBuild(matrix3DMultiply(initial, matrix))
})

export default matrix3DBuild
