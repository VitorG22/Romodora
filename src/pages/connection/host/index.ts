import { initParty } from "../socket/socket"
import { IMainUser, IPartyData } from "../../../interfaces"
import { Socket } from "socket.io-client"

export default function hostParty({ journeyId, token, socket, mainUser,callBack }: {
    journeyId: string,
    token: string,
    socket: Socket,
    mainUser: IMainUser,
    partyData: IPartyData | undefined
    callBack: (a:any)=>void
}) {

    if (!journeyId || !socket) return
    initParty({
        socket: socket,
        journeyId: journeyId,
        token: token
    })

    socket?.off(`hostParty_${mainUser.id}`)
    socket?.on(`hostParty_${mainUser.id}`, (body) => {
        callBack(body)
    })

}