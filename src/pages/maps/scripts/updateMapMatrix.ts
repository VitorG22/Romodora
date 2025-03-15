import { IMapMatrix, IPartyData } from "../../../interfaces"
import { BlocksList } from "../BlocksList"
import { Mob } from "../../../classes/mobClasses"
import { Tile } from "../../../classes/tileClasses"

interface IDraw {
    tileId: string
    variant: number
    status: number
    X: number
    Y: number
    rotate: 'top' | 'right' | 'bottom' | 'left'
    mapMatrix: IMapMatrix | null
    canvasList: {
        floor: React.MutableRefObject<HTMLCanvasElement | null>,
        prop: React.MutableRefObject<HTMLCanvasElement | null>,
        wall: React.MutableRefObject<HTMLCanvasElement | null>,
    }
    blockSize: number
}

export function findTileInMapMatrix({ matrix, tilePositionX, tilePositionY }: { matrix: Array<Array<Tile>>, tilePositionX: number, tilePositionY: number }): Tile | undefined {
    let tilesGroup: Array<Tile> = []
    matrix.flat().forEach(tileData =>
        tileData.group?.forEach(groupTilePosition => {
            if (groupTilePosition.X == tilePositionX && groupTilePosition.Y == tilePositionY) {
                console.log('find')
                tilesGroup.push(tileData)
                console.log(tileData.canvaType, tilesGroup)
            }
        }))

    return tilesGroup[0]
}


export const findMob = ({ partyData, tilePositionX, tilePositionY }: { partyData: IPartyData, tilePositionX: number, tilePositionY: number }): Mob | undefined => {
    let selectedMob: Mob | undefined = undefined

    partyData?.players.forEach(playerData => {
        if (!playerData.characterData?.id) return

        if (playerData.characterData?.position.X == tilePositionX && playerData.characterData?.position.Y == tilePositionY) {
            selectedMob = playerData.characterData
        }
    })
    return selectedMob
}

export const findMobById = ({ partyData, mobId }: { partyData: IPartyData, mobId: string }): Mob | undefined => {
    let selectedMob: Mob | undefined = undefined

    partyData?.players.forEach(playerData => {
        if (!playerData.characterData?.id) return

        if (playerData.characterData?.id == mobId) {
            selectedMob = playerData.characterData
        }
    })
    return selectedMob
}


export const updateMapMatrixAdd = ({ status, canvasList, mapMatrix, tileId, X, Y, variant, rotate, blockSize }: IDraw) => {
    if (!mapMatrix) return null

    const blockData = BlocksList.find(block => block.id == tileId)
    if (!blockData) return mapMatrix

    const variantData = blockData.variant[variant] || []
    if (!variantData) return mapMatrix

    let TileObject = new Tile({
        
        isDynamicTile: blockData.isDynamicTile,
        blockId: blockData.id,
        paths: blockData.variant,
        variant: variant,
        position: { X: X, Y: Y },
        rotate: rotate,
        size: blockData.size,
        status: status,
        canvaType: blockData.type,
        blockMatrix: blockData.group
    })


    let newMapMatrix: Array<Array<Tile>> = mapMatrix[TileObject.canvaType]

    TileObject.group?.forEach(elementInRow => {
        newMapMatrix = updateMapMatrixDelete({
            mapMatrix: mapMatrix,
            canvaType: TileObject.canvaType,
            X: elementInRow.X,
            Y: elementInRow.Y,
            canva: canvasList[TileObject.canvaType],
            blockSize: blockSize
        })
    })

    newMapMatrix[Y][X] = TileObject
    
    mapMatrix[TileObject.canvaType] = newMapMatrix
    
    if(TileObject.isDynamicTile){
        TileObject.setDynamicGridPosition({mapMatrix})
    }
    TileObject.renderTile()
    
    return mapMatrix

}

export const updateMapMatrixDelete = ({ X, Y, mapMatrix, canvaType }: {
    blockSize: number, X: number, Y: number, mapMatrix: IMapMatrix, canvaType: "prop" | "wall" | "floor", canva: React.MutableRefObject<HTMLCanvasElement | null>
}): Array<Tile[]> | [] => {
    let newMapMatrix = [...mapMatrix[canvaType]]
    let tile = findTileInMapMatrix({ matrix: newMapMatrix, tilePositionX: X, tilePositionY: Y })
    if (!tile) return newMapMatrix


    if(tile.isDynamicTile){
        tile.deleteThisTile()
        tile.eraseTile({mapMatrix: mapMatrix})
    }else{   
        tile.eraseTile({mapMatrix: mapMatrix})
        tile.deleteThisTile()
    }


    return newMapMatrix
}
