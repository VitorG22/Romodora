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

export function deleteMap({mapId,callback}:{mapId: string, callback:()=>void}) {
    PostData({
        data:{mapId: mapId},
        endPoint: 'deleteMap',
        onSuccess: () => callback()
    })
}

export async function getMap(callback: (mapList:TableMap[])=>void) {
    let maps: TableMap[] = []

    getData({
        endPoint: 'allMaps',
        onSuccess: (res) => {
            maps = res.data
            callback(maps)
        },
        onError: (res) => {console.log(res)}
    })
}