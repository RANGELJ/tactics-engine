import matrix3DBuild from './matrix3DBuild'
import vector3CrossProduct from './vector3CrossProduct'
import vector3Normalize from './vector3Normalize'
import vector3Substract from './vector3Substract'

const matrix3DBuildLookAtMatrix = (cameraPosition: number[], target: number[], up: number[]) => {
    const zAxis = vector3Normalize(vector3Substract(cameraPosition, target))
    const xAxis = vector3Normalize(vector3CrossProduct(up, zAxis))
    const yAxis = vector3Normalize(vector3CrossProduct(zAxis, xAxis))

    return matrix3DBuild([
        xAxis[0], xAxis[1], xAxis[2], 0,
        yAxis[0], yAxis[1], yAxis[2], 0,
        zAxis[0], zAxis[1], zAxis[2], 0,
        cameraPosition[0],
        cameraPosition[1],
        cameraPosition[2],
        1
    ])
}

export default matrix3DBuildLookAtMatrix
