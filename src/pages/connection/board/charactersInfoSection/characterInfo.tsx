import { useContext, useEffect, useState } from "react"
import { BoardContext } from "../boardContext"
import { ChevronDown, ChevronUp, Heart, X } from "lucide-react"
import { AppContext } from "../../../../AppContext"

export function LeftCharacterInfo() {
    const { socket, partyData, mainUser } = useContext(AppContext)
    const { selectedCharacterInfo, setSelectedCharacterInfo } = useContext(BoardContext)
    const [havePermissionToChangeData, setHavePermissionToChangeData] = useState<boolean>(false)

    const MobAction = (functionName: 'HealthPlus' | 'HealthMinus') => {
        if (!selectedCharacterInfo) return
        console.log("Mob Action " + functionName)
        socket?.emit('mobAction', {
            partyCode: partyData?.partyCode,
            data: {
                mobId: selectedCharacterInfo.id,
                mobOwnerId: selectedCharacterInfo.ownerId,
                functionName: functionName,
                additionalData: {

                }
            }
        })
    }
    useEffect(() => {
        if (mainUser.id == partyData?.hostId || mainUser.id == selectedCharacterInfo?.ownerId) {
            setHavePermissionToChangeData(true)
        } else {
            setHavePermissionToChangeData(false)
        }
    }, [selectedCharacterInfo])

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
                        <p className='flex flex-row gap-2 items-center font-thin text-sm w-fit pr-10 group relative'>
                            <Heart size={12} strokeWidth={1} className='text-red-500 fill-red-500' />
                            {selectedCharacterInfo?.health.currentHealth}/{selectedCharacterInfo?.health.maxHealthTotal}
                            {havePermissionToChangeData &&
                                <div className='absolute hidden flex-col w-8 items-center group-hover:flex right-0 '>
                                    <button onClick={() => MobAction("HealthPlus")} className='hover:bg-romo-400 h-1/2 w-full flex justify-center'><ChevronUp size={12} strokeWidth={1} className='hover:bg-romo-400' /></button>
                                    <button onClick={() => MobAction('HealthMinus')} className='hover:bg-romo-400 h-1/2 w-full flex justify-center'><ChevronDown size={12} strokeWidth={1} className='hover:bg-romo-400' /></button>
                                </div>
                            }
                        </p>
                        {selectedCharacterInfo?.abilityScores &&
                            <ul className='mt-2 flex flex-col gap-1 *:first-letter:uppercase *:whitespace-nowrap'>
                                <li className='thin text-romo-100 text-sm italic'>carisma: <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores.charisma.totalScore}</span></li>
                                <li className='thin text-romo-100 text-sm italic'>constitution: <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores.constitution.totalScore}</span></li>
                                <li className='thin text-romo-100 text-sm italic'>dexterity: <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores.dexterity.totalScore}</span></li>
                                <li className='thin text-romo-100 text-sm italic'>intelligence: <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores.intelligence.totalScore}</span></li>
                                <li className='thin text-romo-100 text-sm italic'>strength: <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores.strength.totalScore}</span></li>
                                <li className='thin text-romo-100 text-sm italic'>wisdom: <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores.wisdom.totalScore}</span></li>
                            </ul>
                        }
                        <button className="absolute top-1 right-1 text-romo-100 hover:bg-romo-200/20"
                            onClick={() => setSelectedCharacterInfo?.(undefined)}
                        ><X size={15} strokeWidth={1} /></button>
                    </article>
                </>
            }
        </section>

    )
}