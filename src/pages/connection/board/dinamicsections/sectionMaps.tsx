import { useContext } from "react"
import { getMapsFromLocalStorage } from "../../../../scripts/localStorage/localStorage"
import { AppContext } from "../../../../AppContext"
import { IMap } from "../../../maps"

export function DinamicSectionMaps() {
    const myMaps = getMapsFromLocalStorage()
    const { socket, partyData } = useContext(AppContext)
    console.log(myMaps)

    const handleSetMapMatrix = (element: IMap) => {
        socket?.emit('setMapMatrix', {
            partyCode: partyData?.partyCode,
            newMapData: {
                mapMatrix: element.mapMatrix,
                mapName: element.name,
                mapId: element.id
            }
        })
    }


    return (
        <section className='justify-self-end z-40 w-fit flex flex-col items-end gap-4 py-4 row-start-1 row-end-5 col-start-7 col-end-12  rounded-bl-lg border-b border-l border-romo-400 bg-romo-500/90 backdrop-blur-[3px]'>
            <h1 className='text-lg font-semibold text-lagun-500 mr-4'>Selecionar novo Mapa</h1>
            <ul className='flex flex-col items-end w-fit'>
                {myMaps?.map(element =>
                    <li
                        onClick={() => handleSetMapMatrix(element)}
                        className='flex flex-row justify-end min-w-60 w-fit gap-2 hover:bg-romo-950 hover:cursor-pointer p-2 pr-4 '>
                        <article className='text-end'>
                            <h1 className='text-lagun-200 text-lg font-normal'>{element.name}</h1>
                            <p className='text-lagun-500 italic font-thin text-xs'>{element.sizeX}x{element.sizeY}</p>
                        </article>
                        <div className='aspect-square h-16 rounded-md overflow-hidden'>
                            <img src={element.picture} className='object-cover' />
                        </div>
                    </li>
                )}
            </ul>
        </section>
    )
}