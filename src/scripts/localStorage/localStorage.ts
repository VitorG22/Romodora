import { IMap } from "../../pages/maps"

export function saveMapsInLocalStorage( {data}:{data:any}){
    console.log('save in Local')
    localStorage.setItem('RomodoraMyMaps', JSON.stringify(data))
} 

export function getMapsFromLocalStorage():IMap[] {
    try{
        const data: IMap[] = JSON.parse(localStorage.getItem('RomodoraMyMaps') || '')
        return data
    }catch(err){
        return []
    }
}