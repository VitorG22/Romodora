import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../../redux/store"
import { useContext, useEffect } from "react"
import { getMap } from "../../../../maps/editMap/mapScript"
import { TableMap, type ITableMap } from "../../../../maps/editMap/mapsClass"
import { changeMapsList } from "../../../../../redux/mapsSlice"
import { GameContext } from "../../../../../scripts/socket"


export default function MapSelectionTab() {
    const maps = useSelector((state: RootState) => state.maps)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        getMap((mapList: TableMap[]) => dispatch(changeMapsList(mapList)))
    }, [])


    return (
        <section className='relative flex flex-col pr-44 w-fit'>
            <ul className='w-fit'>
                {maps?.map(mapData => <SelectMapComponent mapData={mapData} />)}
            </ul>
        </section>
    )
}

function SelectMapComponent({ mapData }: { mapData: ITableMap }) {
    const game = useContext(GameContext)
    const mapObject = new TableMap(mapData)
    useEffect(() => {
        mapObject.reDrawAll()
    }, [])
    
    const selectMap = () =>{
        if(mapData.id){
            game?.tableControl.emitChangeTableMap(mapData.id)
        }
    }

    return (
        <li onClick={selectMap} className="group flex flex-row gap-2 hover:bg-stone-800 hover: px-2">
            <div className="flex items-center justify-center group-hover:h-40 h-0 absolute border border-stone-800 aspect-square top-0 right-0 bg-stone-900">
                {mapData.layers?.map(layerData =>
                    <canvas id={layerData.id} width={mapData.sizeX * 100} height={mapData.sizeY * 100} key={`selectMapComponent_Map_${mapData.id}_Canvas_${layerData.id}`}
                        className={`max-w-full max-h-full absolute flex ${layerData.id}`} style={{ aspectRatio: mapData.sizeX / mapData.sizeY }}
                    />
                )}
            </div>
            <p className='font-semibold'>Name: <span className="font-normal italic">{mapData.name}</span></p>
            <p className='font-semibold'>Size: <span className="font-normal italic">{mapData.sizeX}x{mapData.sizeY}</span></p>
        </li>
    )
}