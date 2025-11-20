import { useContext, useEffect, useState } from "react"
import { GameContext } from "../../../scripts/socket"
import { type IEntity, type IPlayer } from "../gameObject"
import { LogOutIcon, RefreshCcwIcon, UserRoundIcon } from "lucide-react"
import * as Button from '../../../assets/buttons/buttons'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../../redux/store"
import { getData } from "../../../scripts/axios"

export default function GameLobby() {
    const [isModalChangeCharacterOpen, setIsModalChangeCharacterOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const game = useContext(GameContext)

    const startGame = () => {
        game?.startGame()
    }

    const quitGame = () => {
        game?.quitGame()
        navigate("/home")
    }

    return (

        <main className="h-full w-full flex flex-col">
            <h1 className='ml-2 mt-2 font-bold'>Code: <span className='uppercase italic font-normal text-stone-800/60'>{game?.lobbyId}</span></h1>
            <ul className="flex flex-row h-full w-full justify-center items-center gap-2 px-2 overflow-hidden">
                {game?.tableControl.players.map(PlayerData =>
                    <PlayerCard playerData={PlayerData} key={`playerCard_${PlayerData.id}`} setIsModalChangeCharacterOpen={setIsModalChangeCharacterOpen} />
                )}
            </ul>
            <div className="flex flex-row gap-2 place-self-end items-center p-4 min-w-1/4 w-fit">
                {game?.isHost && <Button.Primary color="black" onClick={startGame}>Start</Button.Primary>}
                <Button.Primary color="white" onClick={quitGame} className="flex flex-row justify-center gap-2">
                    <LogOutIcon strokeWidth={1} />
                    Quit
                </Button.Primary>

            </div>
            {isModalChangeCharacterOpen && <ModalChangeCharacter setIsModalChangeCharacterOpen={setIsModalChangeCharacterOpen} />}
        </main>
    )
}

function PlayerCard({ playerData, setIsModalChangeCharacterOpen }: { playerData: IPlayer, setIsModalChangeCharacterOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { userData } = useSelector((state: RootState) => state.user)

    return (
        <section className='flex flex-col w-full max-w-60 '>
            <div className="z-10 flex flex-row gap-2 items-center">
                <span className='flex rounded-full h-3 w-3 aspect-square border-[1px] border-stone-900' style={{ backgroundColor: playerData.color }}> </span>
                <p>{playerData.name}</p>
            </div>
            <div className="flex flex-col w-full max-w-60 min-w-30 aspect-[3/5] relative rounded-sm overflow-hidden">
                {playerData.character ? (
                    <div className='flex h-full w-full absolute z-0 overflow-hidden'>
                        <img src={playerData.character.picture} alt=""
                            className='object-cover'
                        />
                        {playerData.id == userData.id && <RefreshCcwIcon strokeWidth={1} className="z-20 p-1 absolute top-2 right-2 hover:cursor-pointer hover:bg-stone-900/10  rounded-full" onClick={() => setIsModalChangeCharacterOpen(true)} />}
                    </div>
                ) : playerData.id == userData.id ?
                    (
                        <div onClick={() => setIsModalChangeCharacterOpen(true)} className='flex justify-center items-center overflow-hidden h-full w-full absolute z-0 bg-linear-45 from-stone-500/40 via-stone-500/10 to-stone-500/10'>
                            <UserRoundIcon strokeWidth={.5} size={240} className="absolute z-10 blur-[2px] -left-[40%] top-[20%]  opacity-10" />
                            <RefreshCcwIcon strokeWidth={1} size={70} />
                        </div>
                    ) :
                    (
                        <div className='flex justify-center items-center overflow-hidden h-full w-full absolute z-0 bg-linear-45 from-stone-500/40 via-stone-500/10 to-stone-500/10'>
                            <UserRoundIcon strokeWidth={.5} size={240} className="absolute z-10 blur-[2px] -left-[40%] top-[20%]  opacity-10" />
                            <UserRoundIcon strokeWidth={1} size={70} />
                        </div>
                    )
                }
                {playerData.character &&
                    <article className='flex flex-col justify-end absolute z-20 bottom-0 left-0 p-2 text-stone-200 w-full  h-fit bg-linear-to-t from-stone-950 to-stone-950/60'>
                        <p>{playerData.character.level} {playerData.character.name} </p>
                        <p className='italic text-stone-200/80 font-thin'>{playerData.character.class} {playerData.character.subClass != '' && <span>/ {playerData.character.subClass}</span>} </p>
                        <p className='italic text-stone-200/80 font-thin'>{playerData.character.race} {playerData.character.subRace != '' && <span>/ {playerData.character.subRace}</span>}  </p>
                    </article>
                }
            </div>

        </section>
    )
}

function ModalChangeCharacter({ setIsModalChangeCharacterOpen }: { setIsModalChangeCharacterOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [userCharacters, setUserCharacter] = useState<IEntity[]>([])
    const game = useContext(GameContext)
    const { userData } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        getUserCharacters()
    }, [])

    const getUserCharacters = () => {
        getData({
            endPoint: "getUserCharacters",
            onSuccess: (res) => {
                setUserCharacter(res.data)
            },
            onError: (res) => {
                console.log(res)
            }
        })
    }

    const changeUserCharacter = (characterData: IEntity) => {
        if(!game?.socket)return        
        game.socket.emit('changePlayerCharacterData', {gameId:game.lobbyId, newCharacterData: characterData, characterOwnerId: userData.id})
    }

    return (
        <section className='flex justify-center items-center absolute w-full h-full'>
            <div onClick={() => setIsModalChangeCharacterOpen(false)} className='w-screen h-screen absolute top-0 left-0 bg-stone-900/40 z-10' />
            <div className='bg-stone-200 rounded-md p-1 z-20'>
                <ul className="flex flex-col gap-2">
                    {userCharacters.map(characterData =>
                        <li onClick={() => { changeUserCharacter(characterData); setIsModalChangeCharacterOpen(false) }} key={"characterSelectCard_" + characterData.id} className='group flex flex-row gap-2 items-center hover:cursor-pointer hover:bg-purple-500 duration-300 px-2 py-2 pr-8 rounded-sm'>
                            <div className="flex justify-center items-center aspect-square h-18 rounded-xs overflow-hidden">
                                <img src={characterData.picture} className='object-cover' />
                            </div>
                            <article className='flex flex-col'>
                                <p className="font-semibold group-hover:text-stone-200">{characterData.level} {characterData.name} <span className="italic font-normal text-stone-900/80 group-hover:text-stone-200/80">{characterData.race}<span>{characterData.subRace != '' && `/${characterData.subRace}`}</span></span></p>
                                <p className="italic text-stone-900/80 group-hover:text-stone-200/80 ">{characterData.class}<span>{characterData.subClass != '' && `/${characterData.subClass}`}</span></p>
                            </article>
                        </li>
                    )}
                </ul>
            </div>
        </section>
    )
}