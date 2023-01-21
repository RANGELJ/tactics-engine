import matrix3DMultiply from '@/shared/matrix3DMultiply'
import matrix3DBuildZRotationFromRadians from '@/shared/matrix3DBuildZRotationFromRadians'

const matrix3DRotateZInRadians = (matrix: number[], angleInRadians: number) => matrix3DMultiply(
    matrix,
    matrix3DBuildZRotationFromRadians(angleInRadians)
)

export default matrix3DRotateZInRadians
