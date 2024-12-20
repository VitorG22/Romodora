// import { createContext, useContext, useEffect, useState } from "react"
import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AppContext } from "../../AppContext"
import { Alert } from "../../components/toasters"

export default function Party() {
    const {partyData, setPartyData, socket} = useContext(AppContext)
    const navigate= useNavigate()
    

    useEffect(()=>{
        socket?.off(`setPartyData_${partyData?.partyCode}`)
        socket?.on(`setPartyData_${partyData?.partyCode}`, body=>{
            if(!setPartyData)return
            console.log(body)
            setPartyData(body.partyData)
        })

        socket?.off(`partyDeleted_${partyData?.partyCode}`)
        socket?.on(`partyDeleted_${partyData?.partyCode}`, ()=>{
            if(!setPartyData)return
            setPartyData(undefined)
            socket.removeAllListeners()
            navigate('/home')
            Alert({message:'Host Disconnected!'})
        })

        socket?.off(`partyStart_${partyData?.partyCode}`)
        socket?.on(`partyStart_${partyData?.partyCode}`,()=> {
            navigate('/party/board')            
        })

    },[])

    useEffect(()=>{
        socket?.off(`requestPartyData_${partyData?.partyCode}`)
        socket?.on(`requestPartyData_${partyData?.partyCode}`,(body)=>{
            socket.emit(`requestedPartyData/${body.subFunction}`,{
                partyData:partyData,
                data: body.data
            })
        })

    },[partyData])

    return (
            <section className='text-white'>
                <Outlet />
            </section >
    )
}