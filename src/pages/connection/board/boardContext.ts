import { createContext } from "react"
import { ICharacterData } from "../../../interfaces"
import { Tile } from "../../maps/classes/tileClasses"

export interface IBoardContext {
    selectedCharacterInfo: ICharacterData | undefined
    selectedSubMenu: 'dice' | 'bag'| 'spawn'|'maps'| undefined
    setSelectedSubMenu?: React.Dispatch<React.SetStateAction<"dice" | "bag"| "spawn"|'maps'|undefined>>
    setSelectedCharacterInfo?: React.Dispatch<React.SetStateAction<ICharacterData | undefined>>
    selectedTileToMove: Tile | undefined
    setSelectedTileToMove?: React.Dispatch<React.SetStateAction<Tile | undefined>>
}

export const BoardContext = createContext<IBoardContext>({
    selectedCharacterInfo: undefined,
    selectedSubMenu: 'dice',
    selectedTileToMove: undefined
})