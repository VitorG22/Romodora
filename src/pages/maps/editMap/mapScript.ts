import type { TableMap } from "./mapsClass";

export function saveMap(mapObject:TableMap){
    mapObject.lastModify = new Date()
    console.log(mapObject)

    let mapsList = getMap()

    const currentMapIndex = mapsList.findIndex(mapData => mapData.id == mapObject.id) 
    if(currentMapIndex == -1){
        mapsList.push(mapObject)
    }else{
        mapsList[currentMapIndex] = mapObject
    }
    
    
    localStorage.setItem('romodora_maps', JSON.stringify(mapsList))
}

export function deleteMap(mapId:string){
    let mapsList = getMap()
    let mapToDeleteIndex =mapsList.findIndex(mapData=> mapData.id == mapId)

    mapsList.splice(mapToDeleteIndex,1)
    localStorage.setItem('romodora_maps', JSON.stringify(mapsList))
}

export function getMap(){
    let maps = localStorage.getItem("romodora_maps") || '[]'

    let mapsList:TableMap[] = JSON.parse(maps)
    console.log(mapsList)
    return mapsList
}

export function getMapById(mapId:string){
    console.log(mapId)
    let mapsList = getMap()
    let selectedMap = mapsList.find(mapData => mapData.id == mapId)
    console.log(selectedMap)
    return selectedMap
}
