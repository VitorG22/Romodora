import { Coins, Heart } from "lucide-react";
import { IPlayerData } from "../../../../interfaces";
import { useContext } from "react";
import { BoardContext } from "../boardContext";


export default function PlayerCardInBoard({ playerData }: { playerData: IPlayerData }) {
    if (playerData.permissionType == "host") return
    const characterData = playerData.characterData
    const {setSelectedCharacterInfo} = useContext(BoardContext)

    return (
        <section 
        onClick={()=>setSelectedCharacterInfo?.(playerData.characterData)}
        className="flex flex-row gap-2 pl-20 p-2 hover:bg-romo-950">
            <article className='flex flex-col justify-between items-end'>
                <h2 className='first-letter:uppercase text-romo-100'>{characterData?.name}</h2>
                <p className='font-thin italic text-romo-200 text-xs first-letter:uppercase'>{characterData?.class}</p>
                <div className='flex flex-row gap-2 items-center font-thin text-xs'>
                    <Heart size={12} strokeWidth={1} className='text-red-500 fill-red-500'  />
                    {characterData?.health.currentHealth}/{characterData?.health.maxHealthTotal}
                </div>
                <div className='flex flex-row gap-2 items-center font-thin text-xs'>
                    <Coins size={12} strokeWidth={1} className='text-amber-500 fill-amber-500'  />
                </div>
            </article>
            <div className='aspect-square h-20 overflow-hidden'>
                <img src={characterData?.picture}
                    className='object-cover'
                />
            </div>
        </section>
    )
}