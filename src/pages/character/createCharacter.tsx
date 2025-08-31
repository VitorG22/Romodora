import { getData, PostData } from "../../scripts/axios"
import * as Input from '../../assets/inputs/inputs'
import * as Button from '../../assets/buttons/buttons'
import { useEffect, useState } from "react"
import { Trash } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import type { ICharacter } from "./charactersClass"


const classesValues = [
    {
        "name": "Barbarian",
        "subclasses": [
            "Path of the Ancestral Guardian",
            "Path of the Battlerager",
            "Path of the Beast",
            "Path of the Berserker",
            "Path of the Storm Herald",
            "Path of the Totem Warrior",
            "Path of Wild Magic",
            "Path of the Zealot"
        ]
    },
    {
        "name": "Bard",
        "subclasses": [
            "College of Creation",
            "College of Eloquence",
            "College of Glamour",
            "College of Lore",
            "College of Spirits",
            "College of Swords",
            "College of Valor",
            "College of Whispers"
        ]
    },
    {
        "name": "Cleric",
        "subclasses": [
            "Arcana Domain",
            "Death Domain",
            "Forge Domain",
            "Grave Domain",
            "Knowledge Domain",
            "Life Domain",
            "Light Domain",
            "Nature Domain",
            "Order Domain",
            "Peace Domain",
            "Tempest Domain",
            "Trickery Domain",
            "Twilight Domain",
            "War Domain"
        ]
    },
    {
        "name": "Druid",
        "subclasses": [
            "Circle of Dreams",
            "Circle of the Land",
            "Circle of the Moon",
            "Circle of the Shepherd",
            "Circle of Spores",
            "Circle of Stars",
            "Circle of Wildfire"
        ]
    },
    {
        "name": "Fighter",
        "subclasses": [
            "Arcane Archer",
            "Banneret (Purple Dragon Knight)",
            "Battle Master",
            "Cavalier",
            "Champion",
            "Echo Knight",
            "Eldritch Knight",
            "Psi Warrior",
            "Rune Knight",
            "Samurai"
        ]
    },
    {
        "name": "Monk",
        "subclasses": [
            "Way of the Ascendant Dragon",
            "Way of the Astral Self",
            "Way of the Drunken Master",
            "Way of the Four Elements",
            "Way of the Kensei",
            "Way of Mercy",
            "Way of the Open Hand",
            "Way of Shadow",
            "Way of the Sun Soul"
        ]
    },
    {
        "name": "Paladin",
        "subclasses": [
            "Oath of the Ancients",
            "Oath of Conquest",
            "Oath of the Crown",
            "Oath of Devotion",
            "Oath of Glory",
            "Oath of Redemption",
            "Oath of Vengeance",
            "Oath of the Watchers",
            "Oathbreaker"
        ]
    },
    {
        "name": "Ranger",
        "subclasses": [
            "Beast Master",
            "Drakewarden",
            "Fey Wanderer",
            "Gloom Stalker",
            "Horizon Walker",
            "Hunter",
            "Monster Slayer",
            "Swarmkeeper"
        ]
    },
    {
        "name": "Rogue",
        "subclasses": [
            "Arcane Trickster",
            "Assassin",
            "Inquisitive",
            "Mastermind",
            "Phantom",
            "Scout",
            "Soulknife",
            "Swashbuckler",
            "Thief"
        ]
    },
    {
        "name": "Sorcerer",
        "subclasses": [
            "Aberrant Mind",
            "Clockwork Soul",
            "Divine Soul",
            "Draconic Bloodline",
            "Lunar Sorcery",
            "Shadow Magic",
            "Storm Sorcery",
            "Wild Magic"
        ]
    },
    {
        "name": "Warlock",
        "subclasses": [
            "The Archfey",
            "The Celestial",
            "The Fathomless",
            "The Fiend",
            "The Genie",
            "The Great Old One",
            "The Hexblade",
            "The Undead",
            "The Undying"
        ]
    },
    {
        "name": "Wizard",
        "subclasses": [
            "Bladesinging",
            "Chronurgy Magic",
            "Graviturgy Magic",
            "Order of Scribes",
            "School of Abjuration",
            "School of Conjuration",
            "School of Divination",
            "School of Enchantment",
            "School of Evocation",
            "School of Illusion",
            "School of Necromancy",
            "School of Transmutation",
            "War Magic"
        ]
    },
    {
        "name": "Artificer",
        "subclasses": [
            "Alchemist",
            "Armorer",
            "Artillerist",
            "Battle Smith"
        ]
    }
]

const racesValues = [
    {
        "name": "Aarakocra",
        "subraces": []
    },
    {
        "name": "Aasimar",
        "subraces": [
            "Fallen",
            "Protector",
            "Scourge"
        ]
    },
    {
        "name": "Bugbear",
        "subraces": []
    },
    {
        "name": "Centaur",
        "subraces": []
    },
    {
        "name": "Changeling",
        "subraces": []
    },
    {
        "name": "Dragonborn",
        "subraces": [
            "Chromatic",
            "Draconblood",
            "Gem",
            "Metallic",
            "Ravenite"
        ]
    },
    {
        "name": "Dwarf",
        "subraces": [
            "Hill Dwarf",
            "Mountain Dwarf",
            "Duergar (Gray Dwarf)"
        ]
    },
    {
        "name": "Elf",
        "subraces": [
            "High Elf",
            "Wood Elf",
            "Drow (Dark Elf)",
            "Eladrin",
            "Sea Elf",
            "Shadar-kai"
        ]
    },
    {
        "name": "Fairy",
        "subraces": []
    },
    {
        "name": "Firbolg",
        "subraces": []
    },
    {
        "name": "Genasi",
        "subraces": [
            "Air Genasi",
            "Earth Genasi",
            "Fire Genasi",
            "Water Genasi"
        ]
    },
    {
        "name": "Gith",
        "subraces": [
            "Githyanki",
            "Githzerai"
        ]
    },
    {
        "name": "Gnome",
        "subraces": [
            "Forest Gnome",
            "Rock Gnome",
            "Deep Gnome (Svirfneblin)"
        ]
    },
    {
        "name": "Goblin",
        "subraces": []
    },
    {
        "name": "Goliath",
        "subraces": []
    },
    {
        "name": "Half-Elf",
        "subraces": []
    },
    {
        "name": "Half-Orc",
        "subraces": []
    },
    {
        "name": "Halfling",
        "subraces": [
            "Lightfoot Halfling",
            "Stout Halfling",
            "Ghostwise Halfling"
        ]
    },
    {
        "name": "Harengon",
        "subraces": []
    },
    {
        "name": "Hobgoblin",
        "subraces": []
    },
    {
        "name": "Human",
        "subraces": [
            "Standard Human",
            "Variant Human"
        ]
    },
    {
        "name": "Kalashtar",
        "subraces": []
    },
    {
        "name": "Kenku",
        "subraces": []
    },
    {
        "name": "Kobold",
        "subraces": []
    },
    {
        "name": "Leonin",
        "subraces": []
    },
    {
        "name": "Lizardfolk",
        "subraces": []
    },
    {
        "name": "Minotaur",
        "subraces": []
    },
    {
        "name": "Orc",
        "subraces": []
    },
    {
        "name": "Satyr",
        "subraces": []
    },
    {
        "name": "Shifter",
        "subraces": [
            "Beasthide",
            "Longtooth",
            "Swiftstride",
            "Wildhunt"
        ]
    },
    {
        "name": "Tabaxi",
        "subraces": []
    },
    {
        "name": "Tiefling",
        "subraces": [
            "Asmodeus Tiefling",
            "Baalzebul Tiefling",
            "Dispater Tiefling",
            "Fierna Tiefling",
            "Glasya Tiefling",
            "Levistus Tiefling",
            "Mammon Tiefling",
            "Mephistopheles Tiefling",
            "Zariel Tiefling"
        ]
    },
    {
        "name": "Tortle",
        "subraces": []
    },
    {
        "name": "Triton",
        "subraces": []
    },
    {
        "name": "Yuan-ti Pureblood",
        "subraces": []
    }
]

const defaultCharacterData = {
    name: '',
    id: '',
    picture: '',
    class: 'Barbarian',
    subClass: 'Path of the Ancestral Guardian',
    race: 'Aarakocra',
    subRace: '',
    attributes: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
    },
    level: 1,
    life: 1,
    maxLife: 1,
    position: { x: -1, y: -1 }
}

export default function CreateCharacter() {
    const { characterId } = useParams()
    const navigate = useNavigate()
    const [CharacterData, setCharacterData] = useState<ICharacter>(defaultCharacterData)
    const [currentSubClassList, setCurrentSubClassList] = useState<string[]>([])
    const [currentSubRaceList, setCurrentSubRaceList] = useState<string[]>([])

    useEffect(() => {
        if (characterId) {
            console.log(characterId)
            setCharacterToEdit()
        }
    }, [])

    useEffect(() => {
        const newSubClassList = classesValues.find(classData => classData.name == CharacterData.class)?.subclasses || []
        setCurrentSubClassList(newSubClassList)
        setCharacterSingleData({ subClass: newSubClassList[0] || '' })
    }, [CharacterData.class])

    useEffect(() => {
        const newSubRaceList = racesValues.find(raceData => raceData.name == CharacterData.race)?.subraces || []
        setCurrentSubRaceList(newSubRaceList)
        setCharacterSingleData({ subRace: newSubRaceList[0] || '' })

    }, [CharacterData.race])

    const setCharacterToEdit = () => {
        getData({
            endPoint: `getCharacterById/${characterId}`,
            onSuccess: (res) => {
                console.log(res)
                setCharacterData(res.data)
                setCurrentSubClassList(classesValues.find(classData => classData.name == res.data.class)?.subclasses || [])
                setCurrentSubRaceList(racesValues.find(raceData => raceData.name == res.data.race)?.subraces || [])
            },
            onError: (res) => {
                if (res.status == 403) { navigate('/characters/list') }
            }
        })
    }


    const setCharacterSingleData = (data: object) => {
        setCharacterData({ ...CharacterData, ...data })
    }

    const setCharacterSingleAttribute = (data: object) => {
        setCharacterData({ ...CharacterData, attributes: { ...CharacterData.attributes, ...data } })
    }


    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        PostData({
            endPoint: "editCharacter",
            onSuccess: (res) => {
                navigate('/characters/list')
                console.log(res)
            },
            data: CharacterData
        })
    }

    return (
        <form onSubmit={(e) => handleSubmitForm(e)} className="w-full h-full p-6 grid grid-cols-5 grid-rows-2 gap-4 m-2">
            <div className='flex flex-col gap-2  w-fit col-start-1 col-end-2 row-start-1 row-end-3'>
                {CharacterData.picture && CharacterData.picture != '' ? (
                    <img src={CharacterData.picture} className='aspect-[3/4] w-60 rounded-sm object-cover' />
                ) : (
                    <div className='bg-stone-800 aspect-[3/4] w-60 flex rounded-sm'> </div>
                )}
                <Input.Image setImageFunction={(value: string) => setCharacterSingleData({ picture: value })}>
                    <Button.Primary type='button' color='black'>Select Image</Button.Primary>
                </Input.Image>
                <Button.Secondary type='button' className="flex flex-row gap-2 justify-center items-center" color='black' onClick={() => setCharacterSingleData({ picture: "" })}>Remove Image <Trash size={20} strokeWidth={1} /></Button.Secondary>
            </div>
            <section className="col-start-2 col-end-3 row-start-1 row-end-3">
                <Input.Container color="black">
                    <Input.Label inputId="CharacterName">Name</Input.Label>
                    <Input.TextInput required id="CharacterName" name="CharacterName" type="text" defaultValue={CharacterData.name} onChange={(e) => setCharacterSingleData({ name: e.target.value })} />
                </Input.Container>
                <Input.Container color="black">
                    <Input.Label inputId="CharacterClass">Class</Input.Label>
                    <Input.DropMenu inputId="CharacterClass" name="CharacterClass" value={CharacterData.class} setInputValueFunction={(value: string) => setCharacterSingleData({ class: value })} valuesList={classesValues.map(classData => classData.name)} />
                </Input.Container>
                <Input.Container color="black">
                    <Input.Label inputId="CharacterSubClass">Sub Class</Input.Label>
                    <Input.DropMenu inputId="CharacterSubClass" name="CharacterSubClass" value={CharacterData.subClass} setInputValueFunction={(value: string) => setCharacterSingleData({ subClass: value })} valuesList={currentSubClassList} />
                </Input.Container>
                <Input.Container color="black">
                    <Input.Label inputId="CharacterRace">Race</Input.Label>
                    <Input.DropMenu inputId="CharacterRace" name="CharacterRace" value={CharacterData.race} setInputValueFunction={(value: string) => setCharacterSingleData({ race: value })} valuesList={racesValues.map(raceData => raceData.name)} />
                </Input.Container>
                <Input.Container color="black">
                    <Input.Label inputId="CharacterSubRace">Sub Race</Input.Label>
                    <Input.DropMenu inputId="CharacterSubRace" name="CharacterSubRace" value={CharacterData.subRace} setInputValueFunction={(value: string) => setCharacterSingleData({ subRace: value })} valuesList={currentSubRaceList} />
                </Input.Container>
            </section>
            <ul className="col-start-3 col-end-5 row-start-1 row-end-2 grid grid-cols-2 grid-rows-4 gap-x-2 gap-y-6 h-fit mt-6">
                <li>
                    <Input.Container color="black">
                        <Input.Number min={0} id="Charisma" name="charisma" defaultValue={CharacterData.attributes.charisma} setValueFunction={(value) => setCharacterSingleAttribute({ charisma: value })} currentValue={CharacterData.attributes.charisma} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='black'>
                        <Input.Number min={0} id="Constitution" name="constitution" defaultValue={CharacterData.attributes.constitution} setValueFunction={(value) => setCharacterSingleAttribute({ constitution: value })} currentValue={CharacterData.attributes.constitution} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='black'>
                        <Input.Number min={0} id="Dexterity" name="dexterity" defaultValue={CharacterData.attributes.dexterity} setValueFunction={(value) => setCharacterSingleAttribute({ dexterity: value })} currentValue={CharacterData.attributes.dexterity} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='black'>
                        <Input.Number min={0} id="Intelligence" name="intelligence" defaultValue={CharacterData.attributes.intelligence} setValueFunction={(value) => setCharacterSingleAttribute({ intelligence: value })} currentValue={CharacterData.attributes.intelligence} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='black'>
                        <Input.Number min={0} id="Strength" name="strength" defaultValue={CharacterData.attributes.strength} setValueFunction={(value) => setCharacterSingleAttribute({ strength: value })} currentValue={CharacterData.attributes.strength} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='black'>
                        <Input.Number min={0} id="Wisdom" name="wisdom" defaultValue={CharacterData.attributes.wisdom} setValueFunction={(value) => setCharacterSingleAttribute({ wisdom: value })} currentValue={CharacterData.attributes.wisdom} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='black'>
                        <Input.Number min={1} id="Max Life" name="maxLife" defaultValue={CharacterData.maxLife} setValueFunction={(value) => setCharacterSingleData({ maxLife: value })} currentValue={CharacterData.maxLife} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='black'>
                        <Input.Number min={0} max={CharacterData.maxLife} id="Life" name="life" defaultValue={CharacterData.life} setValueFunction={(value) => setCharacterSingleData({ life: value })} currentValue={CharacterData.life} />
                    </Input.Container>
                </li>
            </ul>

            <Button.Secondary onClick={() => navigate('/characters/list')} color="black" type='button' className="gap-1 col-start-4 col-end-5 row-start-2 row-end-3 self-end">Cancel</Button.Secondary>
            <Button.Primary color="black" type='submit' className="col-start-5 col-end-6 row-start-2 row-end-3 self-end">Save</Button.Primary>

        </form >
    )
}