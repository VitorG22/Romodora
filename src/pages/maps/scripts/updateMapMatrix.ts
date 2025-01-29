import { IMapMatrix, IPartyData } from "../../../interfaces"
import { BlocksList } from "../BlocksList"
import { Mob } from "../classes/mobClasses"
import { Tile } from "../classes/tileClasses"

interface IDraw {
    tileId: number
    variant: number
    status: number
    X: number
    Y: number
    rotate: 'top' | 'right' | 'bottom' | 'left'
    mapMatrix: IMapMatrix|null
    canvasList: {
        floor: React.MutableRefObject<HTMLCanvasElement | null>,
        prop: React.MutableRefObject<HTMLCanvasElement | null>,
        wall: React.MutableRefObject<HTMLCanvasElement | null>,
    }
    blockSize: number
}

export function findTileInMapMatrix({ matrix, tilePositionX, tilePositionY }: { matrix: Tile[][], tilePositionX: number, tilePositionY: number }): Tile | undefined {
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


export const findMob=({partyData, tilePositionX, tilePositionY }:{partyData:IPartyData ,tilePositionX: number, tilePositionY: number }):Mob| undefined=>{
    let selectedMob:Mob| undefined = undefined

    partyData?.players.forEach(playerData => {
        if(!playerData.characterData?.id)return

        if(playerData.characterData?.position.X == tilePositionX && playerData.characterData?.position.Y == tilePositionY){
            selectedMob = playerData.characterData
        }
    })
    return selectedMob
}

export const findMobById=({partyData, mobId }:{partyData:IPartyData ,mobId:string }):Mob| undefined=>{
    let selectedMob:Mob| undefined = undefined

    partyData?.players.forEach(playerData => {
        if(!playerData.characterData?.id)return

        if(playerData.characterData?.id == mobId){
            selectedMob = playerData.characterData
        }
    })
    return selectedMob
}


export const updateMapMatrixAdd = ({ status, canvasList, mapMatrix, tileId, X, Y, variant, rotate, blockSize }: IDraw) => {
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
        status: status,
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

export const updateMapMatrixDelete = ({ X, Y, mapMatrix, canva, blockSize }: {
    blockSize: number, X: number, Y: number, mapMatrix: Tile[][], canvaType: "prop" | "wall" | "floor", canva: React.MutableRefObject<HTMLCanvasElement | null>
}):Array<Tile[]>|[] => {
    let newMapMatrix = [...mapMatrix]
    let tile  = findTileInMapMatrix({ matrix: newMapMatrix, tilePositionX: X, tilePositionY: Y})
    if (!tile) return newMapMatrix

    tile.eraseTile({
        blockSize: blockSize,
        canvas: canva
    })

    tile.deleteThisTile()
    

    return newMapMatrix
}
