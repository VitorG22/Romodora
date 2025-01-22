import { useContext, useEffect, useRef, useState } from "react"
import PlayerCardInBoard from "./playerCard/playerCard"
import { AppContext } from "../../../AppContext"
import { BoardContext } from "./boardContext"
import { ChevronDown, ChevronUp, Heart, Send, X } from "lucide-react"
import LeavePartyButton from "../../../components/leavePartyButton"
import { getMapsFromLocalStorage } from "../../../scripts/localStorage/localStorage"
import BoardMapCanvas from "./canva/BoardMapCanva"
import { IMap } from "../../maps"
import { IPlayerData } from "../../../interfaces"
import DinamicSectionSpawn from "./dinamicsections/spawn"
import { Tile } from "../../maps/classes/tileClasses"



interface IChat {
    message: string,
    ownerData: IPlayerData | undefined,
    type: 'userMessage' | 'sistemMessage'
}


export default function Board() {
    const [selectedSubMenu, setSelectedSubMenu] = useState<'dice' | 'bag' | "spawn" | 'maps'| undefined >('dice')
    const [selectedCharacterInfo, setSelectedCharacterInfo] = useState<any>(undefined)
    const [selectedTileToMove, SetSelectedTileToMove] = useState<Tile| undefined>(undefined)
    const { mainUser, partyData } = useContext(AppContext)

    const isThisUserHost = mainUser.id == partyData?.hostId

    return (
        <BoardContext.Provider value={{
            selectedCharacterInfo: selectedCharacterInfo,
            selectedSubMenu: selectedSubMenu,
            selectedTileToMove: selectedTileToMove,
            setSelectedSubMenu: setSelectedSubMenu,
            setSelectedCharacterInfo: setSelectedCharacterInfo,
            setSelectedTileToMove:SetSelectedTileToMove
        }}>
            <main className='relative grid grid-rows-5 grid-cols-11 text-lagun-200 h-screen w-screen overflow-hidden'>
                {partyData?.mapData?.mapMatrix && <BoardMapCanvas />}
                <LeftChat />
                <RightDinamicSection />
                <LeftCharacterInfo />
                <div className='z-40 flex flex-row justify-end items-end p-4 row-start-5 row-end-6 col-start-9 col-end-12'>
                    <LeavePartyButton />
                </div>
                <BottomSubMenuBar isThisUserHost={isThisUserHost} />

            </main>
        </BoardContext.Provider>
    )
}


function BottomSubMenuBar({ isThisUserHost }: { isThisUserHost: boolean }) {
    const { selectedSubMenu, setSelectedSubMenu } = useContext(BoardContext)

    return (
        <section className='z-[60] flex flex-row justify-center items-center gap-8 row-start-5 row-end-6 col-start-4 col-end-9'>
            <hr className="w-20 h-[2px] rounded-full bg-lagun-500 border-none" />
            <div style={selectedSubMenu == 'bag' ? { "scale": '1.5', 'filter': 'brightness(1.2)' } : { "scale": '1', 'filter': 'brightness(0.5)' }}
                onClick={() => setSelectedSubMenu?.(selectedSubMenu == 'bag'? (undefined):('bag'))}
                className='h-8 overflow-hidden flex w-fit ease duration-300 hover:cursor-pointer'>
                <img className='object-cover' src='/assets/icons/backpack.png' />
            </div>
            <div style={selectedSubMenu == 'dice' ? { "scale": '1.5', 'filter': 'brightness(1.2)' } : { "scale": '1', 'filter': 'brightness(0.5)' }}
                onClick={() => setSelectedSubMenu?.(selectedSubMenu == 'dice'? (undefined):('dice'))}
                className='h-8 overflow-hidden flex w-fit ease duration-300 hover:cursor-pointer'>
                <img className='object-cover' src='/assets/icons/d20.png' />
            </div>

            {isThisUserHost && <>
                <div style={selectedSubMenu == 'spawn' ? { "scale": '1.5', 'filter': 'brightness(1.2)' } : { "scale": '1', 'filter': 'brightness(0.5)' }}
                    onClick={() => setSelectedSubMenu?.(selectedSubMenu == 'spawn'? (undefined):('spawn'))}
                    className='h-8 overflow-hidden flex w-fit ease duration-300 hover:cursor-pointer'>
                    <img className='object-cover' src='/assets/icons/grimoire.png' />
                </div>
                <div style={selectedSubMenu == 'maps' ? { "scale": '1.5', 'filter': 'brightness(1.2)' } : { "scale": '1', 'filter': 'brightness(0.5)' }}
                    onClick={() => setSelectedSubMenu?.(selectedSubMenu == 'maps'? (undefined):('maps'))}
                    className='h-8 overflow-hidden flex w-fit ease duration-300 hover:cursor-pointer'>
                    <img className='object-cover' src='/assets/icons/deceive.png' />
                </div>
            </>}
            <hr className="w-20 h-[2px] rounded-full bg-lagun-500 border-none" />

        </section>
    )
}

function LeftCharacterInfo() {
    const { selectedCharacterInfo, setSelectedCharacterInfo } = useContext(BoardContext)

    return (
        <section className='z-40 w-fit flex flex-row gap-2 row-start-1 row-end-4 col-start-1 col-end-5 p-2'>
            {selectedCharacterInfo &&
                <>

                    <div className='h-full aspect-[3/5] rounded-md overflow-hidden'>
                        <img src={selectedCharacterInfo?.picture}
                            className='object-cover h-full' />
                    </div>
                    <article className='p-2 bg-lagun-950/80 py-2 border-l border-lagun-500 h-fit relative'>
                        <h1 className='text-lagun-200 text-lg'>{selectedCharacterInfo?.name}</h1>
                        <h1 className='thin italic text-lagun-500 text-xs'>{selectedCharacterInfo?.class}</h1>
                        <p className='flex flex-row gap-2 items-center font-thin text-xs'>
                            <Heart size={12} strokeWidth={1} className='text-red-500 fill-red-500' />
                            {selectedCharacterInfo?.health.currentHealth}/{selectedCharacterInfo?.health.maxHealthTotal}
                        </p>
                        {selectedCharacterInfo?.abilityScores &&
                            <ul className='mt-2 flex flex-col gap-1 *:first-letter:uppercase'>
                                <li className='thin text-lagun-500 text-sm italic'>carisma: <span className="text-lagun-200 font-normal">{selectedCharacterInfo.abilityScores.charisma.totalScore}</span></li>
                                <li className='thin text-lagun-500 text-sm italic'>constitution: <span className="text-lagun-200 font-normal">{selectedCharacterInfo.abilityScores.constitution.totalScore}</span></li>
                                <li className='thin text-lagun-500 text-sm italic'>dexterity: <span className="text-lagun-200 font-normal">{selectedCharacterInfo.abilityScores.dexterity.totalScore}</span></li>
                                <li className='thin text-lagun-500 text-sm italic'>intelligence: <span className="text-lagun-200 font-normal">{selectedCharacterInfo.abilityScores.intelligence.totalScore}</span></li>
                                <li className='thin text-lagun-500 text-sm italic'>strength: <span className="text-lagun-200 font-normal">{selectedCharacterInfo.abilityScores.strength.totalScore}</span></li>
                                <li className='thin text-lagun-500 text-sm italic'>wisdom: <span className="text-lagun-200 font-normal">{selectedCharacterInfo.abilityScores.wisdom.totalScore}</span></li>
                            </ul>
                        }
                        <button className="absolute top-1 right-1 text-lagun-200 hover:bg-lagun-200/40 rounded-sm"
                        onClick={()=> setSelectedCharacterInfo?.(undefined)}
                        ><X size={15} strokeWidth={1}/></button>
                    </article>
                </>
            }
        </section>

    )
}

function LeftChat() {
    const { socket, partyData } = useContext(AppContext)
    const chatInputRef = useRef<HTMLInputElement | null>(null)
    const chatTextBoxRef = useRef<HTMLDivElement | null>(null)
    const [chatData, setChatData] = useState<IChat[]>([])
    const [ischatOpen, setIschatOpen] = useState<boolean>(true)

    socket?.off(`chatMessage_${partyData?.partyCode}`)
    socket?.on(`chatMessage_${partyData?.partyCode}`, body => {

        let newChatData = [...chatData]
        switch (body.type) {
            case 'sistemMessage':
                newChatData.push({
                    message: body.message,
                    type: "sistemMessage",
                    ownerData: undefined
                })
                break

            case 'userMessage':
                newChatData.push({
                    message: body.message,
                    type: 'userMessage',
                    ownerData: partyData?.players.find(playerData => playerData.id == body.ownerId)
                })
                break
        }
        setChatData(newChatData)
    })
    useEffect(() => {
        chatTextBoxRef?.current?.scrollTo({ top: chatTextBoxRef?.current.scrollHeight })
    }, [chatData, ischatOpen])



    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!chatInputRef.current) return
        let message = chatInputRef.current.value.trim()

        if (message == '') return
        socket?.emit('chatMessage', {
            partyCode: partyData?.partyCode,
            message: message
        })

        chatInputRef.current.value = ''
    }

    return (
        <section
        className='max-h-full self-end z-40 bg-lagun-950/80 m-2 flex flex-col gap-2 justify-end border border-lagun-500 p-2 rounded-md row-start-4 row-end-6 col-start-1 col-end-4 overflow-hidden'>
            <div ref={chatTextBoxRef} 
            style={{ height: ischatOpen ? ('100%') : ('21px')}}
            className="flex flex-row h-full w-full overflow-scroll hiddenScroll relative">

                <ul className='flex flex-col h-full w-full  justify-end'>
                    {chatData.map(messagedata =>
                        messagedata.type == "sistemMessage" ? (
                            <li className="flex justify-center italic text-sm text-cyan-400 bg-cyan-500/10 py-[2px]">
                                {messagedata.message}
                            </li>
                        ) : (
                            <li className='flex flex-row gap-2 items-center'>
                                <h1 className='text-lagun-500 italic text-sm'>{messagedata.ownerData?.name} ({messagedata.ownerData?.characterData?.name || 'Master'}) :
                                    <span className='text-lagun-200 not-italic'> {messagedata.message}</span>
                                </h1>
                            </li>
                        )
                    )
                    }
                </ul >
                <button onClick={() => setIschatOpen(!ischatOpen)}
                    className="text-lagun-200 p-[3px] hover:bg-lagun-200/20 sticky top-0 right-0 w-fit h-fit rounded-sm "
                >
                    {ischatOpen ? (<ChevronDown size={15} strokeWidth={1} />) : (<ChevronUp size={15} strokeWidth={1} />)}
                </button>
            </div>
            <form onSubmit={(e) => handleSendMessage(e)} className='flex flex-row h-8 items-center w-full gap-2'>
                <input ref={chatInputRef} type="text"
                    className="w-full h-full p-2 bg-transparent border border-lagun-500 rounded-md"
                />
                <button type="submit" className='aspect-square flex justify-center items-center h-full bg-lagun-500 rounded-md text-lagun-950'>
                    <Send size={15} strokeWidth={1} />
                </button>
            </form>
        </section >
    )
}

function RightDinamicSection() {
    const { selectedSubMenu } = useContext(BoardContext)

    switch (selectedSubMenu) {
        case "bag":
            return <DinamicSectionBag />
        case "spawn":
            return <DinamicSectionSpawn />
        case "maps":
            return <DinamicSectionMaps />
        case "dice":
            return <DinamicSectionDefault />
    }
}

function DinamicSectionBag() {
    return (
        <section className='z-40 bg-lagun-950/80 row-start-1 row-end-5 col-start-7 col-end-12'>
            bag
        </section>
    )
}

function DinamicSectionMaps() {
    const myMaps = getMapsFromLocalStorage()
    const { socket, partyData } = useContext(AppContext)
    console.log(myMaps)

    const handleSetMapMatrix = (element: IMap) => {
        socket?.emit('setMapMatrix', {
            partyCode: partyData?.partyCode,
            newMapData: {
                mapMatrix: element.mapMatrix,
                mapName: element.name,
                mapId: element.id
            }
        })
    }


    return (
        <section className='justify-self-end z-40 w-fit flex flex-col items-end gap-4 py-4 row-start-1 row-end-5 col-start-7 col-end-12  rounded-bl-lg border-b border-l border-lagun-500/40  bg-lagun-950/50 backdrop-blur-[3px]'>
            <h1 className='text-lg font-semibold text-lagun-500 mr-4'>Selecionar novo Mapa</h1>
            <ul className='flex flex-col items-end w-fit'>
                {myMaps?.map(element =>
                    <li
                        onClick={() => handleSetMapMatrix(element)}
                        className='flex flex-row justify-end min-w-60 w-fit gap-2 hover:bg-lagun-200/10 p-2 pr-4 '>
                        <article className='text-end'>
                            <h1 className='text-lagun-200 text-lg font-normal'>{element.name}</h1>
                            <p className='text-lagun-500 italic font-thin text-xs'>{element.sizeX}x{element.sizeY}</p>
                        </article>
                        <div className='aspect-square h-16 rounded-md overflow-hidden'>
                            <img src={element.picture} className='object-cover' />
                        </div>
                    </li>
                )}
            </ul>
        </section>
    )
}


function DinamicSectionDefault() {
    const { partyData } = useContext(AppContext)

    return (
        <section className='z-40 row-start-1 row-end-5 col-start-10 col-end-12 flex flex-col gap-4 items-end py-2 px-4'>
            {partyData?.players.map((playerData) =>
                <PlayerCardInBoard playerData={playerData} />
            )}
        </section>
    )
}
