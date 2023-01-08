import matrix2DMultiply from '@/shared/matrix2DMultiply'
import matrix2DScaleBuild from './matrix2DScaleBuild'

const matrix2DScale = (matrix: number[], x: number, y: number) => matrix2DMultiply(
    matrix,
    matrix2DScaleBuild(x, y)
)

export default matrix2DScale
