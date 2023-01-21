import matrix3DMultiply from '@/shared/matrix3DMultiply'
import matrix3DBuildYRotationFromRadians from '@/shared/matrix3DBuildYRotationFromRadians'

const matrix3DRotateYInRadians = (matrix: number[], angleInRadians: number) => matrix3DMultiply(
    matrix,
    matrix3DBuildYRotationFromRadians(angleInRadians)
)

export default matrix3DRotateYInRadians
