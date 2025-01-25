import { useContext, useState } from "react"
import PlayerCardInBoard from "./playerCard/playerCard"
import { AppContext } from "../../../AppContext"
import { BoardContext } from "./boardContext"
import { Heart, X } from "lucide-react"
import LeavePartyButton from "../../../components/leavePartyButton"
import BoardMapCanvas from "./canva/BoardMapCanva"
import DinamicSectionSpawn from "./dinamicsections/spawn"
import { Tile } from "../../maps/classes/tileClasses"
import { BottomSubMenuBar } from "./subMenuBar/subMenuBars"
import { DinamicSectionMaps } from "./dinamicsections/sectionMaps"
import { LeftChat } from "./chat/chatComponent"



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
                    <article className='p-2 bg-romo-500 py-2 border-l border-romo-200 h-fit relative'>
                        <h1 className='text-romo-100 text-lg'>{selectedCharacterInfo?.name}</h1>
                        <h1 className='thin italic text-romo-200 text-xs'>{selectedCharacterInfo?.class}</h1>
                        <p className='flex flex-row gap-2 items-center font-thin text-xs'>
                            <Heart size={12} strokeWidth={1} className='text-red-500 fill-red-500' />
                            {selectedCharacterInfo?.health.currentHealth}/{selectedCharacterInfo?.health.maxHealthTotal}
                        </p>
                        {selectedCharacterInfo?.abilityScores &&
                            <ul className='mt-2 flex flex-col gap-1 *:first-letter:uppercase'>
                                <li className='thin text-romo-100 text-sm italic'>carisma: <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores.charisma.totalScore}</span></li>
                                <li className='thin text-romo-100 text-sm italic'>constitution: <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores.constitution.totalScore}</span></li>
                                <li className='thin text-romo-100 text-sm italic'>dexterity: <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores.dexterity.totalScore}</span></li>
                                <li className='thin text-romo-100 text-sm italic'>intelligence: <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores.intelligence.totalScore}</span></li>
                                <li className='thin text-romo-100 text-sm italic'>strength: <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores.strength.totalScore}</span></li>
                                <li className='thin text-romo-100 text-sm italic'>wisdom: <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores.wisdom.totalScore}</span></li>
                            </ul>
                        }
                        <button className="absolute top-1 right-1 text-romo-100 hover:bg-romo-200/20"
                        onClick={()=> setSelectedCharacterInfo?.(undefined)}
                        ><X size={15} strokeWidth={1}/></button>
                    </article>
                </>
            }
        </section>

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
        case undefined:
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
