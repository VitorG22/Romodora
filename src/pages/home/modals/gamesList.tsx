import { Loader, LoaderContainer } from '../../../assets/loader/loader'
import { useContext, useEffect, useState } from "react"
import { GameContext } from "../../../scripts/socket"
import { LockKeyhole, User2} from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Game, IPerson } from '../../game/gameObject'
import { TableControl, type IPlayer } from '../../game/table/TableControlerClass'
import { Character } from '../../game/table/entitysClasses'
import ModalBase from '../../../assets/modal/ModalBase'

interface IGameInList {
    id: string
    name: string,
    password: boolean,
    game_host: IPerson
}

export default function GamesListModal({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
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

            <ModalBase setIsModalOpen={setIsModalOpen} modalTitle='Games' >
                {GamesList.length > 0 ? (
                    <section className='max-h-90 overflow-y-scroll showScroll overflow-x-hidden pr-2'>
                        <ul className="flex flex-col">
                            {GamesList.map(gameData => <GameCard gameData={gameData} />)}
                        </ul>
                    </section>
                ) : (
                    <h4 className='arimo px-18 py-12'>No Games Found</h4>
                )
                }
            </ModalBase>
        </main>
    )
}

function GameCard({ gameData }: { gameData: IGameInList }) {
    const game = useContext(GameContext)
    const navigate = useNavigate()

    const joinInGame = () => {
        game?.socket?.emit("joinInGame", { gameId: gameData.id }, (res: { status: 200, gameData: Game }) => {
            if (res.status != 200) return
            game.isHost = false
            game.lobbyId = gameData.id
            game.users = res.gameData.users
            game.tableControl = new TableControl({
                ...game.tableControl, ...res.gameData.tableControl,
                players: res.gameData.tableControl.players.map((playerData: IPlayer) => {
                    let playerObject = { ...playerData }
                    if (playerData.character) {
                        playerObject.character = new Character(playerData.character)
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
        <li onClick={() => joinInGame()} className='hover:cursor-pointer flex flex-row items-center gap-10 py-4 px-4  hover:bg-stone-400/40'>
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
