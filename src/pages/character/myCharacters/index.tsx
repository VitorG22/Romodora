import { useContext, useEffect } from "react";
import { AppContext } from "../../../AppContext";
import { PostData } from "../../../scripts/api/postData";
import { ICharacterData } from "../../../interfaces";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyCharacters() {
    const { characters, setCharacters, token } = useContext(AppContext)

    useEffect(() => {
        (async () => {
            const charactersReturn = await PostData({
                route: '/character',
                data: { token: token }
            })
            if (charactersReturn.data.status == 'success' && setCharacters) {
                console.log(charactersReturn.data.result)
                setCharacters(charactersReturn.data.result)
            }
        })()
    }, [])

    return (
        <section className='flex flex-col gap-2 w-full'>
            <h1 className='pt-4 text-3xl font-semibold  text-romo-500 italic px-4'>
                Characters
                <hr className='border-romo-500'/>
            </h1>
            <ul className='flex flex-row flex-wrap gap-2 py-4 px-4 max-h-full h-fit overflow-y-scroll'>
                <Link to={'createCharacter'} className='bg-romo-500/70 flex items-center hover:bg-romo-500 rounded-md'>
                    <div className='flex justify-center text-romo-600 items-center h-64 aspect-[3/4]  overflow-hidden '>
                        <Plus size={40} strokeWidth={1} />
                    </div>
                </Link>
                {characters?.map(characterData => <li><CharacterCard characterData={characterData} key={`Character_${characterData.id}`} /></li>)}
            </ul>
        </section>

    )
}
function CharacterCard({ characterData }: { characterData: ICharacterData }) {

    return (
        <section className='flex flex-col overflow-hidden rounded-md hover:bg-romo-500'>
            <div className='h-64 aspect-[3/4] overflow-hidden'>
                <img src={characterData.picture}
                    className='object-cover min-w-full min-h-full'
                />

            </div>
            <div className='flex justify-between items-start p-3 bottom-0 left-0 text-romo-200 w-full'>
                <article className="flex flex-col items-start">
                    <p className="text-md font-thin">{characterData.name}</p>
                    <ul className="flex flex-row gap-1 text-xs font-thin  italic ">
                        <li className='text-romo-100 '>{characterData.abilityScores.strength.baseScore}</li>
                        <li className='text-romo-100 '>{characterData.abilityScores.dexterity.baseScore}</li>
                        <li className='text-romo-100 '>{characterData.abilityScores.charisma.baseScore}</li>
                        <li className='text-romo-100 '>{characterData.abilityScores.intelligence.baseScore}</li>
                        <li className='text-romo-100 '>{characterData.abilityScores.wisdom.baseScore}</li>
                        <li className='text-romo-100 '>{characterData.abilityScores.constitution.baseScore}</li>
                    </ul>
                </article>
                <article className="flex flex-col items-end">
                    <p className="text-md font-thin text-romo-600">{characterData.class}</p>
                    <p className="text-xs font-thin italic text-romo-600">{characterData.subClass}</p>
                </article>
            </div>
        </section>
    )
}