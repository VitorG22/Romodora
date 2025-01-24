import { useContext, useEffect } from 'react'
import * as Modal from '../../../../components/modal'
import { AppContext } from '../../../../AppContext'
import { PostData } from '../../../../scripts/api/postData'

export default function TradeCharacterModal({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const {socket, characters, setCharacters, token, partyData} = useContext(AppContext)

    useEffect(() => {
        getCharacters()
    }, [])

    async function getCharacters() {
        if (!setCharacters) {
            return
        }
        const characterReturn = await PostData({
            route: '/character',
            data: {
                token: token
            }
        })
        console.log(characterReturn)
        if (characterReturn.data.status == 'success') {
            setCharacters(characterReturn.data.result)
        }
    }

    const setUserSelectedCharacter = (characterId:string) =>{
        setIsModalOpen(false)
        if(!socket)return

        socket?.emit('setSelectedCharacter', {
            partyCode: partyData?.partyCode,
            characterId: characterId
        })
    }



    return (
        <Modal.Container title='Seleção de Personagem' setIsModalOpen={setIsModalOpen}>
            <ul>
                {characters?.map(element =>
                    <li>
                        <section onClickCapture={()=> setUserSelectedCharacter(element.id)}
                        className='flex flex-row gap-2 hover:bg-romo-500 hover:cursor-pointer  py-2  pl-2 pr-4'>
                            <div className='flex aspect-square overflow-hidden'>
                                <img src={element.picture} className='h-12 w-12 object-cover'></img>
                            </div>
                            <div className='flex flex-row w-48 justify-between'>
                                <article className=''>
                                    <h1 className='text-romo-100'>{element.name}</h1>
                                    <p className='text-romo-200 text-xs italic'>{element.class}</p>
                                </article>
                                <article className='text-end'>
                                    <h1 className='text-romo-100'>{element.race}</h1>
                                    <p className='text-romo-200 text-xs italic'>{element.subRace}</p>
                                </article>
                            </div>
                        </section>
                    </li>
                )}
            </ul>
        </Modal.Container>
    )
}