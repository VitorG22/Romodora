import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "./style.css"
import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../../../../scripts/socket";
import { Character, type TEntity } from "../entitysClasses";

export function DetailsCard() {
    const CardDataRef = useRef<HTMLDivElement>(null)
    const [isCardOpen, setIsCardOpen] = useState<boolean>(true)
    const game = useContext(GameContext)
    const [selectedEntity, setSelectedEntity] = useState<TEntity | undefined>()

    useEffect(() => {
        let tempSelectedEntity = game!.tableControl.getSelectedEntity()
        setSelectedEntity(tempSelectedEntity)
        if (tempSelectedEntity) {
            CardDataRef.current?.classList.add("isCardOpen")
            setIsCardOpen(true)
        } else {
            CardDataRef.current?.classList.remove("isCardOpen")
        }
    }, [game?.tableControl.selectedEntityId])

    useEffect(() => {
        if (!isCardOpen) {
            closeCard()
        } else {
            openCard()
        }

    }, [isCardOpen])

    const closeCard = () => {
        CardDataRef.current?.classList.remove("isCardOpen")
    }
    const openCard = () => {
        CardDataRef.current?.classList.add("isCardOpen")
    }

    const deleteCardData = () => {
        CardDataRef.current?.classList.remove("isCardOpen")
        setTimeout(() => {
            game?.tableControl.deleteSelectedEntity()
            setIsCardOpen(false)
        }, 1000);
    }

    return (
        <section className="w-fit flex flex-row col-start-1 col-end-4 row-start-1 row-end-4 z-20 ">
            <div ref={CardDataRef} className="CardData flex  flex-row h-full text-stone-300 relative bg-stone-900">
                {selectedEntity && (selectedEntity instanceof Character) &&
                    <>
                        <div className="flex overflow-hidden rounded-md m-2">
                            <img src={selectedEntity.picture} className="object-cover" />
                        </div>
                        <article className="flex flex-col  divide-stone-200/40 divide-y *:py-2  pl-1 text-stone-200 w-1/2">
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-md font-normal">{selectedEntity.name}</h1>
                                <X className="hover:cursor-pointer hover:bg-stone-800 mr-1" size={20} strokeWidth={1} onClick={() => deleteCardData()} />
                            </div>
                            {selectedEntity.attributes &&
                                <ul className="text-sm ">
                                    <li>charisma: <span className="italic font-thin">{selectedEntity.attributes.charisma}</span></li>
                                    <li>constitution: <span className="italic font-thin">{selectedEntity.attributes.constitution}</span></li>
                                    <li>dexterity: <span className="italic font-thin">{selectedEntity.attributes.dexterity}</span></li>
                                    <li>intelligence: <span className="italic font-thin">{selectedEntity.attributes.intelligence}</span></li>
                                    <li>strength: <span className="italic font-thin">{selectedEntity.attributes.strength}</span></li>
                                    <li>wisdom: <span className="italic font-thin">{selectedEntity.attributes.wisdom}</span></li>
                                </ul>
                            }
                            <div className="text-sm font-semibold">
                                <p>Class:<span className='italic font-thin'> {selectedEntity.class}</span></p>
                                {selectedEntity.subClass && <p>Sub Class: <span className='italic font-thin'>{selectedEntity.subClass}</span></p>}
                                <p>Race: <span className='italic font-thin'>{selectedEntity.race}</span></p>
                                {selectedEntity.subRace && <p>Sub Race: <span className='italic font-thin'>{selectedEntity.subRace}</span></p>}
                            </div>
                        </article>
                    </>
                }
            </div>
            <button onClick={() => { if (selectedEntity != null) setIsCardOpen(!isCardOpen) }} className='h-full hover:cursor-pointer hover:bg-stone-800 text-stone-400 bg-stone-900'>
                {isCardOpen ? <ChevronLeft strokeWidth={1} /> : <ChevronRight strokeWidth={1} />}
            </button>
        </section>
    )
}