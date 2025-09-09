import { useContext, useState } from "react"
import { GameContext } from "../../../scripts/socket"
import type { IPlayer } from "../gameObject"
import { Heart } from "lucide-react"
import type { ICharacter } from "../../character/charactersClass"
import { TableCanvas } from "./canvas"
import { CharacterList } from "./charactersList"
import { DetailsCard } from "./detailsCard"
import { Chat } from "./chat"
import { BottomMenu } from "./bottomMenu"

export default function Table() {
    const [detailCardData, setDetailCardData] = useState<ICharacter|null>(null)

    return (
        <main className="grid grid-cols-9 grid-rows-5 w-full h-full relative ">
            <CharacterList setDetailCardData={setDetailCardData}/>
            <TableCanvas />
            <DetailsCard detailCardData={detailCardData} setDetailCardData={setDetailCardData} />
            <Chat/>
            <BottomMenu/>
        </main>
    )
}
