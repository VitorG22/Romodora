import { ChevronLeft, ChevronRight } from "lucide-react";
import { Character, Entity, type TEntity } from "../../../entitysClasses";

export default function VariableEntityInspector({ entity }: { entity: TEntity }) {
    switch (true) {
        case entity instanceof Character:
            return (<InspectCharacter characterData={entity} />)
        case entity instanceof Entity:
            return <div>Type Entity</div>
    }
}


function InspectCharacter({ characterData }: { characterData: Character }) {

    const changeAttribute = ({ attribute, type }: { attribute: "charisma" | "constitution" | "dexterity" | "intelligence" | "strength" | "wisdom", type: "plus" | "minus" }) => {

        switch (type) {
            case "plus":
                characterData.attributes[attribute] += 1
                break
            case "minus":
                characterData.attributes[attribute] -= 1
                break
        }

        characterData.changeCharacterData({
            CharacterData: characterData
        })

    }

    return (
        <>
            <div className='flex overflow-hidden h-full w-fit rounded-md'>
                <img src={characterData.picture} className='object-contain' />
            </div>
            <article className="">
                <p className='font-semibold'>Name: <span className='italic font-thin'>{characterData.name}</span></p>
                <ul>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>Life:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => characterData.damage(1)} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.life}</p>
                        <button onClick={() => characterData.heal(1)} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>charisma:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "charisma", type: 'minus' })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.attributes?.charisma}</p>
                        <button onClick={() => changeAttribute({ attribute: "charisma", type: 'plus' })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>constitution:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "constitution", type: 'minus' })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.attributes?.constitution}</p>
                        <button onClick={() => changeAttribute({ attribute: "constitution", type: 'plus' })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>dexterity:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "dexterity", type: 'minus' })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.attributes?.dexterity}</p>
                        <button onClick={() => changeAttribute({ attribute: "dexterity", type: 'plus' })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>intelligence:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "intelligence", type: 'minus' })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.attributes?.intelligence}</p>
                        <button onClick={() => changeAttribute({ attribute: "intelligence", type: 'plus' })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>strength:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "strength", type: 'minus' })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.attributes?.strength}</p>
                        <button onClick={() => changeAttribute({ attribute: "strength", type: 'plus' })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>wisdom:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "wisdom", type: 'minus' })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.attributes?.wisdom}</p>
                        <button onClick={() => changeAttribute({ attribute: "wisdom", type: 'plus' })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                </ul>
            </article>
        </>
    )
}