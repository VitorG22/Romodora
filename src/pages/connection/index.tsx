// import { createContext, useContext, useEffect, useState } from "react"
import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AppContext } from "../../AppContext"
import { Alert } from "../../components/toasters"
import convertMapJsonToClasses from "../maps/scripts/convertMapJsonToClasses"
import { IMapMatrix } from "../../interfaces"

export default function Party() {
    const { partyData, setPartyData, socket } = useContext(AppContext)
    const navigate = useNavigate()


    useEffect(() => {

        socket?.off(`partyDeleted_${partyData?.partyCode}`)
        socket?.on(`partyDeleted_${partyData?.partyCode}`, () => {
            if (!setPartyData) return
            setPartyData(undefined)
            socket.removeAllListeners()
            navigate('/home')
            Alert({ message: 'Host Disconnected!' })
        })

        socket?.off(`partyStart_${partyData?.partyCode}`)
        socket?.on(`partyStart_${partyData?.partyCode}`, () => {
            navigate('/party/board')
        })


    }, [])

    useEffect(() => {
        socket?.off(`setPartyData_${partyData?.partyCode}`)
        socket?.on(`setPartyData_${partyData?.partyCode}`, body => {
            if (!setPartyData) return
            console.log(body)

            if (body.partyData.mapData) {

                setPartyData?.({
                    ...body.partyData,
                    mapData: {
                        mapId: body.partyData.mapData.mapId,
                        mapName: body.partyData.mapData.mapName,
                        mapMatrix: convertMapJsonToClasses(body.partyData.mapData.mapMatrix)
                    }
                })
            } else {
                setPartyData(body.partyData)
            }
        })

        socket?.off(`requestPartyData_${partyData?.partyCode}`)
        socket?.on(`requestPartyData_${partyData?.partyCode}`, (body) => {
            socket.emit(`requestedPartyData/${body.subFunction}`, {
                partyData: partyData,
                data: body.data
            })
        })

        socket?.off(`setMapMatrix_${partyData?.partyCode}`)
        socket?.on(`setMapMatrix_${partyData?.partyCode}`, (newMapData: { mapId: string, mapName: string, mapMatrix: IMapMatrix }) => {
            if (!partyData) return
            setPartyData?.({
                ...partyData,
                mapData: {
                    mapId: newMapData.mapId,
                    mapName: newMapData.mapName,
                    mapMatrix: convertMapJsonToClasses(newMapData.mapMatrix)
                }
            })
        })


    }, [partyData])

    return (
        <section className='text-white'>
            <Outlet />
        </section >
    )
}