import matrix2DMultiply from '@/shared/matrix2DMultiply'
import matrix2DBuildTranslation from '@/shared/matrix2DBuildTranslation'

const matrix2DTranslate = (matrix: number[], x: number, y: number) => matrix2DMultiply(
    matrix,
    matrix2DBuildTranslation(x, y)
)

export default matrix2DTranslate
