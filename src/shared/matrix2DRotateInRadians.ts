import matrix2DMultiply from '@/shared/matrix2DMultiply'
import matrix2DRotationBuildFromRadians from '@/shared/matrix2DRotationBuildFromRadians'

const matrix2DRotateInRadians = (matrix: number[], angleInRadians: number) => matrix2DMultiply(
    matrix,
    matrix2DRotationBuildFromRadians(angleInRadians)
)

export default matrix2DRotateInRadians
