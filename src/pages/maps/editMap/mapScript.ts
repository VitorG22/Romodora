import { getData, PostData } from "../../../scripts/axios";
import type { TableMap } from "./mapsClass";

export function saveMap(mapObject: TableMap, onSuccess: () => void, onError: () => void) {

    PostData({
        data: mapObject,
        endPoint: 'saveMap',
        onSuccess: () => onSuccess(),
        onError: () => onError(),
    })
}

export function deleteMap(mapId: string) {
}

export async function getMap(callback: (mapList:TableMap[])=>void) {
    let maps: TableMap[] = []

    getData({
        endPoint: 'allMaps',
        onSuccess: (res) => {
            maps = res.data
            console.log(maps)
            callback(maps)
        },
        onError: (res) => {console.log(res)}
    })
}

export function getMapById(mapId: string) {
    
}
