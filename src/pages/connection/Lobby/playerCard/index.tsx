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
            <section className='relative h-full aspect-[2/4] flex rounded-md overflow-hidden border-b border-lagun-600'>
                {isThisUserHost ? 
                <p className='px-4  py-2 z-20 text-lagun-200 absolute top-0 left-0 '>Host</p>:
                    isThisUserCard && <button  
                    onClick={()=> setIsTradeModalOpen(true)}
                className="rounded-full absolute z-20 top-2 right-2 text-lagun-200 p-2 hover:bg-lagun-200/30"><RefreshCw size={17} strokeWidth={1}/></button>}
                <img src={playerData.characterData?.picture || playerData.picture}
                    className='object-cover min-w-full min-h-full [mask-image:radial-gradient(circle,#000_10%,#00000025_90%)]'
                />
                <p className='absolute flex items-center justify-center bottom-0 left-0 bg-black/50 text-white w-full py-4 '>
                    {playerData.characterData?.name || playerData.name}
                </p>
                
            </section>
            <section className='flex flex-row gap-2'>
                <div className='h-12 aspect-square rounded-md flex justify-center items-center overflow-hidden'>
                    <img src={playerData.picture} />
                </div>
                <article className='flex flex-col'>
                    <p className='text-lagun-200 '>{playerData.name}</p>
                    <p className='text-lagun-600 text-xs font-thin italic'>{playerData.permissionType}</p>
                </article>
            </section>
            {isTradeModalOpen && <TradeCharacterModal setIsModalOpen={setIsTradeModalOpen}/>}
        </div>
    )
}