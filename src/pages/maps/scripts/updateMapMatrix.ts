import { IMapMatrix } from "../../../interfaces"
import { BlocksList } from "../BlocksList"
import { Tile } from "../classes/tileClasses"

interface IDraw {
    tileId: number
    variant: number
    X: number
    Y: number
    rotate: 'top' | 'right' | 'bottom' | 'left'
    mapMatrix: IMapMatrix|null
    canvasList: {
        floor: React.MutableRefObject<HTMLCanvasElement | null>,
        prop: React.MutableRefObject<HTMLCanvasElement | null>,
        wall: React.MutableRefObject<HTMLCanvasElement | null>,
        mob: React.MutableRefObject<HTMLCanvasElement | null>,
    }
    blockSize: number
}

function findTileInMapMatrix({ mapMatrix, X, Y, canvaType }: { mapMatrix: Array<Tile[]>, X: number, Y: number, canvaType: 'mob' | 'prop' | 'floor' | 'wall' }): { tile: Tile | null, TilePosition: {X:number,Y:number} } {
    let tile: Tile | null = null
    let TileIndex = {X:-999,Y:-999}
    mapMatrix.forEach((row, rowIndex) => {
        row.forEach((tileData,columnIndex)=>{

            tileData.group?.forEach(PositionTileInGroup => {
                if (PositionTileInGroup.X == X &&
                    PositionTileInGroup.Y == Y &&
                    tileData.canvaType == canvaType) {
                        tile = tileData
                        TileIndex = {X:columnIndex,Y:rowIndex}
                    }
                })
            })
    })
    return {
        tile: tile,
        TilePosition: TileIndex
    }
}

export const updateMapMatrixAdd = ({ canvasList, mapMatrix, tileId, X, Y, variant, rotate, blockSize }: IDraw) => {
    if(!mapMatrix)return null
    
    const blockData = BlocksList.find(block => block.id == tileId)
    if (!blockData) return mapMatrix
    
    const variantData = blockData.variant[variant] || []
    if (!variantData) return mapMatrix

    
    const TileObject = new Tile({
        paths: blockData.variant,
        variant: variant,
        position: { X: X, Y: Y },
        rotate: rotate,
        size: blockData.size,
        status: 0,
        canvaType: blockData.type,
        blockMatrix: blockData.group
    })

    let newMapMatrix:Tile[][] = mapMatrix[TileObject.canvaType]

    TileObject.group?.forEach(elementInRow => {
            newMapMatrix = updateMapMatrixDelete({
                mapMatrix: newMapMatrix,
                canvaType: TileObject.canvaType,
                X: elementInRow.X,
                Y: elementInRow.Y,
                canva: canvasList[TileObject.canvaType],
                blockSize: blockSize
        })
    })

    newMapMatrix[Y][X] = TileObject
    TileObject.renderTile({blockSize,canvas: canvasList[TileObject.canvaType]})
    mapMatrix[TileObject.canvaType] = newMapMatrix
    return mapMatrix 

}

export const updateMapMatrixDelete = ({ X, Y, mapMatrix, canva, canvaType, blockSize }: {
    blockSize: number, X: number, Y: number, mapMatrix: Tile[][], canvaType: "prop" | "wall" | "mob" | "floor", canva: React.MutableRefObject<HTMLCanvasElement | null>
}):Array<Tile[]>|[] => {
    let newMapMatrix = [...mapMatrix]
    let { tile, TilePosition } = findTileInMapMatrix({ mapMatrix: newMapMatrix, X: X, Y: Y, canvaType: canvaType })
    if (!TilePosition || !tile) return newMapMatrix

    tile.eraseTile({
        blockSize: blockSize,
        canvas: canva
    })

    tile.delete()
    

    return newMapMatrix
}
