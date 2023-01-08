import gl2DFExampleDrawScene from './gl2DFExampleDrawScene'
import gl2DFExampleSetupScene from './gl2DFExampleSetupScene'

const glExampleSimple2DTranslation = async (gl: WebGL2RenderingContext) => {
    const {
        program,
        locations,
        vao
    } = await gl2DFExampleSetupScene(gl)

    gl2DFExampleDrawScene({
        gl,
        locations,
        program,
        vao
    })
}

export default glExampleSimple2DTranslation
