import { useContext } from "react"
import { GameContext } from "../../../../scripts/socket"

export function TableCanvas() {
    const game = useContext(GameContext)

    return (
        <section className="flex items-center justify-center absolute top-0 left-0 w-full h-full z-0">
            <canvas className=' h-4/5 aspect-square bg-purple-500/20 rounded-md'></canvas>
        </section>
    )

}
