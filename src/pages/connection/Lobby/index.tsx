import { useContext } from "react"
import { AppContext } from "../../../AppContext"
import LeavePartyButton from "../../../components/leavePartyButton"
import { PlayerCard } from "./playerCard"
import SquareButton from "../../../components/buttons"

export default function Lobby() {
    const { partyData, socket, token, mainUser } = useContext(AppContext)
    const isThisUserHost = partyData?.hostId == mainUser.id 
    
    
    const handleStartGame = () =>{
    socket?.emit('partyStart', {
        partyCode: partyData?.partyCode,
        token: token
    })
    }



    return (
        <main className='gap-2 flex flex-col p-4 h-screen justify-between'>
            <section className='flex flex-row gap-2'>
                <div className='h-12 aspect-square rounded-md flex justify-center items-center overflow-hidden'>
                    <img src={partyData?.journeyData.banner} className='object-cover' />
                </div>
                <article>
                    <h1 className='text-romo-100 font-semibold'>{partyData?.journeyData.name}</h1>
                    <p className='text-romo-200 text-xs font-thin italic'>{partyData?.partyCode}</p>
                </article>
            </section>
            <div className='flex flex-row h-2/3 w-fit place-self-center gap-2'>
                {partyData?.players.map(playerData => <PlayerCard playerData={playerData} />)}
            </div>
            <div className='flex flex-row gap-2'>
            <LeavePartyButton />
            {isThisUserHost && 
            <SquareButton onClick={handleStartGame} type="button" size="lg" variant="secondary">
                Jogar
            </SquareButton>
            }
            </div>
        </main>
    )
}
