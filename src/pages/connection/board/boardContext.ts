import { createContext } from "react"
import { Mob } from "../../maps/classes/mobClasses"

export interface IBoardContext {
    selectedCharacterInfo: Mob | undefined
    selectedSubMenu: 'dice' | 'bag'| 'spawn'|'maps'| undefined
    setSelectedSubMenu?: React.Dispatch<React.SetStateAction<"dice" | "bag"| "spawn"|'maps'|undefined>>
    setSelectedCharacterInfo?: React.Dispatch<React.SetStateAction<Mob | undefined>>
    selectedTileToMove: Mob | undefined
    setSelectedTileToMove?: React.Dispatch<React.SetStateAction<Mob | undefined>>
    stickersList: string[]
}

export const BoardContext = createContext<IBoardContext>({
    stickersList: [],
    selectedCharacterInfo: undefined,
    selectedSubMenu: 'dice',
    selectedTileToMove: undefined
})