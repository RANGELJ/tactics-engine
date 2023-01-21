import matrix3DMultiply from '@/shared/matrix3DMultiply'
import matrix3DBuildXRotationFromRadians from '@/shared/matrix3DBuildXRotationFromRadians'

const matrix3DRotateXInRadians = (matrix: number[], angleInRadians: number) => matrix3DMultiply(
    matrix,
    matrix3DBuildXRotationFromRadians(angleInRadians)
)

export default matrix3DRotateXInRadians
