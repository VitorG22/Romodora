import { useEffect, useState } from "react";
import { Loader, LoaderContainer } from "../../assets/loader/loader";
import NavBarTop from "../../assets/navBar/navBarTop";
import type { ICharacter } from "./charactersClass";
import { ArrowLeftFromLineIcon, Heart, Plus, TrashIcon, UserRound } from "lucide-react";
import * as Button from '../../assets/buttons/buttons'
import { useNavigate } from "react-router-dom";
import { getData, PostData } from "../../scripts/axios";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";


export default function CharactersList() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [characters, setCharacters] = useState<ICharacter[]>([])
    const { isLogged } = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        getUserCharacters()
    }, [isLogged])

    const getUserCharacters = () => {
        setIsLoading(true)
        getData({
            endPoint: 'getUserCharacters',
            onSuccess: (res) => {
                console.log(res)
                setCharacters(res.data)
                setIsLoading(false)
            },
            onError: () => setIsLoading(false)
        })
    }


    return (
        <main className='w-screen h-screen flex flex-col overflow-hidden'>
            {isLoading &&
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            }
            <section className='flex flex-row gap-4 p-4 pb-0 h-full overflow-hidden'>
                <Button.Primary color="white" className='max-w-fit' onClick={() => navigate('/home')} ><ArrowLeftFromLineIcon strokeWidth={1} /></Button.Primary>
                <ul className="flex flex-row justify-start gap-2 h-full flex-wrap overflow-scroll pt-1 pb-10">
                    <button onClick={() => navigate('../edit')} className='relative w-64 h-[29rem] flex items-center justify-center rounded-sm hover:-translate-y-1 duration-150 bg-linear-45
                        from-stone-500/40 via-stone-500/10 to-stone-500/10 border border-stone-500
                        hover:from-purple-700 hover:via-purple-600/50 hover:to-purple-500/50 hover:border-purple-500 hover:text-white'>
                        <UserRound strokeWidth={.5} size={280} className="absolute z-10 blur-[2px] -left-[40%] top-[20%]  opacity-10" />
                        <Plus strokeWidth={1} size={50} />
                    </button>
                    {characters.map(characterData =>
                        <CharactersCard getUserCharacters={getUserCharacters} key={`CharacterCard_${characterData.id}`} CharacterData={characterData} />
                    )
                    }
                </ul>
            </section>
        </main>
    )
}

function CharactersCard({ CharacterData, getUserCharacters }: { CharacterData: ICharacter ,getUserCharacters:()=>void }) {
    const navigate = useNavigate()
    const [isPopOutOpen, setIsPopOutOpen] = useState<boolean>(false)

    const DeleteCharacter = () => {
        setIsPopOutOpen(false)
        PostData({
            data:{characterId: CharacterData.id},
            endPoint: 'deleteCharacter',
            onSuccess: ()=>{
                setIsPopOutOpen(false)
                getUserCharacters()
            },
            onError: ()=>{
                setIsPopOutOpen(false)
            }
        })
    }

    return (
        <>
            <div onClick={() => navigate(`../edit/${CharacterData.id}`)} className='group hover:-translate-y-1 hover:cursor-pointer duration-150 px-2 rounded-sm h-[29rem] bg-linear-45
        from-stone-500/40 via-stone-500/10 to-stone-500/10 border border-stone-500
        hover:from-purple-700 hover:via-purple-600/50 hover:to-purple-500/50 hover:border-purple-500 hover:text-white
        '>
                <article className="flex flex-row justify-between">
                    <h2 className='first-letter:uppercase'>{CharacterData.name}</h2>
                    <p className='italic '>{CharacterData.level}</p>
                </article>
                {CharacterData.picture &&
                    <div className="aspect-[5/6] overflow-hidden w-60 flex justify-center items-center rounded-sm ">
                        <img src={CharacterData.picture} className="w-full h-full object-cover" />
                    </div>
                }
                <article className='pb-6 '>
                    <p>{CharacterData.race} / {CharacterData.class}</p>
                    <ul className='grid grid-cols-2 grid-rows-3'>
                        <li className="flex gap-2"><p className='italic first-letter:uppercase'>charisma:</p><span className='font-semibold'>{CharacterData.attributes.charisma}</span></li>
                        <li className="flex gap-2"><p className='italic first-letter:uppercase'>constitution:</p><span className='font-semibold'>{CharacterData.attributes.constitution}</span></li>
                        <li className="flex gap-2"><p className='italic first-letter:uppercase'>dexterity:</p><span className='font-semibold'>{CharacterData.attributes.dexterity}</span></li>
                        <li className="flex gap-2"><p className='italic first-letter:uppercase'>intelligence:</p><span className='font-semibold'>{CharacterData.attributes.intelligence}</span></li>
                        <li className="flex gap-2"><p className='italic first-letter:uppercase'>strength:</p><span className='font-semibold'>{CharacterData.attributes.strength}</span></li>
                        <li className="flex gap-2"><p className='italic first-letter:uppercase'>wisdom:</p><span className='font-semibold'>{CharacterData.attributes.wisdom}</span></li>
                    </ul>
                    <div className="mt-2">
                        <p className="text-xs flex flex-row items-center gap-1"><Heart strokeWidth={0} fill="red" size={12} />{CharacterData.life}/{CharacterData.maxLife}</p>
                        <div className='relative'>
                            <div className='rounded-full border border-red-500 w-full h-2'></div>
                            <div style={{ width: `${100 / CharacterData.maxLife * CharacterData.life}%` }} className='absolute top-0 left-0 rounded-full bg-linear-to-r from-red-500 to-red-600 w-full h-2'></div>
                        </div>
                    </div>
                </article>
                <button onClick={(e) => {e.stopPropagation();setIsPopOutOpen(true)}} className="h-[0px] hidden overflow-hidden flex-row items-center justify-center w-full border-2 rounded-b-md border-t-0  bg-linear-30 from-stone-500 to-stone-600 py-1 text-stone-300 text-sm 
            group-has-hover:flex group-has-hover:h-auto hover:cursor-pointer">
                    <TrashIcon strokeWidth={1} size={20} />
                    Delete
                </button>
            </div>
            {isPopOutOpen && 
            <section className='absolute top-0 left-0 w-screen h-screen bg-stone-900/60 flex justify-center items-center'>
                <div className='flex flex-col items-end  bg-stone-900 p-4 text-stone-300 w-fit max-w-1/3 gap-2'>
                    <p>Are you sure you want to delete <span className='text-purple-500 italic'>{CharacterData.name}</span> ? All data will be lost and cannot be recovered.</p>
                    <div className='flex flex-row gap-2 w-1/2'>
                    <Button.Secondary color="white" onClick={DeleteCharacter}>Delete</Button.Secondary>
                    <Button.Primary color='white' onClick={()=> setIsPopOutOpen(false)}>Cancel</Button.Primary>
                    </div>
                </div>
            </section>
            }
        </>
    )
}