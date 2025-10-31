import { useNavigate } from "react-router-dom"
import NavBarTop from "../../assets/navBar/navBarTop"
import { type ITableMap } from "./editMap/mapsClass"
import { deleteMap, getMap } from "./editMap/mapScript"
import { useEffect, useState } from "react"
import { ArrowLeftFromLineIcon, MapIcon, Plus, Trash } from "lucide-react"
import * as Button from '../../assets/buttons/buttons'

export default function SelectMapToEdit() {
    const [maps, setMaps] = useState<ITableMap[]>([])
    const [reloadMapListTrigger, reloadMapList ] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        setMaps(getMap())
    }, [reloadMapListTrigger])

    return (
        <main className='flex flex-col h-screen w-screen overflow-hidden'>
            <NavBarTop />
            <section className="flex overflow-hidden p-4">
                <Button.Primary color="white" className='max-w-fit' onClick={() => navigate('/home')} ><ArrowLeftFromLineIcon strokeWidth={1} /></Button.Primary>
                <ul className="flex flex-row flex-wrap h-full overflow-scroll justify-start gap-4 p-4">
                    <NewMapCard />
                    {maps.map(mapData => <MapCard mapData={mapData} reloadMapList={reloadMapList} />)}
                </ul>
            </section>
        </main>
    )
}


function MapCard({ mapData,reloadMapList }: { mapData: ITableMap,reloadMapList: React.Dispatch<React.SetStateAction<boolean>>}) {
    const navigate = useNavigate()

    const handleDeleteMap = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{ 
        e.preventDefault()
        e.stopPropagation()
        deleteMap(mapData.id || "")
        reloadMapList((currentValue:boolean) => !currentValue)
    }

    
    
    return (
        <li onClick={() => navigate(`/editMap/${mapData.id}`)} className=' w-60 aspect-[3/4]  group hover:-translate-y-1 hover:cursor-pointer duration-150 rounded-sm bg-linear-45 border border-stone-500
        hover:from-purple-700 hover:via-purple-600/50 hover:to-purple-500/50 hover:border-purple-500 hover:text-white'>
            <div className='p-2'>
                <img src={mapData.image} />
            </div>
            <article className='px-2'>
                <p className="font-semibold">Name: <span className='text-stone-950/70 group-hover:text-white font-normal italic'>{mapData.name}</span></p>
                <p className="font-semibold">Size: <span className='text-stone-950/70 group-hover:text-white font-normal italic'>{mapData.sizeX}x{mapData.sizeY}</span></p>
                <p className="font-semibold">Last Modify: <span className='text-stone-950/70 group-hover:text-white font-normal italic'>{mapData.lastModify && new Date(mapData.lastModify).toLocaleDateString()}</span></p>
                {/* <p className="font-semibold">Description: <span className='text-stone-950/70 font-normal italic'>{mapData.description}</span></p> */}
            </article>
            <button onClick={(e)=> handleDeleteMap(e)} 
            className="flex flex-row gap-2 items-center justify-center w-full mt-2 p-2 hover:cursor-pointer rounded-b-sm">
                <Trash strokeWidth={1} size={15} /> Delete Map
            </button>
        </li>
    )
}

function NewMapCard() {
    const navigate = useNavigate()



    return (
        <li onClick={() => navigate(`/editMap/newMap`)} className='relative flex items-center justify-center overflow-hidden w-60 aspect-[3/4] group hover:-translate-y-1 hover:cursor-pointer duration-150 p-2 rounded-sm bg-linear-45 border border-stone-500
            hover:from-purple-700 hover:via-purple-600/50 hover:to-purple-500/50 hover:border-purple-500 hover:text-white'>
            <MapIcon strokeWidth={.5} size={250} className="absolute z-10 blur-[2px] -left-[45%] top-[25%]  opacity-10" />
            <Plus strokeWidth={1} size={50} />
        </li>
    )
}