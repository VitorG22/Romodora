import { createContext } from "react"
import { ICharacterData } from "../../../interfaces"

export interface IBoardContext {
    selectedCharacterInfo: ICharacterData | undefined
    selectedSubMenu: 'dice' | 'bag'| 'spawn'|'maps'
    setSelectedSubMenu?: React.Dispatch<React.SetStateAction<"dice" | "bag"| "spawn"|'maps'>>
    setSelectedCharacterInfo?: React.Dispatch<React.SetStateAction<ICharacterData | undefined>>
}

export const BoardContext = createContext<IBoardContext>({
    selectedCharacterInfo: undefined,
    selectedSubMenu: 'dice'
})