import { Loader, LoaderContainer } from '../../assets/loader/loader'
import { useContext, useEffect, useState } from "react"
import { GameContext } from "../../scripts/socket"
import { LockKeyhole, User2, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Game, IPerson } from './gameObject'
import { Entity, TableControl, type IPlayer } from './table/TableControlerClass'

interface IGameInList {
    id: string
    name: string,
    password: boolean,
    game_host: IPerson
}

export default function GamesListDefault({ setIsGamesListOpen }: { setIsGamesListOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const game = useContext(GameContext)
    const [GamesList, setGamesList] = useState<IGameInList[]>([])
    const [isLoadingList, setIsLoadingList] = useState<boolean>(false)


    useEffect(() => {
        getGames()
    }, [])

    const getGames = () => {
        setIsLoadingList(true)
        game?.socket?.emit('getActiveGames', (res: { status: number, activeGamesList: IGameInList[] | null }) => {
            console.log(res)
            if (res.status != 200 || res.activeGamesList == null) {
                setIsLoadingList(false)
                return
            }
            setGamesList(res.activeGamesList)
            setIsLoadingList(false)
        })
    }



    return (
        <main className="flex justify-center items-center absolute top-0 left-0 w-full h-full z-30">
            {isLoadingList &&
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            }
            <div className="absolute top-0 left-0 h-full w-full bg-stone-500/40 backdrop-blur-[1px] z-10"></div>
            <section className='z-20 bg-stone-200 px-4 py-4 max-h-3/4'>
                <X strokeWidth={1} className="justify-self-end mb-2 hover:bg-purple-500 hover:text-white duration-150 hover:cursor-pointer" onClick={() => setIsGamesListOpen(false)} />
                <ul className="flex flex-col gap-2 overflow-y-scroll ">
                    {GamesList.map(gameData => <GameCard gameData={gameData} />)}
                </ul>
            </section>
        </main>
    )
}

function GameCard({ gameData }: { gameData: IGameInList }) {
    const game = useContext(GameContext)
    const navigate = useNavigate()

    const joinInGame = () => {
        game?.socket?.emit("joinInGame", { gameId: gameData.id }, (res: { status: 200, gameData:Game  }) => {
            if (res.status != 200) return
            game.isHost = false
            game.lobbyId = gameData.id,
            game.users = res.gameData.users
            game.tableControl = new TableControl({...game.tableControl ,...res.gameData.tableControl, 
                players: res.gameData.tableControl.players.map((playerData: IPlayer) => {
                    let playerObject= {...playerData}
                    if(playerData.character){
                        playerObject.character = new Entity(playerData.character)
                    }
                    return playerObject
                })
            })
            game.activeSocketListeners()
            game.setGame()
            navigate('/game/lobby')

        })
    }

    return (
        <li onClick={() => joinInGame()} className='hover:cursor-pointer flex flex-row items-center gap-10 py-4 px-4  bg-linear-45 duration-150
                        from-stone-500/40 via-stone-500/10 to-stone-500/10
                        hover:from-purple-700 hover:via-purple-600/50 hover:to-purple-500/50 hover:ring-purple-500 hover:text-white hover:ring 
                        hover:translate-x-1
                        '>
            <p>{gameData.id}</p>
            <p>{gameData.name}</p>
            <div className='flex flex-row items-center gap-2'>
                <p>{gameData.game_host.name}</p>
                {gameData.game_host.picture ? (
                    <img src={gameData.game_host.picture} className="aspect-square w-8 object-cover" />
                ) : (
                    <div className=" flex justify-center items-center text-md aspect-square w-8 object-cover">
                        <User2 strokeWidth={1} />
                    </div>
                )}
            </div>
            {gameData.password && <LockKeyhole strokeWidth={1} />}
        </li>)
}
