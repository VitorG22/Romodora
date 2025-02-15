import { useContext, useEffect, useState } from "react"
import * as Form from "../../../components/form"
import { ICharacterData } from "../../../interfaces"
import AbilityPoints from "./abilityPoints"
import SquareButton from "../../../components/buttons"
import { useNavigate, useParams } from "react-router-dom"
import { PostData } from "../../../scripts/api/postData"
import { AppContext } from "../../../AppContext" 
import { Error } from "../../../components/toasters"

let defaultcharacterData: ICharacterData = {
    name: '',
    class: '',
    subClass: '',
    race: '',
    subRace: '',
    picture: '',
    id: '',
    health: {
        maxHealthTotal: 0,
        maxHealthBase: 0,
        maxHealthBonus: 0,
        currentHealth: 0,
        currentHealthBonus: 0,
    },
    bag: [],
    abilityScores: {
        charisma: {
            totalScore: 0,
            baseScore: 0,
            modifier: 0,
            bonus: 0,
            stackingBonus: 0,
            setScore: 0,
        },
        constitution: {
            totalScore: 0,
            baseScore: 0,
            modifier: 0,
            bonus: 0,
            stackingBonus: 0,
            setScore: 0,
        },
        dexterity: {
            totalScore: 0,
            baseScore: 0,
            modifier: 0,
            bonus: 0,
            stackingBonus: 0,
            setScore: 0,
        },
        intelligence: {
            totalScore: 0,
            baseScore: 0,
            modifier: 0,
            bonus: 0,
            stackingBonus: 0,
            setScore: 0,
        },
        strength: {
            totalScore: 0,
            baseScore: 0,
            modifier: 0,
            bonus: 0,
            stackingBonus: 0,
            setScore: 0,
        },
        wisdom: {
            totalScore: 0,
            baseScore: 0,
            modifier: 0,
            bonus: 0,
            stackingBonus: 0,
            setScore: 0,
        },
    }
}

interface ISubRaces {
    subRaceKey: string,
    subRaceName: {
        en: string,
        ptbr: string
    }
}

export default function CreateCharacter() {
    const {CharacterId} = useParams()
    const { token, characters} = useContext(AppContext)
    const [characterData, setCharacterData] = useState<ICharacterData>(defaultcharacterData)
    const [selectedSubRacesList, setSelectedSubRacesList] = useState<ISubRaces[] | undefined>()
    const navigate = useNavigate()


    const setCharacterByKey = ({ keyName, value }: {
        keyName: 'name' | 'class' | 'picture' | 'subClass' | 'race' | 'subRace',
        value: string
    }) => {
        setCharacterData({
            ...characterData,
            [keyName]: value
        })
    }

    useEffect(() => {
        setSelectedSubRacesList(CharacterRaceList.find((element) => element.raceKey == characterData.race)?.subRace)
        setCharacterByKey({ keyName: 'subRace', value: CharacterRaceList.find((element) => element.raceKey == characterData.race)?.subRace[0]?.subRaceKey || "" })
    }, [characterData.race])

    useEffect(() => {
        if(CharacterId){
            console.log(characters)
            let selectedCharacter = characters.find(element => element.id == CharacterId) 
            if(!selectedCharacter)return
            setCharacterData(selectedCharacter)
        }else{
            setSelectedSubRacesList(CharacterRaceList[0].subRace)
            setCharacterData({
                ...characterData,
                class: CharacterClassList[0].classKey,
                race: CharacterRaceList[0].raceKey,
                subRace: CharacterRaceList[0].subRace[0].subRaceKey,
            })
        }
    }, [])

    const handleSubmitData = async () => {
        console.log(characterData)
        let res = undefined
        if(CharacterId){
            res = await PostData({
                route: '/updateCharacter',
                data: {
                    token: token,
                    characterData: characterData
                }
            })
        }else{
            res = await PostData({
                route: '/createCharacter',
                data: {
                    token: token,
                    characterData: characterData
                }
            })
        }
        if (res.data.status == 'success') {
            navigate('../')
        } else {
            Error({
                message: res.data.message
            })
        }

    }


    return (
        <main className='w-full h-full overflow-y-scroll'>
            <Form.Container className='bg-transparent h-full flex flex-col p-4'>
                <section className='flex flex-row gap-2 h-full'>
                    <div className='h-72 aspect-[3/4] overflow-hidden border border-romo-500 bg-romo-500'>
                        <img src={characterData.picture} onErrorCapture={(e) => e.currentTarget.classList.add("opacity-0")} onLoad={(e) => e.currentTarget.classList.remove("opacity-0")} className='object-cover min-w-full min-h-full' />
                    </div>
                    <div className='flex h-72 flex-col justify-between'>
                        <Form.InputText type='text' label="Nome" name='name' value={characterData.name} onChange={(e) => setCharacterByKey({ keyName: "name", value: e.target.value })} />
                        <Form.InputSelect label='Raça' defaultValue='' value={characterData.race} onChange={(e) => setCharacterByKey({ keyName: "race", value: e.target.value })}>
                            {CharacterRaceList.map(element =>
                                <Form.SelectOption OptionKey={element.raceKey} name={element.raceName.ptbr} />
                            )}
                        </Form.InputSelect>
                        {selectedSubRacesList &&
                            <Form.InputSelect label='Sub Raça' disabled={selectedSubRacesList.length <= 0} value={characterData.subRace || undefined} onChange={(e) => setCharacterByKey({ keyName: "subRace", value: e.target.value })}>
                                {selectedSubRacesList?.map(element =>
                                    <Form.SelectOption OptionKey={element.subRaceKey} name={element.subRaceName.ptbr} />
                                )}
                            </Form.InputSelect>
                        }
                        <Form.InputSelect label='Classe' value={characterData.subClass || undefined} onChange={(e) => setCharacterByKey({ keyName: "class", value: e.target.value })}>
                            {CharacterClassList.map(element =>
                                <Form.SelectOption OptionKey={element.classKey} name={element.className.ptbr}  />
                            )}
                        </Form.InputSelect>
                        <Form.InputText type='text' label="Link da Imagem" value={characterData.picture} onChange={(e) => setCharacterByKey({ keyName: 'picture', value: e.target.value })} />
                    </div>
                </section>
                <div className='flex flex-row justify-between h-full'>
                    <section className='flex flex-col gap-2 h-fit w-30'>
                        <AbilityPoints label="Força" AbilityKey="strength" characterData={characterData} setCharacterData={setCharacterData} />
                        <AbilityPoints label="Carisma" AbilityKey='charisma' characterData={characterData} setCharacterData={setCharacterData} />
                        <AbilityPoints label="Sabedoria" AbilityKey='wisdom' characterData={characterData} setCharacterData={setCharacterData} />
                        <AbilityPoints label="Inteligencia" AbilityKey='intelligence' characterData={characterData} setCharacterData={setCharacterData} />
                        <AbilityPoints label="Destreza" AbilityKey='dexterity' characterData={characterData} setCharacterData={setCharacterData} />
                        <AbilityPoints label="Constituição" AbilityKey='constitution' characterData={characterData} setCharacterData={setCharacterData} />
                    </section>
                </div>
                    <section className='flex flex-row w-full items-end justify-end gap-2'>
                        <SquareButton size="md" type="button" variant="default" onClick={() => navigate('../')}>Cancelar</SquareButton>
                        {CharacterId?(
                            <SquareButton size="md" type="button" variant="secondary" onClick={handleSubmitData}>Salvar</SquareButton>
                        ):(
                        <SquareButton size="md" type="button" variant="secondary" onClick={handleSubmitData}>Criar</SquareButton>
                        )}
                    </section>
            </Form.Container>
        </main>
    )
}

const CharacterClassList = [
    {
        classKey: 'barbarian',
        className: {
            en: 'Barbarian',
            ptbr: 'Barbaro'
        },
        healthDice: 12,
        proficiency: {
            strength: true,
            dexterity: false,
            constitution: true,
            intelligence: false,
            wisdom: false,
            charisma: false,
        }
    },
    {
        classKey: 'bard',
        className: {
            en: 'Bard',
            ptbr: 'Bardo'
        },
        healthDice: 8,
        proficiency: {
            strength: false,
            dexterity: true,
            constitution: false,
            intelligence: false,
            wisdom: false,
            charisma: true,
        }
    },
    {
        classKey: 'warlock',
        className: {
            en: 'Warlock',
            ptbr: 'Bruxo'
        },
        healthDice: 8,
        proficiency: {
            strength: false,
            dexterity: false,
            constitution: false,
            intelligence: false,
            wisdom: true,
            charisma: true,
        }
    },
    {
        classKey: 'cleric',
        className: {
            en: 'Cleric',
            ptbr: 'Clerigo'
        },
        healthDice: 8,
        proficiency: {
            strength: false,
            dexterity: false,
            constitution: false,
            intelligence: false,
            wisdom: true,
            charisma: true,
        }
    },
    {
        classKey: 'druid',
        className: {
            en: 'Druid',
            ptbr: 'Druida'
        },
        healthDice: 8,
        proficiency: {
            strength: false,
            dexterity: false,
            constitution: false,
            intelligence: true,
            wisdom: true,
            charisma: false,
        }
    },
    {
        classKey: 'sorcerer',
        className: {
            en: 'Sorcerer',
            ptbr: 'Feiticeiro'
        },
        healthDice: 6,
        proficiency: {
            strength: false,
            dexterity: false,
            constitution: true,
            intelligence: false,
            wisdom: false,
            charisma: true,
        }
    },
    {
        classKey: 'fighter',
        className: {
            en: 'Fighter',
            ptbr: 'Guerreiro'
        },
        healthDice: 10,
        proficiency: {
            strength: true,
            dexterity: false,
            constitution: true,
            intelligence: false,
            wisdom: false,
            charisma: false,
        }
    },
    {
        classKey: 'rogue',
        className: {
            en: 'Rogue',
            ptbr: 'Ladino'
        },
        healthDice: 8,
        proficiency: {
            strength: false,
            dexterity: true,
            constitution: false,
            intelligence: true,
            wisdom: false,
            charisma: false,
        }
    },
    {
        classKey: 'wizard',
        className: {
            en: 'Wizard',
            ptbr: 'Mago'
        },
        healthDice: 6,
        proficiency: {
            strength: false,
            dexterity: false,
            constitution: false,
            intelligence: true,
            wisdom: true,
            charisma: false,
        }
    },
    {
        classKey: 'monk',
        className: {
            en: 'Monk',
            ptbr: 'Monge'
        },
        healthDice: 8,
        proficiency: {
            strength: true,
            dexterity: true,
            constitution: false,
            intelligence: false,
            wisdom: false,
            charisma: false,
        }
    },
    {
        classKey: 'paladin',
        className: {
            en: 'Paladin',
            ptbr: 'Paladino'
        },
        healthDice: 10,
        proficiency: {
            strength: false,
            dexterity: false,
            constitution: false,
            intelligence: false,
            wisdom: true,
            charisma: true,
        }
    },
    {
        classKey: 'ranger',
        className: {
            en: 'Ranger',
            ptbr: 'Patrulheiro'
        },
        healthDice: 10,
        proficiency: {
            strength: true,
            dexterity: true,
            constitution: false,
            intelligence: false,
            wisdom: false,
            charisma: false,
        }
    },
]

const CharacterRaceList = [
    {
        raceKey: 'dwarf',
        raceName: {
            en: 'Dwarf',
            ptbr: 'Anão'
        },
        hitPoints: {
            base: 0,
            bonus: 0
        },
        subRace: [
            {
                subRaceKey: 'hillDwarf',
                subRaceName: {
                    en: 'Hill Dwarf',
                    ptbr: 'Anão da Colina',
                }
            },
            {
                subRaceKey: 'mountainDwarf',
                subRaceName: {
                    en: 'Mountain Dwarf',
                    ptbr: 'Anão da Montanha',
                }
            },
        ]
    },
    {
        raceKey: 'elf',
        raceName: {
            en: 'Elf',
            ptbr: 'Elfo'
        },
        hitPoints: {
            base: 0,
            bonus: 0
        },
        subRace: [
            {
                subRaceKey: 'highElf',
                subRaceName: {
                    en: 'High Elf',
                    ptbr: 'Alto Elfo',
                }
            },
            {
                subRaceKey: 'woodElf',
                subRaceName: {
                    en: 'Wood Elf',
                    ptbr: 'Elfo da Floresta',
                }
            },
            {
                subRaceKey: 'drow',
                subRaceName: {
                    en: 'Drow',
                    ptbr: 'Elfo Negro (Drow)',
                }
            },
        ]
    },
    {
        raceKey: 'halfling',
        raceName: {
            en: 'Halfling',
            ptbr: 'Halfling'
        },
        hitPoints: {
            base: 0,
            bonus: 0
        },
        subRace: [
            {
                subRaceKey: 'lightFoot',
                subRaceName: {
                    en: 'Light Foot',
                    ptbr: 'Pés Leves',
                }
            },
            {
                subRaceKey: 'stout',
                subRaceName: {
                    en: 'Stout',
                    ptbr: 'Robusto',
                }
            },
        ]
    },
    {
        raceKey: 'human',
        raceName: {
            en: 'Human',
            ptbr: 'Humano'
        },
        hitPoints: {
            base: 0,
            bonus: 0
        },
        subRace: [
            {
                subRaceKey: 'arcticHuman',
                subRaceName: {
                    en: 'Arctic Human',
                    ptbr: 'Humano do Artico',
                }
            },
            {
                subRaceKey: 'desertHuman',
                subRaceName: {
                    en: 'Desert Human',
                    ptbr: 'Humano do Deserto',
                }
            },
            {
                subRaceKey: 'coastalHuman',
                subRaceName: {
                    en: 'Coastal Human',
                    ptbr: 'Humano do Litoral',
                }
            },
            {
                subRaceKey: 'forestHuman',
                subRaceName: {
                    en: 'Forest Human',
                    ptbr: 'Humano da Floresta',
                }
            },
            {
                subRaceKey: 'grasslandHuman',
                subRaceName: {
                    en: 'Grassland Human',
                    ptbr: 'Humano da Pradaria',
                }
            },
            {
                subRaceKey: 'jungleHuman',
                subRaceName: {
                    en: 'Jungle Human',
                    ptbr: 'Humano da Selva',
                }
            },
            {
                subRaceKey: 'mountainHuman',
                subRaceName: {
                    en: 'Mountain Human',
                    ptbr: 'Humano da Montanha',
                }
            },
            {
                subRaceKey: 'swampHuman',
                subRaceName: {
                    en: 'Swamp Human',
                    ptbr: 'Humano do Pantano',
                }
            },
            {
                subRaceKey: 'underdarkHuman',
                subRaceName: {
                    en: 'Underdark Human',
                    ptbr: 'Human do Subterrâneo',
                }
            },
        ]
    },
    {
        raceKey: 'dragonBorn',
        raceName: {
            en: 'Dragon Born',
            ptbr: 'Draconato'
        },
        hitPoints: {
            base: 0,
            bonus: 0
        },
        subRace: []
    },
    {
        raceKey: 'gnome',
        raceName: {
            en: 'Gnome',
            ptbr: 'Gnomo'
        },
        hitPoints: {
            base: 0,
            bonus: 0
        },
        subRace: [
            {
                subRaceKey: 'forestGnome',
                subRaceName: {
                    en: 'Forest Gnome',
                    ptbr: 'Gnomo da Floresta',
                }
            },
            {
                subRaceKey: 'rockGnome',
                subRaceName: {
                    en: 'Rock Gnome',
                    ptbr: 'Gnomo das Rochas',
                }
            },
        ]
    },
    {
        raceKey: 'halfElf',
        raceName: {
            en: 'Half Elf',
            ptbr: 'Meio-Elfo'
        },
        hitPoints: {
            base: 0,
            bonus: 0
        },
        subRace: []
    },
    {
        raceKey: 'halfOrc',
        raceName: {
            en: 'Half Orc',
            ptbr: 'Meio-Orc'
        },
        hitPoints: {
            base: 0,
            bonus: 0
        },
        subRace: []
    },
    {
        raceKey: 'tiefling',
        raceName: {
            en: 'Tiefling',
            ptbr: 'Tiefling'
        },
        hitPoints: {
            base: 0,
            bonus: 0
        },
        subRace: []
    },
]
