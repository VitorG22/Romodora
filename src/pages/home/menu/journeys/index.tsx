import { LogIn, Trash2 } from "lucide-react"
import SquareButton from "../../../../components/buttons"
import hostParty from "../../../connection/host"
import { useContext } from "react"
import { AppContext } from "../../../../AppContext"
import { IPartyData } from "../../../../interfaces"
import { useNavigate } from "react-router-dom"

export interface IJourney {
    name: string,
    id: string,
    banner: string
}

export function JourneyCard({ journeyData }: { journeyData: IJourney }) {
    const navigate = useNavigate()
    const { mainUser, token, socket, setPartyData, partyData } = useContext(AppContext)

    const handleHostParty = () => {
        if (!socket || !setPartyData) return

        hostParty({
            journeyId: journeyData.id,
            mainUser: mainUser,
            socket: socket,
            token: token,
            partyData: partyData,
            callBack: (partyData: IPartyData) => {
                setPartyData(partyData)
                navigate(`/party/lobby/${partyData.partyCode}`)
                socket?.off(`connectionRequest_${partyData.partyCode}`)
                socket?.on(`connectionRequest_${partyData.partyCode}`, (data) => {
                    socket.emit(`connectionRequestAccepted`, {
                        partyData: partyData,
                        userId: data.userId
                    })
                })
            }
        })
    }

    return (
        <section className='flex flex-row items-center justify-between hover:bg-lagun-950/50 pr-4 p-2 rounded-md'>
            <div className='flex flex-row gap-2'>
                <div className='flex justify-center items-center h-12 aspect-square rounded-md overflow-hidden'>
                    <img src={journeyData.banner} />
                </div>
                <article className='mr-8'>
                    <h1 className='text-lagun-500'>{journeyData.name}</h1>
                    <p className='text-lagun-200 text-xs italic'>{journeyData.id}</p>
                </article>
            </div>
            <div className='flex flex-row gap-2'>
                <SquareButton variant="secondary" size="sm"
                    onClickCapture={() => handleHostParty()}>
                    {/* onClick={()=>navigate(`/party/host/${journeyData.id}`)}> */}
                    <LogIn size={15} strokeWidth={1} style={{}} />
                </SquareButton>

                <SquareButton variant="ghost" size="sm">
                    <Trash2 size={15} strokeWidth={1} style={{}} />
                </SquareButton>
            </div>
        </section>

    )
}