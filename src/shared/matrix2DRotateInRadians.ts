import matrix2DMultiply from '@/shared/matrix2DMultiply'
import matrix2DBuildRotationFromRadians from '@/shared/matrix2DBuildRotationFromRadians'

const matrix2DRotateInRadians = (matrix: number[], angleInRadians: number) => matrix2DMultiply(
    matrix,
    matrix2DBuildRotationFromRadians(angleInRadians)
)

export default matrix2DRotateInRadians
