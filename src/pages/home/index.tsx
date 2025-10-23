import NavBarTop from "../../assets/navBar/navBarTop";
import * as Button from '../../assets/buttons/buttons'
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { type Socket } from "socket.io-client";
import { GameContext } from "../../scripts/socket";
import type { IGame } from "../game/gameObject";
import { CrownIcon, GlobeIcon, KeyRoundIcon, LogInIcon, MapIcon, UserRoundIcon } from "lucide-react";
import GamesListDefault from "../game/gamesList";
import { Loader, LoaderContainer } from "../../assets/loader/loader";

export const socketContext = createContext<null | Socket>(null)

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const game = useContext(GameContext)
    const [isGamesListOpen, setIsGamesListOpen] = useState<boolean>(false)


    const hostGame = () => {
        setIsLoading(true)
        game?.socket?.emit('createGame', { name: "teste_123" },
            ({ status, gameData }: { status: number, gameData: IGame }) => {
                setIsLoading(false)
                console.log({ status, gameData })
                if (status != 200) {
                    return
                }
                game.isHost = true
                game.lobbyId = gameData.lobbyId
                game.users = gameData.users
                game.tableData = gameData.tableData
                game.activeSocketListeners()

                navigate('/game/lobby')

            }

        )
    }

    return (
        <main className='w-full h-full flex flex-col'>
            {isLoading &&
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            }
            <NavBarTop />
            <section className='py-10 flex flex-row *:place-self-center gap-2 h-full w-fit place-self-center'>
                <div className='flex flex-col gap-2 h-full'>
                    <Button.BigSquareButton className="justify-self-start" onClickCapture={() => hostGame()} color='white'>
                        <CrownIcon strokeWidth={.5} size={240} className="absolute z-10 blur-[2px] -left-[40%] top-[20%]  opacity-10" />
                        <CrownIcon strokeWidth={1} size={70} />
                        <p>Host a game</p>
                    </Button.BigSquareButton>
                    <Button.BigSquareButton onClickCapture={() => setIsGamesListOpen(true)} color='white'>
                        <LogInIcon strokeWidth={.5} size={240} className="absolute z-10 blur-[2px] -left-[40%] top-[20%]  opacity-10" />
                        <LogInIcon strokeWidth={1} size={70} />
                        <p>Join a game</p>
                    </Button.BigSquareButton>
                </div>
                <Button.BigSquareButton color='white' onClick={()=>navigate('/characters/list')}>
                    <UserRoundIcon strokeWidth={.5} size={240} className="absolute z-10 blur-[2px] -left-[40%] top-[20%]  opacity-10" />
                    <UserRoundIcon strokeWidth={1} size={70} />
                    <p>Characters</p>
                </Button.BigSquareButton>
                <Button.BigSquareButton color='white' onClick={()=>navigate('/maps')}>
                    <MapIcon strokeWidth={.5} size={240} className="absolute z-10 blur-[2px] -left-[40%] top-[20%]  opacity-10" />
                    <MapIcon strokeWidth={1} size={70} />
                    <p>Maps</p>
                </Button.BigSquareButton>
                <Button.BigSquareButton color='white'>
                    <KeyRoundIcon strokeWidth={.5} size={240} className="absolute z-10 blur-[2px] -left-[40%] top-[20%]  opacity-10" />
                    <KeyRoundIcon strokeWidth={1} size={70} />
                    <p>Items</p>
                </Button.BigSquareButton>
                <Button.BigSquareButton color='white'>
                    <GlobeIcon strokeWidth={.5} size={240} className="absolute z-10 blur-[2px] -left-[40%] top-[20%]  opacity-10" />
                    <GlobeIcon strokeWidth={1} size={70} />
                    <p>Community</p>
                </Button.BigSquareButton>
            </section>
            {isGamesListOpen && <GamesListDefault setIsGamesListOpen={setIsGamesListOpen} />}
        </main>
    )
}

