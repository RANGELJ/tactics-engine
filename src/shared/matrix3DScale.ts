import matrix3DMultiply from '@/shared/matrix3DMultiply'
import matrix3DBuildScale from './matrix3DBuildScale'

const matrix3DScale = (matrix: number[], x: number, y: number, z: number) => matrix3DMultiply(
    matrix,
    matrix3DBuildScale(x, y, z)
)

export default matrix3DScale
