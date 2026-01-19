import { ChevronLeft, ChevronRight } from "lucide-react";
import { Character, Entity, type TEntity } from "../../../entitysClasses";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../../../../scripts/socket";

export default function VariableEntityInspector() {
    const game = useContext(GameContext)
    const [entity, setEntityData] = useState<TEntity | undefined>();

    useEffect(() => {
        setEntityData(game!.tableControl.players.find(playerData => playerData.character?.id == game?.tableControl.selectedEntityId)?.character)
    }, [game])


    switch (true) {
        case entity instanceof Character:
            return (<InspectCharacter characterData={entity} />)
        case entity instanceof Entity:
            return <div>Type Entity</div>
    }
}


function InspectCharacter({ characterData }: { characterData: Character }) {

    const changeAttribute = ({ attribute, value }: { attribute: "charisma" | "constitution" | "dexterity" | "intelligence" | "strength" | "wisdom", value: number }) => {
        characterData.changeAttribute({
            attribute: attribute,
            value: value
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
                        <button onClick={() => changeAttribute({ attribute: "charisma", value: characterData.attributes!.charisma - 1 })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.attributes?.charisma}</p>
                        <button onClick={() => changeAttribute({ attribute: "charisma", value: characterData.attributes!.charisma + 1 })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>constitution:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "constitution", value: characterData.attributes!.constitution - 1 })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.attributes?.constitution}</p>
                        <button onClick={() => changeAttribute({ attribute: "constitution", value: characterData.attributes!.constitution + 1 })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>dexterity:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "dexterity", value: characterData.attributes!.dexterity - 1 })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.attributes?.dexterity}</p>
                        <button onClick={() => changeAttribute({ attribute: "dexterity", value: characterData.attributes!.dexterity + 1 })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>intelligence:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "intelligence", value: characterData.attributes!.intelligence - 1 })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.attributes?.intelligence}</p>
                        <button onClick={() => changeAttribute({ attribute: "intelligence", value: characterData.attributes!.intelligence + 1 })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>strength:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "strength", value: characterData.attributes!.strength - 1 })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.attributes?.strength}</p>
                        <button onClick={() => changeAttribute({ attribute: "strength", value: characterData.attributes!.strength + 1 })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>wisdom:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={() => changeAttribute({ attribute: "wisdom", value: characterData.attributes!.wisdom - 1 })} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{characterData.attributes?.wisdom}</p>
                        <button onClick={() => changeAttribute({ attribute: "wisdom", value: characterData.attributes!.wisdom + 1 })} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                </ul>
            </article>
        </>
    )
}