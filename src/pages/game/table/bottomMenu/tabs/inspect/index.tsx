import { useContext} from "react"
import { GameContext } from "../../../../../../scripts/socket"
import { type TEntity } from "../../../entitysClasses";
import VariableEntityInspector from "./variableEntityInspector";
import VariableObjectInspector from "./variableObjectInspector";
import type { TItems } from "../../../../../items/itemsClass";

export default function Inspect() {
    const game = useContext(GameContext)
    

    return (
        <section className='flex flex-row  h-full w-full p-2 overflow-hidden'>
            {!game?.tableControl.selectedEntity && !game?.tableControl.selectedObject ? (
                <h1 className='flex h-full w-full items-center justify-center text-xl  text-stone-500 font-semibold'>
                    Select an Object or Entity to begin inspecting.
                </h1>
            ) : (
                <section className='grid grid-cols-2 w-full h-full overflow-hidden'>
                    {game.tableControl.selectedEntity && <InspectEntity entityData={game.tableControl.selectedEntity} />}
                    {game.tableControl.selectedObject && <InspectObject objectData={game.tableControl.selectedObject} />}
                </section>
            )}

        </section>
    )
}

function InspectEntity({ entityData }: { entityData: TEntity }) {
    return (
        <section className='col-start-1 col-end-2 flex flex-row gap-2 h-full overflow-hidden'>
            <VariableEntityInspector entity={entityData}/>
        </section >
    )
}



function InspectObject({ objectData }: { objectData: TItems }) {
    return (
        <section className='col-start-2 col-end-3 flex flex-row gap-2 h-full overflow-hidden justify-self-end'>
            <VariableObjectInspector object={objectData}/>
        </section>
    )
}