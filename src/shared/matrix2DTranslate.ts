import matrix2DMultiply from '@/shared/matrix2DMultiply'
import matrix2DTranslationBuild from '@/shared/matrix2DTranslationBuild'

const matrix2DTranslate = (matrix: number[], x: number, y: number) => matrix2DMultiply(
    matrix,
    matrix2DTranslationBuild(x, y)
)

export default matrix2DTranslate
