import { useContext } from "react"
import { GameContext } from "../../../../../scripts/socket"
import { DicesIcon } from "lucide-react"

export default function DicesTab() {
    const game = useContext(GameContext)

    return (

        <div className='w-40 flex flex-col gap-1 h-full'>
            <h1 className="flex gap-1 w-full justify-center mt-1 "><DicesIcon strokeWidth={1} />Roll Dices</h1>
            <div id='DicesRoll' className='grid grid-rows-4 grid-cols-2 w-full h-full
                            *:w-full *:h-full *:hover:bg-stone-800 *:duration-300 *:flex *:items-center *:justify-center *:hover:cursor-pointer'>
                <button onClick={() => game?.tableControl.rollDice(4)}>D4</button>
                <button onClick={() => game?.tableControl.rollDice(6)}>D6</button>
                <button onClick={() => game?.tableControl.rollDice(8)}>D8</button>
                <button onClick={() => game?.tableControl.rollDice(10)}>D10</button>
                <button onClick={() => game?.tableControl.rollDice(12)}>D12</button>
                <button onClick={() => game?.tableControl.rollDice(100)}>D100</button>
                <button onClick={() => game?.tableControl.rollDice(20)} className="col-span-2">D20</button>
            </div>
        </div>

    )
}