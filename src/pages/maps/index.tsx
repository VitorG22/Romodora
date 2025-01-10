import React, { createContext, useEffect, useState } from "react";
import LateralNavBar from "../../components/navbar/lateral";
import { Outlet } from "react-router-dom";
import { getMapsFromLocalStorage } from "../../scripts/localStorage/localStorage";
import { IMapMatrix } from "../../interfaces";

export interface IMap {
    name: string,
    picture: string,
    id: string,
    mapMatrix: IMapMatrix
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