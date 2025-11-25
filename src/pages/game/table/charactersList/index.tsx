import { useContext, useEffect, useRef, useState } from "react"
import { GameContext } from "../../../../scripts/socket"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import type { IPlayer } from "../../table/TableControlerClass"
import './style.css'


export function CharacterList() {
    const game = useContext(GameContext)
    const [isCharacterListOpen, setIsCharacterListOpen] = useState<boolean>(false)

    return (
        <section id="characterList" className='flex flex-row justify-self-end col-start-8 col-end-10 bg-stone-900 row-start-1 row-end-4 z-10 '>
            <button className='h-full w-fit hover:bg-stone-800 text-stone-400 hover:cursor-pointer' onClick={() => setIsCharacterListOpen(!isCharacterListOpen)}>
                {isCharacterListOpen ? (<ChevronRight strokeWidth={1} />) : (<ChevronLeft strokeWidth={1} />)}
            </button>
            <ul
                className='flex flex-col items-end w-fit p-2 gap-1 divide-stone-400/40 divide-y'>
                {game?.tableControl.players.map(playerData =>
                    <CharacterBanner isCharacterListOpen={isCharacterListOpen} playerData={playerData} />
                )}
            </ul>
        </section>
    )
}

function CharacterBanner({ playerData, isCharacterListOpen }: { isCharacterListOpen: boolean, playerData: IPlayer}) {
    const LifeBarRef = useRef<HTMLDivElement>(null)
    const ArticleRef = useRef<HTMLElement>(null)
    const CharacterBannerRef = useRef<HTMLLIElement>(null)
    const game = useContext(GameContext)

    useEffect(() => {
        switch (isCharacterListOpen) {
            case true:
                CharacterBannerRef.current?.classList.remove('CharacterBannerCollapse')
                LifeBarRef.current?.classList.remove('subElementsCollapse')
                ArticleRef.current?.classList.remove('subElementsCollapse')
                break
                case false:
                    CharacterBannerRef.current?.classList.add('CharacterBannerCollapse')
                    LifeBarRef.current?.classList.add('subElementsCollapse')
                    ArticleRef.current?.classList.add('subElementsCollapse')
                break
        }

    }, [isCharacterListOpen])


    return (
        <li ref={CharacterBannerRef}
            className="CharacterBanner CharacterBannerOpen gap-1 pr-1 py-1 flex flex-col items-end hover:bg-stone-900/10 hover:cursor-pointer" onClick={() => game?.tableControl.setSelectedObjectOrEntity({entity: playerData.character})} >
            <div className='flex flex-row h-fit w-full justify-end text-end items-end'>
                <article ref={ArticleRef} className="subElements flex flex-col justify-end pr-2 ">
                    <p className='text-stone-300'>{playerData.character?.name} </p>
                    <p className='text-stone-300/60 italic'>{playerData.name}</p>
                </article>
                <div className='flex items-center justify-center h-12 aspect-square overflow-hidden'>
                    <img className="object-cover" src={playerData.character?.picture} />
                </div>
            </div>
            <div ref={LifeBarRef} className='subElements  flex flex-row gap-1 w-40 h-4  items-center justify-end '>
                <p className="text-red-500 text-xs flex flex-row items-center">{playerData.character?.life}/{playerData.character?.maxLife} <Heart fill="#fb2c36" size={12} strokeWidth={0} /></p>
                <div className='relative w-full'>
                    <div className='rounded-full border border-red-500 w-full h-1'></div>
                    {playerData.character && <div style={{ width: `${100 / playerData.character.maxLife * playerData.character.life}%` }} className='absolute top-0 left-0 rounded-full bg-linear-to-r from-red-500 to-red-600 w-full h-1'></div>}
                </div>
            </div>
        </li>
    )
}