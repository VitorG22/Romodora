import { useContext, useState } from "react"
import PlayerCardInBoard from "./playerCard/playerCard"
import { AppContext } from "../../../AppContext"
import { BoardContext } from "./boardContext"
import { Heart, X } from "lucide-react"
import LeavePartyButton from "../../../components/leavePartyButton"
import BoardMapCanvas from "./canva/BoardMapCanva"
import DinamicSectionSpawn from "./dinamicsections/spawn"
import { DinamicSectionMaps } from "./dinamicsections/sectionMaps"
import { LeftChat } from "./chat/chatComponent"
import { Mob } from "../../maps/classes/mobClasses"
import { BottomSubMenuBar } from "./subMenuBar/subMenuBars"
import { LeftCharacterInfo } from "./charactersInfoSection/characterInfo"



export default function Board() {
    const [selectedSubMenu, setSelectedSubMenu] = useState<'dice' | 'bag' | "spawn" | 'maps'| undefined >('dice')
    const [selectedCharacterInfo, setSelectedCharacterInfo] = useState<any>(undefined)
    const [selectedTileToMove, SetSelectedTileToMove] = useState<Mob| undefined>(undefined)
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
