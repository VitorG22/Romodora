import { useContext, useState } from "react";
import { AppContext } from "../../../../AppContext";
import { IPlayerData } from "../../../../interfaces";
import { RefreshCw } from "lucide-react";
import TradeCharacterModal from "../tradeCharacter/tradeCharacter";

export function PlayerCard({ playerData }: { playerData: IPlayerData }) {
    const { mainUser, partyData } = useContext(AppContext)
    const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)

    const isThisUserHost = playerData.id == partyData?.hostId
    const isThisUserCard = playerData.id == mainUser.id

    return (
        <div className='h-full flex flex-col gap-2'>
            <section style={{borderColor: playerData.color}} className='relative h-full aspect-[2/4] flex overflow-hidden border-b'>
                {isThisUserHost ? 
                <p className='px-4  py-2 z-20 text-romo-100 absolute top-0 left-0 '>Dungeon Master</p>:
                    isThisUserCard && <button  
                    onClick={()=> setIsTradeModalOpen(true)}
                    onMouseEnter={e => e.currentTarget.style.background = playerData.color + 30}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    className="rounded-full absolute z-20 top-2 right-2 text-romo-200 p-2"><RefreshCw size={17} strokeWidth={1}/></button>}
                <img src={playerData.characterData?.picture || playerData.picture}
                    className='object-cover min-w-full min-h-full [mask-image:radial-gradient(circle,#000_10%,#00000025_90%)]'
                />
                <p 
                style={{backgroundColor: playerData.color + 30}}
                className='absolute flex items-center justify-center bottom-0 left-0   text-romo-100 w-full py-4 '>
                    {playerData.characterData?.name || playerData.name}
                </p>
                
            </section>
            <section className='flex flex-row gap-2'>
                <div className='h-12 aspect-square flex justify-center items-center overflow-hidden'>
                    <img src={playerData.picture} />
                </div>
                <article className='flex flex-col'>
                    <p className='text-romo-100 '>{playerData.name}</p>
                    <p className='text-romo-200 text-xs font-thin italic'>{playerData.permissionType}</p>
                </article>
            </section>
            {isTradeModalOpen && <TradeCharacterModal setIsModalOpen={setIsTradeModalOpen}/>}
        </div>
    )
}