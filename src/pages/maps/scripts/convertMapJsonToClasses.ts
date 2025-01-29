import { IMapMatrix } from "../../../interfaces";
import { Tile } from "../classes/tileClasses";

export default function convertMapJsonToClasses(JsonMap: IMapMatrix) {
    let newMap: IMapMatrix = {
        floor: [],
        prop: [],
        wall: []
    }

    JsonMap.floor.forEach((row) => {
        let newRow:Tile[] = []
        row.forEach((tileData) => {
            newRow.push(new Tile({
                group: tileData.group,
                paths: tileData.paths,
                position: tileData.position,
                rotate: tileData.rotate,
                size: tileData.size,
                status: tileData.status,
                canvaType: tileData.canvaType,
                variant: tileData.variant
            })
            )
        }
        )
        newMap.floor.push(newRow)
    })

    JsonMap.prop.forEach((row, Y) => {
        let newRow:Tile[] = []
        row.forEach((tileData) => {
            newRow.push(new Tile({
                group: tileData.group,
                paths: tileData.paths,
                position: tileData.position,
                rotate: tileData.rotate,
                size: tileData.size,
                status: tileData.status,
                canvaType: tileData.canvaType,
                variant: tileData.variant
            })
            )
        }
        )
        newMap.prop.push(newRow)
    })

    JsonMap.wall.forEach((row, Y) => {
        let newRow:Tile[] = []
        row.forEach((tileData) => {
            newRow.push(new Tile({
                group: tileData.group,
                paths: tileData.paths,
                position: tileData.position,
                rotate: tileData.rotate,
                size: tileData.size,
                status: tileData.status,
                canvaType: tileData.canvaType,
                variant: tileData.variant
            })
            )
        }
        )
        newMap.wall.push(newRow)
    })


    return newMap
}