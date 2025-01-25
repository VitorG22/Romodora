import { LogIn, Trash2 } from "lucide-react"
import SquareButton from "../../../../components/buttons"
import hostParty from "../../../connection/host"
import { useContext } from "react"
import { AppContext } from "../../../../AppContext"
import { IPartyData } from "../../../../interfaces"
import { useNavigate } from "react-router-dom"
import { PostData } from "../../../../scripts/api/postData"

export interface IJourney {
    name: string,
    id: string,
    banner: string
}

export function JourneyCard({ journeyData, setJourneyList  }: { journeyData: IJourney, setJourneyList:React.Dispatch<React.SetStateAction<IJourney[]>> }) {
    const navigate = useNavigate()
    const { mainUser, token, socket, setPartyData, partyData} = useContext(AppContext)

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

    const deleteJourney = async(journeyData:IJourney)=>{
        console.log('teste')
        let res = await PostData({
            data:{
                journey_id: journeyData.id,
                token: token
            },
            route: '/deleteJourney'
        })

        if(res.data.status == 'success'){
            setJourneyList(res.data.result)
        }
        
    }

    return (
        <section className='flex flex-row items-center justify-between border-b border-transparent  hover:border-romo-100 pr-4 p-2'>
            <div className='flex flex-row gap-2'>
                <div className='flex justify-center items-center h-12 aspect-square overflow-hidden'>
                    <img src={journeyData.banner} />
                </div>
                <article className='mr-8'>
                    <h1 className='text-romo-100'>{journeyData.name}</h1>
                    <p className='text-romo-200 text-xs italic'>{journeyData.id}</p>
                </article>
            </div>
            <div className='flex flex-row gap-2'>
                <SquareButton variant="secondary" size="sm"
                    onClickCapture={() => handleHostParty()}>
                    {/* onClick={()=>navigate(`/party/host/${journeyData.id}`)}> */}
                    <LogIn size={15} strokeWidth={1} />
                </SquareButton>

                <SquareButton variant="default" size="sm" 
                onClick={()=>deleteJourney(journeyData)}>
                    <Trash2 size={15} strokeWidth={1} />
                </SquareButton>
            </div>
        </section>

    )
}