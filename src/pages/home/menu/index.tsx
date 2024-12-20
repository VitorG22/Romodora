import { Box, Ghost, Globe, Settings } from "lucide-react";
import SquareButton from "../../../components/buttons";
import NewJourney from "./menuButtons/newJourney";
import ResumeJourney from "./menuButtons/resumeJourney";
import ConnectToJourney from "./menuButtons/connectToJournay";
import CharacterEdit from "./menuButtons/characterEdit";
import MapEditorButton from "./menuButtons/mapEditor";

export default function Menu() {

    return (
        <main className='flex flex-col h-full w-full'>
            <section className=" flex flex-col gap-4 w-fit h-full justify-center px-8  divide-y-2 divide-lagun-300/20 ">
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
                        Editor de Criaturas
                    </SquareButton>
                    <SquareButton variant="default"  size="lg" unable>
                        <Box size={15} strokeWidth={1} />
                        Editor de Items
                    </SquareButton>
                </div>
                <div className='flex flex-row gap-2 pt-4 *:w-full'>
                    <SquareButton variant="default" size="lg" unable>
                        <Settings size={15} strokeWidth={1} />
                        Configurações
                    </SquareButton>
                    <SquareButton variant="ghost"  size="lg" unable>
                        <Globe size={15} strokeWidth={1} />
                        Comunidade
                    </SquareButton>
                </div>
            </section>
        </main>
    )
}
