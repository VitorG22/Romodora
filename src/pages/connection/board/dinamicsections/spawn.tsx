import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "../../../../AppContext"
import { BoardContext } from "../boardContext"
import { Mob } from "../../../../classes/mobClasses"

export default function DinamicSectionSpawn() {
    const { partyData } = useContext(AppContext)
    const [detailedCardData, setDetailedCardData] = useState<Mob| undefined>(undefined)

    return (
        <section className='flex gap-2 justify-end w-fit z-40 row-start-1 row-end-5 col-start-7 col-end-12 justify-self-end'>
            {detailedCardData && <DetailedSpawnCard mobData={detailedCardData}/>}
            <ul className='pb-72 overflow-y-scroll hiddenScroll rounded-bl-lg border-b border-l border-romo-400 h-full bg-romo-500/90 backdrop-blur-[3px]'>
                {partyData?.players.map(playerData =>
                    playerData.permissionType == 'player' && playerData.characterData != undefined &&
                    <li>
                        <SpawnCard mobData={playerData.characterData} setDetailedCardData={setDetailedCardData}/>
                    </li>

                )}
            </ul>
        </section>
    )
}

function SpawnCard({ mobData,setDetailedCardData }: { mobData: Mob,setDetailedCardData: React.Dispatch<React.SetStateAction< Mob | undefined>>}) {
    // const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false)
    const {setSelectedTileToMove, selectedTileToMove} = useContext(BoardContext)
    const cardRef = useRef<HTMLElement | null>(null)
    const pictureRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        if (!cardRef.current) return
        cardRef.current.addEventListener('mouseenter', () => setDetailedCardData(mobData))
        cardRef.current.addEventListener('mouseleave', () => setDetailedCardData(undefined))
    }, [cardRef])

    const setTileToMove = ()=>{
        setSelectedTileToMove?.(mobData)
    }
    
    return (
        <section ref={cardRef} draggable='true' onClick={setTileToMove}
        style={{backgroundColor: selectedTileToMove?.id == mobData.id ? "#222526": "transparent"}}
        className='hover:bg-romo-950 hover:cursor-pointer flex flex-row gap-2 justify-end h-12 w-60 p-1 '>
            <article className='flex flex-col justify-start h-full text-end'>
                <h1 className='text-romo-100 text-base font-semibold'>{mobData.name}</h1>
                <p className='text-romo-200 italic text-xs font-thin'>{mobData.race}/{mobData.class}</p>
            </article>
            <div className='aspect-square  overflow-hidden'>
                <img ref={pictureRef} src={mobData.picture}/>
            </div>
        </section>

    )
}

function DetailedSpawnCard({ mobData }: { mobData: Mob }) {
    const {partyData} = useContext(AppContext)
    
    let ownerColor = partyData?.players.find(playerData => playerData.id == mobData.ownerId)?.color
    return (
        <section 
        className='h-fit flex flex-col bg-romo-950 rounded-md overflow-hidden p-2 gap-1'>
            <div className='h-40 w-48 overflow-hidden rounded-sm'>
                <img src={mobData.picture} />
            </div>
            <article className='flex flex-row items-end gap-2'>
                    <h1 className='text-romo-100 flex flex-row items-center gap-1'>
                        <div style={{backgroundColor: ownerColor}} className='rounded-full aspect-square w-2 h-2'/>
                        {mobData.name}
                    </h1>
                    <p className='text-xs -translate-y-[2px] text-romo-200'>{mobData.race} / {mobData.class}</p>
            </article>
            <ul>
                <li className='text-romo-100 capitalize font-thin italic text-sm'>charisma: <span className='text-romo-200'> {mobData.abilityScores.charisma.baseScore} </span></li>
                <li className='text-romo-100 capitalize font-thin italic text-sm'>constitution: <span className='text-romo-200'> {mobData.abilityScores.constitution.baseScore}</span> </li>
                <li className='text-romo-100 capitalize font-thin italic text-sm'>dexterity: <span className='text-romo-200'> {mobData.abilityScores.dexterity.baseScore}</span> </li>
                <li className='text-romo-100 capitalize font-thin italic text-sm'>intelligence: <span className='text-romo-200'> {mobData.abilityScores.intelligence.baseScore}</span> </li>
                <li className='text-romo-100 capitalize font-thin italic text-sm'>strength: <span className='text-romo-200'> {mobData.abilityScores.strength.baseScore}</span> </li>
                <li className='text-romo-100 capitalize font-thin italic text-sm'>wisdom: <span className='text-romo-200'> {mobData.abilityScores.wisdom.baseScore}</span> </li>
            </ul>

        </section>
    )
}