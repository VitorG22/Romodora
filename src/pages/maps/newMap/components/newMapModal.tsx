import SquareButton from '../../../../components/buttons'
import * as Modal from '../../../../components/modal'
import * as Form from '../../../../components/form'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapsContext } from '../..'
import { saveMapsInLocalStorage } from '../../../../scripts/localStorage/localStorage'

export default function NewMapModal({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [mapName, setMapName] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const {mapList, setMapList} = useContext(MapsContext)
    const navigate = useNavigate()
    
    
    const createNewMap = (e:React.FormEvent<HTMLFormElement>) =>{
        const MapId = crypto.randomUUID()
        
        e.preventDefault()
        let newMapList = [...mapList]
        newMapList.push({
            id: MapId,
            name:mapName,
            mapStructureData: [],
            picture: imgUrl,
            sizeX:25,
            sizeY: 25
        })
        saveMapsInLocalStorage({data: newMapList})
        if(!setMapList)return
        setMapList(newMapList)
        navigate(`create/${MapId}`)
        
    } 
    


    return (
        <Modal.Container setIsModalOpen={() => setIsModalOpen(false)} title='Novo Mapa'>
            <Form.Container onSubmit={(e:React.FormEvent<HTMLFormElement>) => createNewMap(e)}>
                <div className='h-72 aspect-[3/4] overflow-hidden rounded-md border border-lagun-500'>
                    <img src={imgUrl} onErrorCapture={(e) => e.currentTarget.classList.add("opacity-0")} onLoad={(e) => e.currentTarget.classList.remove("opacity-0")} className='object-cover min-w-full min-h-full' />
                </div>
                <Form.InputText name='name' label='Mapa' type='text' required onChange={(e)=> setMapName(e.target.value)} />
                <Form.InputText name='ImgUrl' label='Imagem' type='text' onChange={(e) => setImgUrl(e.target.value)} />

                <div className='flex flex-row gap-2 '>
                    <SquareButton type='button' size='lg' variant='ghost'
                        onClick={() => setIsModalOpen(false)}>
                        Cancelar
                    </SquareButton>
                    <SquareButton type='submit' size='lg' variant='secondary' >
                        Criar
                    </SquareButton>
                </div>
            </Form.Container>
        </Modal.Container>
    )

}