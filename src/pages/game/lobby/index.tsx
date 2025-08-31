import { useContext } from "react"
import { GameContext } from "../../../scripts/socket"
import type { IPerson } from "../gameObject"
import { LogOutIcon, UserRoundIcon } from "lucide-react"
import * as Button from '../../../assets/buttons/buttons'
import { useNavigate } from "react-router-dom"

export default function GameLobby() {
    const navigate = useNavigate()
    const game = useContext(GameContext)
    
    const startGame = ()=>{

    }

    const quitGame = ()=>{
        game?.quitGame()
        navigate("/home")        
    }

    return (

        <main className="border border-red-500 h-full w-full flex flex-col">
            <h1>Code: {game?.lobbyId}</h1>
            <ul className="flex flex-row h-full w-full justify-center items-center gap-2 px-2 overflow-hidden">
                {game?.users.map(PlayerData =>
                        <PlayerCard playerData={PlayerData} key={`playerCard_${PlayerData.id}`}/>
                )}
            </ul>
            <div className="flex flex-row gap-2 place-self-end items-center p-4 min-w-1/4 w-fit">
                {/* <Button.Primary color="black" onClick={functionTeste}>teste</Button.Primary> */}
                {game?.isHost && <Button.Primary color="black" onClick={startGame}>Start</Button.Primary>}
                <Button.Primary color="white" onClick={quitGame} className="flex flex-row justify-center gap-2">
                    <LogOutIcon strokeWidth={1} />
                    Quit
                </Button.Primary>

            </div>
        </main>
    )
}

function PlayerCard({ playerData }: { playerData: IPerson }) {
    return (
        <div className="flex flex-col w-full max-w-60 min-w-30 aspect-[3/5] border border-green-500 relative">
            <h2 className="z-10">{playerData.name}</h2>
            {playerData.picture ? (
                <div className='h-full w-full absolute z-0 overflow-hidden'>
                    <img src={playerData.picture} alt=""
                        className='object-cover'
                    />
                </div>
            ) : (
                <div className='flex justify-center items-center overflow-hidden h-full w-full absolute z-0 bg-linear-45 from-stone-500/40 via-stone-500/10 to-stone-500/10'>
                    <UserRoundIcon strokeWidth={.5} size={240} className="absolute z-10 blur-[2px] -left-[40%] top-[20%]  opacity-10" />
                    <UserRoundIcon strokeWidth={1} size={70} />
                </div>
            )
            }
        </div>
    )
}