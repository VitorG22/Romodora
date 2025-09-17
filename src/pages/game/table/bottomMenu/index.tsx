import { ChevronDown, ChevronUp, DicesIcon } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"
import { GameContext } from "../../../../scripts/socket"
import "./style.css"

export function BottomMenu() {
    const [isBottomMenuOpen, setIsBottomMenuOpen] = useState<boolean>(true)
    const game = useContext(GameContext)
    const bottomMenuContainerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (isBottomMenuOpen) {
            bottomMenuContainerRef.current?.classList.remove('isBottomMenuCollapse')
            return
        }
        bottomMenuContainerRef.current?.classList.add('isBottomMenuCollapse')

    }, [isBottomMenuOpen])

    return (
        <main ref={bottomMenuContainerRef} id={"bottomMenuContainer"} className='flex flex-col h-full row-start-4 row-end-6 col-start-3 col-end-10 z-20 text-stone-300'>
            <button onClick={() => setIsBottomMenuOpen(!isBottomMenuOpen)} className="flex justify-center w-full h-6 bg-stone-900 hover:bg-stone-800 text-stone-400 border-t border-stone-400/40">
                {isBottomMenuOpen ? (<ChevronDown strokeWidth={1} />) : (<ChevronUp strokeWidth={1} />)}
            </button>
            <section id="subElementsContainer" className=' flex flex-row justify-between divide-x divide-stone-200/40 bg-stone-900'>
                <div className='w-fit flex flex-col gap-1'>
                    <h1 className="flex gap-1 w-full justify-center ">Roll Dices<DicesIcon strokeWidth={1} /></h1>
                    <div id='DicesRoll' className='grid grid-rows-4 grid-cols-2 w-fit 
                            *:p-4 *:hover:bg-stone-800 *:duration-300 *:flex *:items-center *:justify-center *:hover:cursor-pointer'>
                        <button onClick={() => game?.rollDice(4)}>D4</button>
                        <button onClick={() => game?.rollDice(6)}>D6</button>
                        <button onClick={() => game?.rollDice(8)}>D8</button>
                        <button onClick={() => game?.rollDice(10)}>D10</button>
                        <button onClick={() => game?.rollDice(12)}>D12</button>
                        <button onClick={() => game?.rollDice(20)}>D20</button>
                        <button onClick={() => game?.rollDice(100)} className="col-span-2">D100</button>
                    </div>
                </div>
            </section>
        </main>


        // <main ref={bottomMenuContainerRef} id='bottomMenuContainer' className='flex flex-col text-stone-300  row-start-4 row-end-6 col-start-3 col-end-10 z-20 border-t border-l border-red-500'>
        //     <button onClick={() => setIsBottomMenuOpen(!isBottomMenuOpen)} className="flex justify-center w-full h-fit bg-stone-900 hover:bg-stone-800 text-stone-400">
        //         {isBottomMenuOpen ? (<ChevronDown strokeWidth={1} />) : (<ChevronUp strokeWidth={1} />)}
        //     </button>
        //     <section className=' flex flex-row justify-between divide-x divide-stone-200/40 bg-stone-900'>
        //         <div className='w-fit flex flex-col gap-1'>
        //             <h1 className="flex gap-1 w-full justify-center ">Roll Dices<DicesIcon strokeWidth={1}/></h1>
        //             <div id='DicesRoll' className='grid grid-rows-4 grid-cols-2 w-fit 
        //         *:p-4 *:hover:bg-stone-800 *:duration-300 *:flex *:items-center *:justify-center *:hover:cursor-pointer'>
        //                 <button onClick={()=>game?.rollDice(4)}>D4</button>
        //                 <button onClick={()=>game?.rollDice(6)}>D6</button>
        //                 <button onClick={()=>game?.rollDice(8)}>D8</button>
        //                 <button onClick={()=>game?.rollDice(10)}>D10</button>
        //                 <button onClick={()=>game?.rollDice(12)}>D12</button>
        //                 <button onClick={()=>game?.rollDice(20)}>D20</button>
        //                 <button onClick={()=>game?.rollDice(100)} className="col-span-2">D100</button>
        //             </div>
        //         </div>
        //     </section>
        // </main>
    )
}