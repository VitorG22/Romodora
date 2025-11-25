import { useContext} from "react"
import { GameContext } from "../../../../../scripts/socket"
import { Entity } from "../../TableControlerClass";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Inspect() {
    const game = useContext(GameContext)
    let selectedObjectOrEntity = game?.tableControl.selectedObjectOrEntity

    return (
        <section className='flex flex-row  h-full w-full p-2 overflow-hidden'>
            {!game?.tableControl.selectedObjectOrEntity ? (
                <h1 className='flex h-full w-full items-center justify-center text-xl  text-stone-500 font-semibold'>
                    Select an Object or Entity to begin inspecting.
                </h1>
            ) : (
                <>
                    {selectedObjectOrEntity?.entity && <InspectEntity EntityData={selectedObjectOrEntity?.entity} />}
                    {selectedObjectOrEntity?.object && <InspectObject ObjectData={selectedObjectOrEntity?.object} />}
                </>
            )}

        </section>
    )
}

function InspectEntity({ EntityData }: { EntityData: Entity }) {

    const changeAttribute = ({ attribute, type }: { attribute: "charisma" | "constitution" | "dexterity" | "intelligence" | "strength" | "wisdom", type: "plus" | "minus" }) => {
        if (!EntityData.attributes) return

        switch (type) {
            case "plus":
                EntityData.attributes[attribute] += 1
                break
            case "minus":
                EntityData.attributes[attribute] -= 1
                break
        }

        EntityData.changeCharacterData({
            CharacterData: EntityData
        })
    }

    return (
        <section className='flex flex-row gap-2'>
            <div className='flex overflow-hidden h-full w-fit rounded-md'>
                <img src={EntityData.picture} className='object-contain' />
            </div>
            <article className="">
                <p className='font-semibold'>Name: <span className='italic font-thin'>{EntityData.name}</span></p>
                <ul>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>charisma:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "charisma", type: 'minus' })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{EntityData.attributes?.charisma}</p>
                        <button onClick={() => changeAttribute({ attribute: "charisma", type: 'plus' })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>constitution:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "constitution", type: 'minus' })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{EntityData.attributes?.constitution}</p>
                        <button onClick={() => changeAttribute({ attribute: "constitution", type: 'plus' })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>dexterity:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "dexterity", type: 'minus' })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{EntityData.attributes?.dexterity}</p>
                        <button onClick={() => changeAttribute({ attribute: "dexterity", type: 'plus' })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>intelligence:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "intelligence", type: 'minus' })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{EntityData.attributes?.intelligence}</p>
                        <button onClick={() => changeAttribute({ attribute: "intelligence", type: 'plus' })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>strength:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "strength", type: 'minus' })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{EntityData.attributes?.strength}</p>
                        <button onClick={() => changeAttribute({ attribute: "strength", type: 'plus' })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>wisdom:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "wisdom", type: 'minus' })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{EntityData.attributes?.wisdom}</p>
                        <button onClick={() => changeAttribute({ attribute: "wisdom", type: 'plus' })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>

                    <li className='flex flex-row gap-1'><p className='font-semibold'>Life:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() =>EntityData.damage(1)} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{EntityData.life}</p>
                        <button onClick={() => EntityData.heal(1)} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                </ul>
            </article>
        </section >
    )
}
function InspectObject({ ObjectData }: { ObjectData: any }) {
    return (
        <section>
            <p>{ObjectData.name}</p>
        </section>
    )
}