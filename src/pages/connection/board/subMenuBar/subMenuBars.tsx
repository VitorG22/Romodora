import { useContext } from "react"
import { BoardContext } from "../boardContext"
import { AppContext } from "../../../../AppContext"


export function BottomSubMenuBar({ isThisUserHost }: { isThisUserHost: boolean }) {
    const { selectedSubMenu, setSelectedSubMenu } = useContext(BoardContext)

    return (
        <section className='z-[60] flex flex-row justify-center items-center gap-8 row-start-5 row-end-6 col-start-4 col-end-9'>
            <hr className="w-20 h-[2px] rounded-full bg-lagun-500 border-none" />
            <div style={selectedSubMenu == 'bag' ? { "scale": '1.5', 'filter': 'brightness(1.2)' } : { "scale": '1', 'filter': 'brightness(0.5)' }}
                onClick={() => setSelectedSubMenu?.(selectedSubMenu == 'bag' ? (undefined) : ('bag'))}
                className='h-8 overflow-hidden flex w-fit ease duration-300 hover:cursor-pointer'>
                <img className='object-cover' src='/assets/icons/backpack.png' />
            </div>

            <div style={selectedSubMenu == 'dice' ? { "scale": '1.5', 'filter': 'brightness(1.2)' } : { "scale": '1', 'filter': 'brightness(0.5)' }}
                onClick={() => setSelectedSubMenu?.(selectedSubMenu == 'dice' ? (undefined) : ('dice'))}
                className='h-8 flex w-fit justify-center ease duration-300 hover:cursor-pointer relative'>
                <img className='object-cover' src='/assets/icons/d20.png' />
                {selectedSubMenu == 'dice' && <DiceOpenMenu/>}
            </div>

            {isThisUserHost && <>
                <div style={selectedSubMenu == 'spawn' ? { "scale": '1.5', 'filter': 'brightness(1.2)' } : { "scale": '1', 'filter': 'brightness(0.5)' }}
                    onClick={() => setSelectedSubMenu?.(selectedSubMenu == 'spawn' ? (undefined) : ('spawn'))}
                    className='h-8 overflow-hidden flex w-fit ease duration-300 hover:cursor-pointer'>
                    <img className='object-cover' src='/assets/icons/grimoire.png' />
                </div>
                <div style={selectedSubMenu == 'maps' ? { "scale": '1.5', 'filter': 'brightness(1.2)' } : { "scale": '1', 'filter': 'brightness(0.5)' }}
                    onClick={() => setSelectedSubMenu?.(selectedSubMenu == 'maps' ? (undefined) : ('maps'))}
                    className='h-8 overflow-hidden flex w-fit ease duration-300 hover:cursor-pointer'>
                    <img className='object-cover' src='/assets/icons/deceive.png' />
                </div>
            </>}
            <hr className="w-20 h-[2px] rounded-full bg-lagun-500 border-none" />

        </section>
    )
}

function DiceOpenMenu() {

    let {socket, partyData, mainUser} = useContext(AppContext)
    
    const TrowDice = (diceType:'d100'|'d20'|'d12'|'d10'|'d8'|'d6'|'d4')=>{
        if(!socket)return


        socket.emit('trowDice', {
            partyCode: partyData?.partyCode,
            characterName: partyData?.players.find(playerData =>playerData.id == mainUser.id)?.characterData?.name || 'Dungeon Master',
            diceType: diceType
        })
    }
    
    return (
        <div className='flex flex-row scale-50 gap-1 absolute bottom-full  border-b border-romo-400
        *:px-2 *:py-1 *:text-romo-200'>
            <button className='hover:bg-romo-400' onClick={()=>TrowDice('d100')}>d100</button>
            <button className='hover:bg-romo-400' onClick={()=>TrowDice('d20')}>d20</button>
            <button className='hover:bg-romo-400' onClick={()=>TrowDice('d12')}>d12</button>
            <button className='hover:bg-romo-400' onClick={()=>TrowDice('d10')}>d10</button>
            <button className='hover:bg-romo-400' onClick={()=>TrowDice('d8')}>d8</button>
            <button className='hover:bg-romo-400' onClick={()=>TrowDice('d6')}>d6</button>
            <button className='hover:bg-romo-400' onClick={()=>TrowDice('d4')}>d4</button>
            
        </div>
    )
}