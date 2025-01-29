import { createContext } from "react"
import { ICharacterData } from "../../../interfaces"
import { Mob } from "../../maps/classes/mobClasses"

export interface IBoardContext {
    selectedCharacterInfo: ICharacterData | undefined
    selectedSubMenu: 'dice' | 'bag'| 'spawn'|'maps'| undefined
    setSelectedSubMenu?: React.Dispatch<React.SetStateAction<"dice" | "bag"| "spawn"|'maps'|undefined>>
    setSelectedCharacterInfo?: React.Dispatch<React.SetStateAction<ICharacterData | undefined>>
    selectedTileToMove: Mob | undefined
    setSelectedTileToMove?: React.Dispatch<React.SetStateAction<Mob | undefined>>
}

export const BoardContext = createContext<IBoardContext>({
    selectedCharacterInfo: undefined,
    selectedSubMenu: 'dice',
    selectedTileToMove: undefined
})