import { useContext } from "react"
import { BoardContext } from "../boardContext"


export function BottomSubMenuBar({ isThisUserHost }: { isThisUserHost: boolean }) {
    const { selectedSubMenu, setSelectedSubMenu } = useContext(BoardContext)

    return (
        <section className='z-[60] flex flex-row justify-center items-center gap-8 row-start-5 row-end-6 col-start-4 col-end-9'>
            <hr className="w-20 h-[2px] rounded-full bg-lagun-500 border-none" />
            <div style={selectedSubMenu == 'bag' ? { "scale": '1.5', 'filter': 'brightness(1.2)' } : { "scale": '1', 'filter': 'brightness(0.5)' }}
                onClick={() => setSelectedSubMenu?.(selectedSubMenu == 'bag'? (undefined):('bag'))}
                className='h-8 overflow-hidden flex w-fit ease duration-300 hover:cursor-pointer'>
                <img className='object-cover' src='/assets/icons/backpack.png' />
            </div>
            <div style={selectedSubMenu == 'dice' ? { "scale": '1.5', 'filter': 'brightness(1.2)' } : { "scale": '1', 'filter': 'brightness(0.5)' }}
                onClick={() => setSelectedSubMenu?.(selectedSubMenu == 'dice'? (undefined):('dice'))}
                className='h-8 overflow-hidden flex w-fit ease duration-300 hover:cursor-pointer'>
                <img className='object-cover' src='/assets/icons/d20.png' />
            </div>

            {isThisUserHost && <>
                <div style={selectedSubMenu == 'spawn' ? { "scale": '1.5', 'filter': 'brightness(1.2)' } : { "scale": '1', 'filter': 'brightness(0.5)' }}
                    onClick={() => setSelectedSubMenu?.(selectedSubMenu == 'spawn'? (undefined):('spawn'))}
                    className='h-8 overflow-hidden flex w-fit ease duration-300 hover:cursor-pointer'>
                    <img className='object-cover' src='/assets/icons/grimoire.png' />
                </div>
                <div style={selectedSubMenu == 'maps' ? { "scale": '1.5', 'filter': 'brightness(1.2)' } : { "scale": '1', 'filter': 'brightness(0.5)' }}
                    onClick={() => setSelectedSubMenu?.(selectedSubMenu == 'maps'? (undefined):('maps'))}
                    className='h-8 overflow-hidden flex w-fit ease duration-300 hover:cursor-pointer'>
                    <img className='object-cover' src='/assets/icons/deceive.png' />
                </div>
            </>}
            <hr className="w-20 h-[2px] rounded-full bg-lagun-500 border-none" />

        </section>
    )
}