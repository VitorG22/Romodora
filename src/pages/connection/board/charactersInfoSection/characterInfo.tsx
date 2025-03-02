import { useContext, useEffect, useState } from "react"
import { BoardContext } from "../boardContext"
import { ChevronDown, ChevronUp, Coins, Heart, X } from "lucide-react"
import { AppContext } from "../../../../AppContext"
import { Mob } from "../../../../classes/mobClasses"

interface IMobActions {
    functionName: 'ChangeHealth' | 'CoinPlus' | 'CoinMinus' | 'ChangeScore' | 'ChangeScore'
    additionalData?: any
}

export function LeftCharacterInfo() {
    const { socket, partyData, mainUser } = useContext(AppContext)
    const { selectedCharacterInfo, setSelectedCharacterInfo } = useContext(BoardContext)
    const [havePermissionToChangeData, setHavePermissionToChangeData] = useState<boolean>(false)
    let characterOwner = partyData?.players.find((playerData => playerData.id == selectedCharacterInfo?.ownerId))

    const MobAction = ({ functionName, additionalData }: IMobActions) => {
        if (!selectedCharacterInfo) return
        socket?.emit('mobAction', {
            partyCode: partyData?.partyCode,
            data: {
                mobId: selectedCharacterInfo.id,
                mobOwnerId: selectedCharacterInfo.ownerId,
                functionName: functionName,
                additionalData
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

                    <div className='h-full aspect-[3/5] object-cover overflow-hidden'>
                        <img src={selectedCharacterInfo?.picture}
                            className='object-cover h-full w-full' />
                    </div>
                    <article
                        style={{ backgroundColor: characterOwner?.color + '30', borderLeft: `solid 1px ${characterOwner?.color}` }}
                        className='p-2 py-2 border-l border-romo-200 h-fit w-fit relative'>
                        <h1 className='text-romo-100 text-lg'>{selectedCharacterInfo?.name}</h1>
                        <h1 className='thin italic text-romo-200 text-xs'>{selectedCharacterInfo?.class}</h1>
                        <p className='flex flex-row gap-2 items-center font-thin text-sm w-fit pr-10 group relative'>
                            <Heart size={12} strokeWidth={1} className='text-red-500 fill-red-500' />
                            {selectedCharacterInfo?.health.currentHealth}/{selectedCharacterInfo?.health.maxHealthTotal}
                            {havePermissionToChangeData &&
                                <div className='absolute hidden flex-col w-8 items-center group-hover:flex right-0 '>
                                    <button onClick={() => MobAction({ functionName: "ChangeHealth",additionalData:{operator: "plus" , type: 'currentHealth'  } })} className=' h-1/2 w-full flex justify-center'
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = characterOwner?.color + '60'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        ><ChevronUp size={12} strokeWidth={1} /></button>
                                    <button onClick={() => MobAction({ functionName: "ChangeHealth",additionalData:{operator: "minus" , type: 'currentHealth'  } })} className=' h-1/2 w-full flex justify-center'
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = characterOwner?.color + '60'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        ><ChevronDown size={12} strokeWidth={1} /></button>
                                </div>
                            }
                        </p>
                        <p className='flex flex-row gap-2 items-center font-thin text-sm w-fit pr-10 group relative'>
                            <Coins size={12} strokeWidth={1} className='text-amber-500 fill-amber-500' />
                            {selectedCharacterInfo?.health.currentHealth}/{selectedCharacterInfo?.health.maxHealthTotal}
                            {havePermissionToChangeData &&
                                <div className='absolute hidden flex-col w-8 items-center group-hover:flex right-0 '>
                                    <button onClick={() => MobAction({ functionName: "ChangeHealth",additionalData:{operator: "plus" , type: 'currentHealth'  } })} className=' h-1/2 w-full flex justify-center'
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = characterOwner?.color + '60'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        ><ChevronUp size={12} strokeWidth={1} /></button>
                                    <button onClick={() => MobAction({ functionName: "ChangeHealth",additionalData:{operator: "minus" , type: 'currentHealth'  } })} className=' h-1/2 w-full flex justify-center'
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = characterOwner?.color + '60'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        ><ChevronDown size={12} strokeWidth={1} /></button>
                                </div>
                            }
                        </p>
                        {selectedCharacterInfo?.abilityScores &&
                            <ul className='mt-2 flex flex-col gap-1 *:first-letter:uppercase *:whitespace-nowrap'>
                                <AbilityScoresItem userColor={characterOwner?.color ||"#ffffff"} key={'scoreItem_charisma'} selectedCharacterInfo={selectedCharacterInfo} AbilityScoreName="charisma" havePermissionToChangeData={havePermissionToChangeData} MobAction={MobAction} />
                                <AbilityScoresItem userColor={characterOwner?.color ||"#ffffff"} key={'scoreItem_constitution'} selectedCharacterInfo={selectedCharacterInfo} AbilityScoreName="constitution" havePermissionToChangeData={havePermissionToChangeData} MobAction={MobAction} />
                                <AbilityScoresItem userColor={characterOwner?.color ||"#ffffff"} key={'scoreItem_dexterity'} selectedCharacterInfo={selectedCharacterInfo} AbilityScoreName="dexterity" havePermissionToChangeData={havePermissionToChangeData} MobAction={MobAction} />
                                <AbilityScoresItem userColor={characterOwner?.color ||"#ffffff"} key={'scoreItem_intelligence'} selectedCharacterInfo={selectedCharacterInfo} AbilityScoreName="intelligence" havePermissionToChangeData={havePermissionToChangeData} MobAction={MobAction} />
                                <AbilityScoresItem userColor={characterOwner?.color ||"#ffffff"} key={'scoreItem_strength'} selectedCharacterInfo={selectedCharacterInfo} AbilityScoreName="strength" havePermissionToChangeData={havePermissionToChangeData} MobAction={MobAction} />
                                <AbilityScoresItem userColor={characterOwner?.color ||"#ffffff"} key={'scoreItem_wisdom'} selectedCharacterInfo={selectedCharacterInfo} AbilityScoreName="wisdom" havePermissionToChangeData={havePermissionToChangeData} MobAction={MobAction} />
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

function AbilityScoresItem({ AbilityScoreName, selectedCharacterInfo, havePermissionToChangeData, MobAction, userColor }: { selectedCharacterInfo: Mob, havePermissionToChangeData: boolean, MobAction: ({ functionName }: IMobActions) => void, AbilityScoreName: "charisma" | "constitution" | "dexterity" | "intelligence" | "strength" | "wisdom" , userColor:string}) {
    
    return (
        <li className='flex flex-row gap-2 thin text-romo-100 text-sm italic group'>{AbilityScoreName}: 
        <span className="text-romo-200 font-normal">{selectedCharacterInfo.abilityScores[AbilityScoreName].totalScore}</span>
            {havePermissionToChangeData &&
                <div className='opacity-0 flex-col w-8 items-center group-hover:opacity-100 '>
                    <button 
                    onClick={() => MobAction({ functionName: "ChangeScore", additionalData: { AbilityScoreName, operator: "plus", type: 'baseScore' } })} 
                    className=' h-1/2 w-full flex justify-center'
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = userColor + '60'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <ChevronUp size={12} strokeWidth={1}/>
                    </button>
                    <button 
                    onClick={() => MobAction({ functionName: "ChangeScore", additionalData: { AbilityScoreName, operator: "minus", type: 'baseScore' } })} 
                    className=' h-1/2 w-full flex justify-center '
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = userColor + '60'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <ChevronDown size={12} strokeWidth={1}/>
                    </button>
                </div>
            }
        </li>
    )
}