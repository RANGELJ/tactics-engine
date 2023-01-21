import matrix3DBuildTranslation from '@/shared/matrix3DBuildTranslation'
import matrix3DMultiply from './matrix3DMultiply'

const matrix2DTranslate = (matrix: number[], x: number, y: number, z: number) => matrix3DMultiply(
    matrix,
    matrix3DBuildTranslation(x, y, z)
)

export default matrix2DTranslate
