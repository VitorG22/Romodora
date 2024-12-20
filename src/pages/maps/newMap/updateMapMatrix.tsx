import { BlocksList } from "./BlocksList"

export interface ITileData {
    props: {
        paths: string[]
        tileId: number
        variant: number
        size: {
            X: number
            Y: number
        }
        rotate: 'top' | 'right' | 'bottom' | 'left'
        type: 'solid' | 'void'
        group?: Array<{ X: number, Y: number }>
    } | null
    floor: {
        paths: string[]
        tileId: number
        variant: number
        size: {
            X: number
            Y: number
        }
        rotate: 'top' | 'right' | 'bottom' | 'left'
        type: 'solid' | 'void'
    } | null
}

interface IDraw {
    tileId: number
    variant: number
    X: number
    Y: number
    rotate: 'top' | 'right' | 'bottom' | 'left'
    mapMatrix: Array<ITileData[]>

}

export const updateMapMatrixAdd = ({ mapMatrix, tileId, X, Y, variant, rotate }: IDraw) => {
    let newMapMatrix = [...mapMatrix]

    const blockData = BlocksList.find(block => block.id == tileId)
    if (!blockData) return newMapMatrix

    const variantData = blockData.variant[variant] || []
    if (!variantData) return newMapMatrix

    switch (blockData.type) {
        case "floor":
            newMapMatrix[Y][X] = {
                ...newMapMatrix[Y][X],
                floor: {
                    paths: variantData.path,
                    type: 'solid',
                    rotate,
                    size: blockData.size,
                    tileId: blockData.id,
                    variant
                },
            }
            break
        case "prop":
            let PropsGroupMatrix: Array<{ X: number, Y: number }> = []
            for (let YCount = 0; YCount < blockData.size.Y; YCount++) {
                for (let XCount = 0; XCount < blockData.size.X; XCount++) {
                    switch (rotate) {
                        case "top": case "bottom":
                            PropsGroupMatrix.push({
                                X: X + XCount,
                                Y: Y + YCount
                            })

                            break
                        case "right": case "left":
                            PropsGroupMatrix.push({
                                Y: Y + XCount,
                                X: X + YCount
                            })
                            break
                    }

                }
            }

            PropsGroupMatrix.forEach((element) => {
                try {
                    if (newMapMatrix[element.Y][element.X].props?.group) {
                        newMapMatrix[element.Y][element.X].props?.group?.forEach(elementToDelet => {
                            newMapMatrix[elementToDelet.Y][elementToDelet.X] = {
                                ...newMapMatrix[elementToDelet.Y][elementToDelet.X],
                                props: null,
                            }
                        })
                    }

                    newMapMatrix[element.Y][element.X] = {
                        ...newMapMatrix[element.Y][element.X],
                        props: {
                            paths: [''],
                            rotate: rotate,
                            tileId: tileId,
                            type: "void",
                            variant: variant,
                            size: blockData.size,
                            group: PropsGroupMatrix
                        },

                    }
                } catch (err) {}
            })

            newMapMatrix[Y][X] = {
                ...newMapMatrix[Y][X],
                props: {
                    paths: variantData.path,
                    rotate: rotate,
                    tileId: tileId,
                    type: "solid",
                    variant: variant,
                    size: blockData.size,
                    group: PropsGroupMatrix
                }
            }
            break
    }


    return newMapMatrix



}

export const updateMapMatrixDelete = ({ X, Y, mapMatrix, LayerToDelete }: { X: number, Y: number, mapMatrix: Array<ITileData[]>, LayerToDelete: 'floor' | 'props' | 'mobs' }) => {
    let newMapMatrix = [...mapMatrix]
    console.log('teste', LayerToDelete)


    switch (LayerToDelete) {
        case "floor":
            newMapMatrix[Y][X].floor = null
            break
        case "props":
            const PropsBlockGroup = newMapMatrix[Y][X].props?.group
            if (!PropsBlockGroup) { newMapMatrix[Y][X].props = null; break }

            PropsBlockGroup?.forEach(element => {
                newMapMatrix[element.Y][element.X].props = null
            });
            break
    }

    return (newMapMatrix)
}
