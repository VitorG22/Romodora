import { X } from "lucide-react";
import type { ICharacter } from "../../../character/charactersClass";

export function DetailsCard({ detailCardData, setDetailCardData }: { detailCardData: ICharacter | null, setDetailCardData: React.Dispatch<React.SetStateAction<ICharacter | null>> }) {
    return (
        <section className="col-start-1 col-end-4 row-start-1 row-end-4 z-20">
            {detailCardData != null &&
                <div className="flex  flex-row w-full h-full p-2 bg-stone-900 text-stone-300 relative">
                    <div className="flex overflow-hidden rounded-md">
                        <img src={detailCardData.picture} className="object-cover" />
                    </div>
                    <article className="flex flex-col  divide-stone-200/40 divide-y *:py-2  pl-1 text-stone-200 w-1/2">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-md font-normal">{detailCardData.name}</h1>
                        <X className="hover:cursor-pointer hover:bg-stone-400/40 " size={20} strokeWidth={1} onClick={()=> setDetailCardData(null)}/>
                    </div>
                        <ul className="text-sm ">
                            <li>charisma: <span className="italic font-thin">{detailCardData.attributes.charisma}</span></li>
                            <li>constitution: <span className="italic font-thin">{detailCardData.attributes.constitution}</span></li>
                            <li>dexterity: <span className="italic font-thin">{detailCardData.attributes.dexterity}</span></li>
                            <li>intelligence: <span className="italic font-thin">{detailCardData.attributes.intelligence}</span></li>
                            <li>strength: <span className="italic font-thin">{detailCardData.attributes.strength}</span></li>
                            <li>wisdom: <span className="italic font-thin">{detailCardData.attributes.wisdom}</span></li>
                        </ul>
                        <div className="text-sm font-semibold">
                            <p>Class:<span className='italic font-thin'> {detailCardData.class}</span></p>
                            {detailCardData.subClass && <p>Sub Class: <span className='italic font-thin'>{detailCardData.subClass}</span></p>}
                            <p>Race: <span className='italic font-thin'>{detailCardData.class}</span></p>
                            {detailCardData.subRace && <p>Sub Race: <span className='italic font-thin'>{detailCardData.subRace}</span></p>}
                        </div>
                    </article>
                </div>
            }
        </section>
    )
}