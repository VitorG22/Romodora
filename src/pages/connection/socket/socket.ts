import io, { Socket } from "socket.io-client"
import { IPartyData } from "../../../interfaces"

export async function setSocketUserData({token}:{token:string}) {
    const apiBaseURL = import.meta.env.VITE_API_URL

    const socket:Socket = io(apiBaseURL)
    socket.emit('setUserData', {token:token})

    return await socket
}

export async function initParty({socket, token, journeyId}:{socket: Socket, token:string, journeyId:string}){
    socket.emit("initParty", {
        token: token,
        journeyId: journeyId
    })
}

export async function leaveParty({socket, partyData, navigate, setPartyData}:{
    socket: Socket|undefined,
    partyData:IPartyData|undefined,
    navigate: (a:string)=>void, 
    setPartyData:React.Dispatch<React.SetStateAction<IPartyData | undefined>> | undefined
})
{
    if(!socket || !setPartyData || !partyData) return
    
    socket.emit('leaveParty', {partyCode: partyData.partyCode})
    socket.removeAllListeners()
    setPartyData(undefined)
    
    navigate('/home')   
}

export async function deleteParty({socket,userId, partyData, navigate, setPartyData}:{
    socket: Socket|undefined,
    userId: string,
    partyData:IPartyData|undefined,
    navigate: (a:string)=>void, 
    setPartyData:React.Dispatch<React.SetStateAction<IPartyData | undefined>> | undefined
})
{
    if(!socket || !setPartyData || !partyData)return
    
    socket.emit('deleteParty', {
        partyCode: partyData.partyCode,
        userId: userId
    })
    socket.removeAllListeners()
    setPartyData(undefined)
    navigate('/home')   
}