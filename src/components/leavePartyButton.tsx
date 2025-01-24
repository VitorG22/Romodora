import { useContext } from "react"
import { AppContext } from "../AppContext"
import { useNavigate } from "react-router-dom"
import { deleteParty, leaveParty } from "../pages/connection/socket/socket"
import SquareButton from "./buttons"
import { LogOut } from "lucide-react"

export default function LeavePartyButton() {
    const { mainUser, partyData, socket, setPartyData } = useContext(AppContext)
    const navigate = useNavigate()

    const handleClickLeaveParty = () => {
        leaveParty({
            navigate: navigate,
            partyData: partyData,
            setPartyData: setPartyData,
            socket: socket
        })
    }
    const handleClickDeleteParty = () => {
        deleteParty({
            navigate: navigate,
            partyData: partyData,
            setPartyData: setPartyData,
            socket: socket,
            userId: mainUser.id
        })
    }

    const isThisUserPartyHost = partyData?.hostId == mainUser.id

    return (
        isThisUserPartyHost ? (
            <SquareButton size="lg" variant="default" onClick={handleClickDeleteParty}>
                Sair
                <LogOut size={15} strokeWidth={1} />
            </SquareButton>) : (
            <SquareButton size="lg" variant="default"  onClick={handleClickLeaveParty}>
                Sair
                <LogOut size={15} strokeWidth={1} />
            </SquareButton>)

    )
}