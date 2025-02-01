import SquareButton from '../../../../components/buttons'
import * as Modal from '../../../../components/modal'
import * as Form from '../../../../components/form'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapsContext } from '../..'
import { saveMapsInLocalStorage } from '../../../../scripts/localStorage/localStorage'
import { Tile } from '../../classes/tileClasses'

export default function NewMapModal({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [mapName, setMapName] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const { mapList, setMapList } = useContext(MapsContext)
    const navigate = useNavigate()


    const createNewMap = (e: React.FormEvent<HTMLFormElement>) => {
        const MapId = crypto.randomUUID()

        e.preventDefault()
        let newMapList = [...mapList]
        newMapList.push({
            id: MapId,
            name: mapName,
            mapMatrix: {
                floor: Array.from({ length: 35 }, (i, row) => {
                    return Array.from({ length: 35 }, (e, column) => {
                        i = i //solve Vercel Error
                        e = e
                        return new Tile({
                            canvaType: 'floor',
                            paths: [{ name: '', path: [''] }],
                            position: { X: column, Y: row },
                            rotate: 'top',
                            size: { X: 1, Y: 1 },
                            status: 0,
                            variant: 0,
                            blockMatrix: [[0]],
                        })
                    })
                }),
                prop: Array.from({ length: 35 }, (i, row) => {
                    return Array.from({ length: 35 }, (e, column) => {
                        i = i //solve Vercel Error
                        e = e
                        return new Tile({
                            canvaType: 'prop',
                            paths: [{ name: '', path: [''] }],
                            position: { X: column, Y: row },
                            rotate: 'top',
                            size: { X: 1, Y: 1 },
                            status: 0,
                            variant: 0,
                            blockMatrix: [[0]],
                        })
                    })
                }),
                wall: Array.from({ length: 35 }, (i, row) => {
                    return Array.from({ length: 35 }, (e, column) => {
                        i = i //solve Vercel Error
                        e = e
                        return new Tile({
                            canvaType: 'wall',
                            paths: [{ name: '', path: [''] }],
                            position: { X: column, Y: row },
                            rotate: 'top',
                            size: { X: 1, Y: 1 },
                            status: 0,
                            variant: 0,
                            blockMatrix: [[0]],
                        })
                    })
                }),
            },
            picture: imgUrl,
            sizeX: 35,
            sizeY: 35
        })
        saveMapsInLocalStorage({ data: newMapList })
        if (!setMapList) return
        setMapList(newMapList)
        navigate(`create/${MapId}`)

    }



    return (
        <Modal.Container setIsModalOpen={() => setIsModalOpen(false)} title='Novo Mapa'>
            <Form.Container onSubmit={(e: React.FormEvent<HTMLFormElement>) => createNewMap(e)} className='flex-col'>
                <div className='h-72 aspect-[3/4] overflow-hidden rounded-md border border-romo-900 bg-romo-900'>
                    <img src={imgUrl} onErrorCapture={(e) => e.currentTarget.classList.add("opacity-0")} onLoad={(e) => e.currentTarget.classList.remove("opacity-0")} className='object-cover min-w-full min-h-full' />
                </div>
                <Form.InputText name='name' label='Mapa' type='text' required onChange={(e) => setMapName(e.target.value)} />
                <Form.InputText name='ImgUrl' label='Imagem' type='text' onChange={(e) => setImgUrl(e.target.value)} />

                <div className='flex flex-row gap-2 '>
                    <SquareButton type='button' size='lg' variant='default'
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