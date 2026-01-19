import { Loader, LoaderContainer } from '../../../assets/loader/loader'
import { useContext, useEffect, useState } from "react"
import { GameContext } from "../../../scripts/socket"
import { LockKeyhole, UnlockKeyhole, User2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Game, IGame, IPerson } from '../../game/gameObject'
import { TableControl, type IPlayer } from '../../game/table/TableControlerClass'
import { Character } from '../../game/table/entitysClasses'
import ModalBase from '../../../assets/modal/ModalBase'
import * as Input from '../../../assets/inputs/inputs'
import * as Buttons from '../../../assets/buttons/buttons'
import getFormValues from '../../../assets/forms/getFormValues'
interface IGameInList {
    id: string
    name: string,
    password: boolean,
    game_host: IPerson
    hasPassword: boolean
    onFriends: boolean
}


function joinInGame({ game, gameData, password, callBack }: { game: IGame | null, gameData: IGameInList, callBack: () => void, password?: string }) {
    game?.socket?.emit("joinInGame", { gameId: gameData.id, password: password }, (res: { status: 200, gameData: Game }) => {
        if (res.status != 200) return
        game.isHost = false
        game.lobbyId = gameData.id
        game.users = res.gameData.users
        game.tableControl = new TableControl({
            ...game.tableControl, ...res.gameData.tableControl,
            players: res.gameData.tableControl.players.map((playerData: IPlayer) => {
                if (playerData.character) {
                    playerData.character = new Character({
                        ...playerData.character,
                        emitSocket({ event, data }: { event: string, data: any }) {
                            data.gameId = gameData.id
                            data.characterOwnerId = playerData.id
                            data.entityId = playerData.character!.id
                            game.socket?.emit(event, data)
                        }
                    })
                }

                return playerData
            })
        })
        game.activeSocketListeners()
        game.setGame()
        callBack()

    })
}

export default function GamesListModal({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const game = useContext(GameContext)
    const [GamesList, setGamesList] = useState<IGameInList[]>([])
    const [isLoadingList, setIsLoadingList] = useState<boolean>(false)
    const [PasswordModalData, setPasswordModalData] = useState<IGameInList | null>(null)
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        getGames()
    }, [])

    useEffect(() => {
        if (!isPasswordModalOpen) {
            setPasswordModalData(null)
        }
    }, [isPasswordModalOpen])

    useEffect(() => {
        if (PasswordModalData != null) {
            setIsPasswordModalOpen(true)
        }
    }, [PasswordModalData])

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

            {isPasswordModalOpen && PasswordModalData ?
                <ModalBase setIsModalOpen={setIsPasswordModalOpen} modalTitle={`Join ${PasswordModalData.name}`}>
                    <form onSubmitCapture={(e) => {
                        let { password } = getFormValues(e)
                        joinInGame({ game: game, gameData: PasswordModalData, password: password as string, callBack: () => navigate('/game/lobby') })

                    }}>
                        <Input.Container color='black'>
                            <Input.Label inputId='gamePassword'>Password</Input.Label>
                            <Input.PasswordInput id='gamePassword' name='password' required />
                        </Input.Container>
                        <div className='flex flex-row gap-2 w-full mt-2'>
                            <Buttons.Primary onClick={() => setIsPasswordModalOpen(false)} color="black">Cancel</Buttons.Primary>
                            <Buttons.Secondary type='submit' color="black">Join</Buttons.Secondary>
                        </div>
                    </form>
                </ModalBase>
                :
                <ModalBase setIsModalOpen={setIsModalOpen} modalTitle='Games' >
                    {GamesList.length > 0 ? (
                        <>
                            <article className='grid grid-cols-[1fr_2fr_2fr_10px] gap-10 pt-4  px-4 mr-[4px] w-full *:justify-self-start text-stone-800'>
                                <h2 className='league-spartan'>Code</h2>
                                <h2 className='league-spartan'>Name</h2>
                                <h2 className='league-spartan'>Host</h2>
                            </article>
                            <section className='max-h-90 overflow-y-scroll showScroll overflow-x-hidden'>
                                <ul className="flex flex-col w-full">
                                    {GamesList.map(gameData => <GameCard gameData={gameData} setPasswordModalData={setPasswordModalData} />)}
                                </ul>
                            </section>
                        </>
                    ) : (
                        <h4 className='arimo px-18 py-12'>No Games Found</h4>
                    )
                    }
                </ModalBase>
            }
        </main>
    )
}

function GameCard({ gameData, setPasswordModalData }: { gameData: IGameInList, setPasswordModalData: React.Dispatch<React.SetStateAction<IGameInList | null>> }) {
    const game = useContext(GameContext)
    const navigate = useNavigate()

    return (
        <li onClick={() => {
            if (gameData.hasPassword) {
                setPasswordModalData(gameData)
            }
            else { joinInGame({ game: game, gameData: gameData, callBack: () => navigate('/game/lobby') }) }
        }}
            className='w-full  hover:cursor-pointer grid grid-cols-[1fr_2fr_2fr_10px] items-center gap-10 py-4 px-4  hover:bg-stone-400/40 arimo'>
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

            {gameData.hasPassword ?
                <LockKeyhole className='justify-self-center' strokeWidth={1} />
                : <UnlockKeyhole className='justify-self-center' strokeWidth={1} />}
        </li>)
}
