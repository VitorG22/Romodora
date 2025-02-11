import { useContext, useEffect, useState } from "react"
import PlayerCardInBoard from "./playerCard/playerCard"
import { AppContext } from "../../../AppContext"
import { BoardContext } from "./boardContext"
import LeavePartyButton from "../../../components/leavePartyButton"
import BoardMapCanvas from "./canva/BoardMapCanva"
import DinamicSectionSpawn from "./dinamicsections/spawn"
import { DinamicSectionMaps } from "./dinamicsections/sectionMaps"
import { LeftChat } from "./chat/chatComponent"
import { Mob } from "../../maps/classes/mobClasses"
import { BottomSubMenuBar } from "./subMenuBar/subMenuBars"
import { LeftCharacterInfo } from "./charactersInfoSection/characterInfo"
import { GetData } from "../../../scripts/api/getData"



export default function Board() {
    const [selectedSubMenu, setSelectedSubMenu] = useState<'dice' | 'bag' | "spawn" | 'maps' | undefined>('dice')
    const [selectedCharacterInfo, setSelectedCharacterInfo] = useState<any>(undefined)
    const [selectedTileToMove, SetSelectedTileToMove] = useState<Mob | undefined>(undefined)
    const { mainUser, partyData, socket, setPartyData } = useContext(AppContext)
    const { setSelectedTileToMove } = useContext(BoardContext)
    const [stickersList, setStickersList] = useState<string[]>([])

    const isThisUserHost = mainUser.id == partyData?.hostId
    useEffect(() => {

        (async () => {
            const StickersResult = await GetData({
                route: '/getStickers',
            })
            if (StickersResult.data.status == 'success' && setStickersList) {
                setStickersList(StickersResult.data.result)
            }
        })()

    }, [])


    useEffect(() => {

        socket?.off(`mobAction_${partyData?.partyCode}`)
        socket?.on(`mobAction_${partyData?.partyCode}`, body => mobAction(body))

    }, [partyData])

    function mobAction(body: { mobId: string, mobOwnerId: string, functionName: 'rotateRight' | 'rotateLeft' | 'teste' | 'tradeStatus' | 'selectThisTile' | 'moveTo', additionalData: any }){
        if (!partyData) return

        let mobOwnerIndex = partyData.players.findIndex(playerData => playerData.id == body.mobOwnerId)
        if (!mobOwnerIndex) return

        let selectedMob = partyData.players[mobOwnerIndex].characterData
        if (!selectedMob) return

        let newPlayersData = [...partyData.players]

        console.log(body.functionName)
        let { newTile } = selectedMob[body.functionName](body.additionalData)
        newPlayersData[mobOwnerIndex].characterData = newTile

        setPartyData?.({
            ...partyData,
            players: newPlayersData
        })
        setSelectedTileToMove?.(undefined)
    }

    return (
        <BoardContext.Provider value={{
            stickersList: stickersList,
            selectedCharacterInfo: selectedCharacterInfo,
            selectedSubMenu: selectedSubMenu,
            selectedTileToMove: selectedTileToMove,
            setSelectedSubMenu: setSelectedSubMenu,
            setSelectedCharacterInfo: setSelectedCharacterInfo,
            setSelectedTileToMove: SetSelectedTileToMove
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
