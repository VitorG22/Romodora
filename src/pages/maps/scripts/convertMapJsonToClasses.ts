import { IMapMatrix } from "../../../interfaces";
import { Tile } from "../../../classes/tileClasses";

export default function convertMapJsonToClasses(JsonMap: IMapMatrix) {
    let newMap: IMapMatrix = {
        floor: [],
        prop: [],
        wall: []
    }

    JsonMap.floor.forEach((row) => {
        let newRow: Tile[] = []
        row.forEach((tileData) => {
            let newTile = new Tile({
                blockMatrix: tileData.blockMatrix,
                isDynamicTile: tileData.isDynamicTile,
                blockId: tileData.blockId,
                group: tileData.group,
                paths: tileData.paths,
                position: tileData.position,
                rotate: tileData.rotate,
                size: tileData.size,
                status: tileData.status,
                canvaType: tileData.canvaType,
                variant: tileData.variant
            })
            newTile.setDynamicGridPosition({ mapMatrix: JsonMap })
            newRow.push(newTile)
        }
        )
        newMap.floor.push(newRow)
    })

    JsonMap.prop.forEach((row) => {
        let newRow: Tile[] = []
        row.forEach((tileData) => {
            let newTile = new Tile({
                blockId: tileData.blockId,
                isDynamicTile: tileData.isDynamicTile,
                blockMatrix: tileData.blockMatrix,
                group: tileData.group,
                paths: tileData.paths,
                position: tileData.position,
                rotate: tileData.rotate,
                size: tileData.size,
                status: tileData.status,
                canvaType: tileData.canvaType,
                variant: tileData.variant
            })
            newTile.setDynamicGridPosition({ mapMatrix: JsonMap })
            newRow.push(newTile)
        }
        )
        newMap.prop.push(newRow)
    })

    JsonMap.wall.forEach((row) => {
        let newRow: Tile[] = []
        row.forEach((tileData) => {
            let newTile = new Tile({
                blockId: tileData.blockId,
                isDynamicTile: tileData.isDynamicTile,
                blockMatrix: tileData.blockMatrix,
                group: tileData.group,
                paths: tileData.paths,
                position: tileData.position,
                rotate: tileData.rotate,
                size: tileData.size,
                status: tileData.status,
                canvaType: tileData.canvaType,
                variant: tileData.variant
            })
            newTile.setDynamicGridPosition({ mapMatrix: JsonMap })
            newRow.push(newTile)
        }
        )
        newMap.wall.push(newRow)
    })


    return newMap
}