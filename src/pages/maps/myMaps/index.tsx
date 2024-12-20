import { useContext, useState } from "react"
import { IMap, MapsContext } from ".."
import { Plus } from "lucide-react"
import NewMapModal from "../newMap/components/newMapModal"
import { useNavigate } from "react-router-dom"
import { saveMapsInLocalStorage } from "../../../scripts/localStorage/localStorage"
import SquareButton from "../../../components/buttons"

export default function MyMaps() {
    const { mapList } = useContext(MapsContext)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <section className='flex flex-col gap-2 w-full'>
            <h1 className='pt-4 text-lg text-lagun-200/50 px-4'>
                Mapas
                <hr className='border-lagun-200/50' />
            </h1>
            <ul className='flex flex-row flex-wrap gap-2 h-fit p-4'>
                <div className='flex bg-lagun-200/5 hover:bg-lagun-200/25 rounded-md justify-center text-lagun-200 items-center h-64 aspect-[3/4]  overflow-hidden hover:cursor-pointer'
                    onClick={() => setIsModalOpen(true)}>
                    <Plus size={40} strokeWidth={1} />
                </div>
                {mapList.map(mapData => <MapCard key={`cardMap_${mapData.id}`} mapData={mapData} />)}
            </ul>
            {isModalOpen && <NewMapModal setIsModalOpen={setIsModalOpen} />}
        </section>
    )
}


function MapCard({ mapData }: { mapData: IMap }) {
    const navigate = useNavigate()
    const { mapList, setMapList } = useContext(MapsContext)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const deleteMap = () => {
        let mapIndex = mapList.findIndex(element => element.id == mapData.id)
        let newMapList = [...mapList]
        if (mapIndex == -1 || !setMapList) return

        newMapList.splice(mapIndex, 1)

        saveMapsInLocalStorage({
            data: newMapList
        })
        setMapList(newMapList)
    }


    return (
        <>
            <main className="group relative">
                <section className='flex flex-col overflow-hidden rounded-md bg-lagun-200/5 hover:bg-lagun-200/25 hover:cursor-pointer'>
                    <div onClick={() => navigate(`create/${mapData.id}`)} className='h-64 aspect-[3/4] overflow-hidden'>
                        <img src={mapData.picture} className='object-cover min-w-full min-h-full' />
                    </div>
                    <div className='flex justify-between items-start p-3 bottom-0 left-0 text-white w-full'>
                        <article className="flex flex-col items-start">
                            <p className="text-md font-thin ">{mapData.name}</p>
                            <div className="flex flex-row gap-1 text-xs font-thin italic ">
                                <p className='text-lagun-500'>Size:</p>
                                <p className="text-white/70">{mapData.sizeX}x{mapData.sizeY}</p>
                            </div>
                        </article>
                    </div>
                </section>
                <button onClick={() => setIsAlertOpen(true)} className="absolute right-2 top-2 px-4 py-2 rounded-md font-semibold text-xs bg-red-600 text-white opacity-0 group-hover:opacity-100 ">
                    Delete
                </button>
            </main>
            {isAlertOpen &&
            <main className='w-screen h-screen absolute bg-black/70 backdrop-blur-sm top-0 left-0 flex justify-center items-center'>

                <div className='absolute left bg-lagun-900 p-4 rounded-md flex flex-col gap-4'>

                    <article>
                        <h1 className='text-lg '>Deseja Deletar <span className='font-semibold text-lagun-500 italic' >{mapData.name}</span>  ?</h1>
                        <p className='text-md italic font-thin'>não sera possivel recuperar estes dados futuramente.</p>
                    </article>
                    <div className='flex flex-row gap-2 place-self-end'>
                        <SquareButton size="lg" variant="secondary" onClick={()=> setIsAlertOpen(false)} >Cancelar</SquareButton>
                        <SquareButton size="lg" variant="ghost" onClick={deleteMap} >Deletar</SquareButton>
                        
                    </div>
                    
                </div>
            </main>
            }
        </>

    )
}