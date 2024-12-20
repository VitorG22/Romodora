import React, { createContext, useEffect, useState } from "react";
import LateralNavBar from "../../components/navbar/lateral";
import { Outlet } from "react-router-dom";
import { ITileData } from "./newMap/updateMapMatrix";
import { getMapsFromLocalStorage } from "../../scripts/localStorage/localStorage";
import { Mob } from "./newMap/components/classes/mobClasses";

export interface IMap {
    name: string,
    picture: string,
    id: string,
    mapStructureData: Array<ITileData[]> | []
    sizeX: number
    sizeY: number
}



interface IMapsContext {
    mapList: IMap[]
    setMapList?: React.Dispatch<React.SetStateAction<IMap[]>>
}

export const MapsContext = createContext<IMapsContext>({
    mapList: []
})


export default function Maps() {
    const [mapList, setMapList] = useState<IMap[]>([])

    useEffect(() => {
        const newMapList = getMapsFromLocalStorage()
        setMapList(newMapList || [])
    }, [])

    return (
        <MapsContext.Provider value={{
            mapList: mapList,
            setMapList: setMapList
        }}>
            <main className='flex flex-row h-screen text-lagun-200'>
                <LateralNavBar />
                <Outlet />
            </main>
        </MapsContext.Provider>
    )
}



function teste() {
    let MobArrays = []

    for (let i = 0; i < 10; i++) {
        const NewMob = new Mob({ name: `Mob_${i}`, position: { X: 0, Y: 0 } })
        MobArrays.push(NewMob)
    }
    MobArrays.forEach(element =>
        element.moveTo({
            X: Math.floor(Math.random() * 20),
            Y: Math.floor(Math.random() * 20)
        }))
}
teste()