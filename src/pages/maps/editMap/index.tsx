import { useNavigate, useParams } from 'react-router-dom'
import * as Button from '../../../assets/buttons/buttons'
import { ArrowLeftFromLineIcon } from 'lucide-react'
import NavBarTop from '../../../assets/navBar/navBarTop'
import { TableMapEdit, TableMapGame } from './mapsClass'
import TileGallery, { type ITile } from './tileGallery'
import Table from './table'
import { useEffect, useState } from 'react'
import type { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'




export default function EditMap() {
    const navigate = useNavigate()
    const mapsList = useSelector(((state: RootState) => state.maps))
    const [tableObject, setTableObject] = useState<TableMapEdit>()
    const [selectedTile, setSelectedTile] = useState<ITile | null>(null)
    const [tileDirection, setTileDirection] = useState<'top' | 'left' | 'bottom' | 'right'>('top')
    const { mapId } = useParams()

    const reRender = (newObject: TableMapEdit | TableMapGame) => {
        setTableObject(new TableMapEdit(newObject))
    }

    useEffect(() => {
        try {
            if (!mapId) throw new Error()

            let mapDataCopy = structuredClone(mapsList.find(mapData=> mapData.id == mapId))
            if (!mapDataCopy) throw new Error()

            let newTableObject = new TableMapEdit({
                ...mapDataCopy,
                reRender: reRender
            })

            setTableObject(newTableObject)
        } catch (error) {
            console.log(error)
            setTableObject(new TableMapEdit({
                name: 'New Map',
                sizeX: 30,
                sizeY: 30,
                reRender: reRender,
            }))
        }

    }, [])



    return (
        <main className='flex flex-col w-full h-screen'>
            <NavBarTop />
            <div className='w-full h-full flex flex-row  relative overflow-hidden'>
                <Button.Primary color="white" className='absolute max-w-fit bg-stone-300 p-2 rounded-md z-20 m-4 border border-stone-900/40' onClick={() => navigate('/maps')} ><ArrowLeftFromLineIcon strokeWidth={1} /></Button.Primary>
                <section className='flex justify-center w-2/3 h-full relative top-0 left-0'>
                    {tableObject && <Table tileDirection={tileDirection} selectedTile={selectedTile} mapObject={tableObject} />}
                </section>
                <section className='w-1/3'>
                    <TileGallery setTileDirection={setTileDirection} tileDirection={tileDirection} selectedTile={selectedTile} setSelectedTile={setSelectedTile} />
                </section>
            </div>
        </main>
    )
}