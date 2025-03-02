import { Box, Ghost, Globe } from "lucide-react";
import SquareButton from "../../../components/buttons";
import NewJourney from "./menuButtons/newJourney";
import ResumeJourney from "./menuButtons/resumeJourney";
import ConnectToJourney from "./menuButtons/connectToJournay";
import CharacterEdit from "./menuButtons/characterEdit";
import MapEditorButton from "./menuButtons/mapEditor";
import Settings from "./menuButtons/settings";
import Items from "./menuButtons/items";

export default function Menu() {

    return (
        <main className='flex flex-col h-full w-full'>
            <section className=" flex flex-col gap-4 w-fit h-full justify-center px-8  divide-y-[1px] divide-romo-900 ">
                <div className='flex flex-row gap-2'>
                    <NewJourney/>
                    <ResumeJourney/>
                </div>
                <div className='flex flex-col gap-2 pt-4 *:w-full '>
                    <ConnectToJourney/>
                    <CharacterEdit/>
                    <MapEditorButton/>
                    <SquareButton variant="default"  size="lg" unable>
                        <Ghost size={15} strokeWidth={1} />
                        Creatures
                    </SquareButton>
                    <Items/>
                </div>
                <div className='flex flex-row gap-2 pt-4 *:w-full'>
                    <Settings/>
                    <SquareButton variant="ghost"  size="lg" unable>
                        <Globe size={15} strokeWidth={1} />
                        Community
                    </SquareButton>
                </div>
            </section>
        </main>
    )
}
