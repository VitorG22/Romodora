import { CharacterList } from "./charactersList"
import { DetailsCard } from "./detailsCard"
import { Chat } from "./chat"
import { BottomMenu } from "./bottomMenu"
import { TableCanvas } from "./canvas"

export default function Table() {

    return (
        <main className="grid grid-cols-9 grid-rows-5 w-full h-full relative overflow-hidden ">
            <CharacterList />
            <DetailsCard/>
            <Chat/>
            <BottomMenu/>
            <TableCanvas/>
        </main>
    )
}
