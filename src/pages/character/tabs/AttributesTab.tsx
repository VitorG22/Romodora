import type { ICharacter } from "../../game/table/entitysClasses"
import * as Input from '../../../assets/inputs/inputs'

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

export default function AttributesTab({ CharacterData, setCharacterData, currentSubClassList, currentSubRaceList }: { CharacterData: ICharacter, setCharacterData: React.Dispatch<React.SetStateAction<ICharacter>>, currentSubClassList: string[], currentSubRaceList: string[] }) {

    const setCharacterSingleData = (data: object) => {
        setCharacterData({ ...CharacterData, ...data })
    }

    const setCharacterSingleAttribute = (data: object) => {
        setCharacterData({ ...CharacterData, attributes: { ...CharacterData.attributes, ...data } })
    }


    return (
        <section className='flex flex-col gap-6 p-2 h-full overflow-hidden'>
            <section className="grid grid-cols-2 gap-2 h-full">
                <Input.Container color="white" className='col-span-2'>
                    <Input.Label inputId="CharacterName">Name</Input.Label>
                    <Input.TextInput required id="CharacterName" name="CharacterName" type="text" defaultValue={CharacterData.name} onChange={(e) => setCharacterSingleData({ name: e.target.value })} />
                </Input.Container>
                <Input.Container color="white">
                    <Input.Label inputId="CharacterClass">Class</Input.Label>
                    <Input.DropMenu inputId="CharacterClass" name="CharacterClass" value={CharacterData.class} setInputValueFunction={(value: string) => setCharacterSingleData({ class: value })} valuesList={classesValues.map(classData => classData.name)} />
                </Input.Container>
                <Input.Container color="white">
                    <Input.Label inputId="CharacterSubClass">Sub Class</Input.Label>
                    <Input.DropMenu inputId="CharacterSubClass" name="CharacterSubClass" value={CharacterData.subClass} setInputValueFunction={(value: string) => setCharacterSingleData({ subClass: value })} valuesList={currentSubClassList} />
                </Input.Container>
                <Input.Container color="white">
                    <Input.Label inputId="CharacterRace">Race</Input.Label>
                    <Input.DropMenu inputId="CharacterRace" name="CharacterRace" value={CharacterData.race} setInputValueFunction={(value: string) => setCharacterSingleData({ race: value })} valuesList={racesValues.map(raceData => raceData.name)} />
                </Input.Container>
                <Input.Container color="white">
                    <Input.Label inputId="CharacterSubRace">Sub Race</Input.Label>
                    <Input.DropMenu inputId="CharacterSubRace" name="CharacterSubRace" value={CharacterData.subRace} setInputValueFunction={(value: string) => setCharacterSingleData({ subRace: value })} valuesList={currentSubRaceList} />
                </Input.Container>
            </section>
            <ul className="grid grid-cols-2 gap-x-2 h-full justify-between">
                <li>
                    <Input.Container color="white">
                        <Input.Number min={0} id="Charisma" name="charisma" defaultValue={CharacterData.attributes.charisma} setValueFunction={(value) => setCharacterSingleAttribute({ charisma: value })} currentValue={CharacterData.attributes.charisma} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='white'>
                        <Input.Number min={0} id="Constitution" name="constitution" defaultValue={CharacterData.attributes.constitution} setValueFunction={(value) => setCharacterSingleAttribute({ constitution: value })} currentValue={CharacterData.attributes.constitution} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='white'>
                        <Input.Number min={0} id="Dexterity" name="dexterity" defaultValue={CharacterData.attributes.dexterity} setValueFunction={(value) => setCharacterSingleAttribute({ dexterity: value })} currentValue={CharacterData.attributes.dexterity} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='white'>
                        <Input.Number min={0} id="Intelligence" name="intelligence" defaultValue={CharacterData.attributes.intelligence} setValueFunction={(value) => setCharacterSingleAttribute({ intelligence: value })} currentValue={CharacterData.attributes.intelligence} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='white'>
                        <Input.Number min={0} id="Strength" name="strength" defaultValue={CharacterData.attributes.strength} setValueFunction={(value) => setCharacterSingleAttribute({ strength: value })} currentValue={CharacterData.attributes.strength} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='white'>
                        <Input.Number min={0} id="Wisdom" name="wisdom" defaultValue={CharacterData.attributes.wisdom} setValueFunction={(value) => setCharacterSingleAttribute({ wisdom: value })} currentValue={CharacterData.attributes.wisdom} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='white'>
                        <Input.Number min={1} id="Max Life" name="maxLife" defaultValue={CharacterData.maxLife} setValueFunction={(value) => setCharacterSingleData({ maxLife: value })} currentValue={CharacterData.maxLife} />
                    </Input.Container>
                </li>
                <li>
                    <Input.Container color='white'>
                        <Input.Number min={0} max={CharacterData.maxLife} id="Life" name="life" defaultValue={CharacterData.life} setValueFunction={(value) => setCharacterSingleData({ life: value })} currentValue={CharacterData.life} />
                    </Input.Container>
                </li>
            </ul>

        </section>
    )

}