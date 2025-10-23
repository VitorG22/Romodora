import { useNavigate } from 'react-router-dom'
import * as Button from '../../assets/buttons/buttons'
import { ArrowLeftFromLineIcon } from 'lucide-react'
import NavBarTop from '../../assets/navBar/navBarTop'
import { TableMap, type ITableMap } from './mapsClass'
import TileGallery from './tileGallery'

export default function Maps() {
    const navigate = useNavigate()
    
    const TableMapData:ITableMap = ({
        name: 'teste',
        sizeX: 20,
        sizeY: 20,
    })





    return (
        <main className='flex flex-col w-full h-screen'>
            <NavBarTop />
            <div className='w-full h-full flex flex-row  relative overflow-hidden'>

                <Button.Primary color="white" className='absolute max-w-fit bg-stone-300 p-2 rounded-md z-20 m-4 border border-stone-900/40' onClick={() => navigate('/home')} ><ArrowLeftFromLineIcon strokeWidth={1} /></Button.Primary>
                <section className='flex justify-center w-full h-full overflow-hidden relative top-0 left-0'>
                    <TableMap {...TableMapData}/>
                </section>
                <TileGallery/>
            </div>
        </main>
    )
}