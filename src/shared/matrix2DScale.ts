import matrix2DMultiply from '@/shared/matrix2DMultiply'
import matrix2DBuildScale from './matrix2DBuildScale'

const matrix2DScale = (matrix: number[], x: number, y: number) => matrix2DMultiply(
    matrix,
    matrix2DBuildScale(x, y)
)

export default matrix2DScale
