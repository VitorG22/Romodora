import { useNavigate, useParams } from 'react-router-dom'
import * as Button from '../../../assets/buttons/buttons'
import * as Switch from '../../../assets/buttons/switchs'
import * as Input from '../../../assets/inputs/inputs'
import { useEffect, useState } from 'react'
import { getData, PostData } from '../../../scripts/axios'
import { Ammo, MeleeWeapon, RangedWeapon, type TItems } from '../itemsClass'
import getFormValues from '../../../assets/forms/getFormValues'
import { BowArrowIcon, LocateFixedIcon, Maximize2Icon, RefreshCcwIcon, SendToBackIcon, ShuffleIcon, SwordIcon, SwordsIcon, WeightIcon } from 'lucide-react'
import ParseItem, { generateDefaultItem } from '../JsonToClassParser'


export default function CreateItem() {
    const { itemId } = useParams()
    const navigate = useNavigate()
    const [picture, setPicture] = useState<string>()
    const [item, setItem] = useState<TItems>()
    const [itemType, setItemType] = useState<"Melee Weapon" | "Ranged Weapon" | "Armor" | "Shield" | "Tool" | "Ammo" | "Kit" | "Accessories" | "Consumable" | "Catalysts" | "Bag" | "Materials">("Melee Weapon")

    useEffect(() => {
        if (itemId && itemId != "newItem") {
            setItemToEdit()
        } else {
            setItem(generateDefaultItem('meleeWeapon'))
        }
    }, [])

    useEffect(() => {
        if (item) {
            item.picture = picture
            setItemData()
        }
    }, [picture])

    const setItemToEdit = () => {
        getData({
            endPoint: `getItemById/${itemId}`,
            onSuccess: (res) => {
                setPicture(res.data.picture)
                let newItemCopy = ParseItem(res.data)
                if (!newItemCopy){
                    { navigate('/items/list') }
                    return
                }
                setItem(newItemCopy)
            },
            onError: (res) => {
                console.log(res)
                if (res.status != 200) { navigate('/items/list') }
            }
        })
    }

    const setItemData = () => {
        let newItemCopy = ParseItem(item!)
        if (!newItemCopy) return
        setItem(newItemCopy)

    }


    const changeItemType = (value: any) => {
        setItemType(value)
        switch (value) {
            case "Melee Weapon":
                setItem(new MeleeWeapon({
                    ...item!,
                    amount: 1,
                    damage: {
                        bonus: 0,
                        diceCount: 0,
                        diceValue: 0,
                        type: 'bludgeoning',
                    },
                    property: [],
                    range: 0,
                    type: "meleeWeapon",
                }))
                break
            case "Ranged Weapon":
                setItem(new RangedWeapon({
                    ...item!,
                    amount: 1,
                    damage: {
                        bonus: 0,
                        diceCount: 0,
                        diceValue: 0,
                        type: 'bludgeoning',
                    },
                    property: [],
                    range: {
                        normal: 0
                    },
                    type: "rangedWeapon",
                }))
                break
            case "Armor":
                break
            case "Shield":
                break
            case "Tool":
                break
            case "Ammo":
                setItem(new Ammo({
                    ...item!,
                    amount: 1,
                    damage: {
                        fixedValue: 0,
                        bonus: 0,
                        diceCount: 0,
                        diceValue: 0,
                    },
                    type: "ammo",
                }))
                break
            case "Kit":
                break
            case "Accessories":
                break
            case "Consumable":
                break
            case "Catalysts":
                break
            case "Bag":
                break
            case "Materials":
                break
        }

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = getFormValues(e)


        let formatItem = { ...item, ...formData }
        console.log(formatItem)
        PostData({
            data: formatItem,
            endPoint: 'saveItem',
            onSuccess: () => navigate('/items/list'),
            onError: (res) => console.log(res)
        })

    }

    return (
        <form onKeyDown={(e) => { if (e.key == "Enter") { e.preventDefault(); return } }} onSubmit={(e) => handleSubmit(e)} className='flex flex-row gap-2 w-full h-full p-4 overflow-hidden'>
            {item &&
                <>
                    <div className='flex flex-col gap-2 h-full w-1/3'>
                        <div className='flex flex-row gap-2 w-full'>
                            <section className='w-fit aspect-square flex flex-col gap-2'>
                                {item.picture && item.picture != '' ? (
                                    <div className='size-60 flex rounded-sm'>
                                        <img src={item.picture} className='object-cover rounded-sm' />
                                    </div>
                                ) : (
                                    <div className='bg-stone-800 size-60 flex rounded-sm'> </div>
                                )}
                                <Input.Image setImageFunction={setPicture}>
                                    <Button.Primary color='black'>Change Image</Button.Primary>
                                </Input.Image>
                            </section>
                            <section className='flex flex-col justify-between w-full'>
                                <Input.Container color='black'>
                                    <Input.Label inputId='name'>Name</Input.Label>
                                    <Input.TextInput id='name' name='name' type='text' defaultValue={item.name} />
                                </Input.Container>
                                <Input.Container color='black'>
                                    <Input.Label inputId='rarity'>Rarity</Input.Label>
                                    <Input.DropMenu inputId='rarity' valuesList={["Common", "Uncommon", "Rare", "Very Rare", "Legendary"]} name='rarity' value={item.rarity}
                                        setInputValueFunction={(value: any) => { item.rarity = value; setItemData() }}
                                    />
                                </Input.Container>
                                <Input.Container color='black'>
                                    <Input.Label inputId='Type'>Type</Input.Label>
                                    <Input.DropMenu inputId='type' valuesList={["Melee Weapon", "Ranged Weapon", "Armor", "Shield", "Tool", "Ammo", "Kit", "Accessories", "Consumable", "Catalysts", "Bag", "Materials"]} name='type' value={itemType}
                                        setInputValueFunction={(value: any) => { changeItemType(value) }}
                                    />
                                </Input.Container>
                                <Input.Container color='black'>
                                    <Input.Number min={1} id='Max Stack' name='maxStack' currentValue={item.maxStack} setValueFunction={(value: number) => { item.maxStack = value; setItemData() }} />
                                </Input.Container>
                                <Input.Container color='black'>
                                    <Input.Number min={1} id='Weight' name='weight' currentValue={item.weight} setValueFunction={(value: number) => { item.weight = value; setItemData() }} />
                                </Input.Container>
                            </section>
                        </div>
                        <section className='flex flex-col h-full w-full'>
                            <h1>Description</h1>
                            <textarea name='description' defaultValue={item.description} className='w-full h-full resize-none ring ring-stone-800 rounded-sm outline-0 p-1'></textarea>
                        </section>
                    </div>
                    <div className='flex flex-col justify-between bg-stone-300 h-full w-2/3 gap-2'>
                        <div className='ring ring-stone-800 h-full rounded-sm p-2 overflow-hidden'>
                            <VariableOptionControl item={item} setItemData={setItemData} />
                        </div>
                        <div className='flex flex-row gap-2'>
                            <Button.Secondary color='black' type='submit'>Save</Button.Secondary>
                            <Button.Primary color='black' type='button' onClick={() => navigate('/items/list')}>Cancel</Button.Primary>
                        </div>
                    </div>
                </>
            }
        </form>
    )
}


function VariableOptionControl({ item, setItemData }: { item: TItems, setItemData: () => void }) {

    switch (item.type) {
        case 'meleeWeapon':
            if (item instanceof MeleeWeapon) {
                return (<MeleeWeaponOptionsCreation item={item} setItemData={setItemData} />)
            } break
        case 'rangedWeapon':
            if (item instanceof RangedWeapon) {
                return (<RangedWeaponOptionsCreation item={item} setItemData={setItemData} />)
            } break
        case 'armor':
            break
        case 'shield':
            break
        case 'tool':
            break
        case 'ammo':
            if (item instanceof Ammo) {
                return (<AmmoOptionsCreation item={item} setItemData={setItemData} />)
            } break
        case 'kit':
            break
        case 'accessories':
            break
        case 'consumable':
            break
        case 'catalysts':
            break
        case 'bag':
            break
        case 'materials':
            break
    }
}

function PropertyContainer({ itemId, activePropertyList, setActivePropertyList, propertyList }: { itemId: string, activePropertyList: string[], setActivePropertyList: React.Dispatch<React.SetStateAction<string[]>>, propertyList: Array<"light" | "finesse" | "heavy" | "two-handed" | "ammunition" | "loading" | "versatile" | "reach" | "thrown"> }) {
    const propertyComponentsData = {
        "light": {
            component: <SwordsIcon strokeWidth={1.3} />,
            description: 'Allows the user to wield two weapons.'
        },
        "finesse": {
            component: <ShuffleIcon strokeWidth={1.3} />,
            description: 'Allows the use of Dexterity in attack and damage.'
        },
        "heavy": {
            component: <WeightIcon strokeWidth={1.3} />,
            description: 'Small creatures have a disadvantage when using this.'
        },
        "two-handed": {
            component: <SwordIcon strokeWidth={1.3} />,
            description: 'It requires two hands to use.'
        },
        "ammunition": {
            component: <BowArrowIcon strokeWidth={1.3} />,
            description: 'It requires ammunition such as arrows, bolts, and bullets.'
        },
        "loading": {
            component: <RefreshCcwIcon strokeWidth={1.3} />,
            description: 'Limits the number of attacks per turn.'
        },
        "versatile": {
            component: <SendToBackIcon strokeWidth={1.3} />,
            description: 'It can be used with one or two hands, the damage changes.'
        },
        "reach": {
            component: <Maximize2Icon strokeWidth={1.3} />,
            description: 'Reaches a distance of +5.'
        },
        "thrown": {
            component: <LocateFixedIcon strokeWidth={1.3} />,
            description: 'It can be used as a ranged weapon with normal damage.'
        },
    }


    const togglePropertyInList = (property: string) => {
        let listCopy = [...activePropertyList]
        if (listCopy.includes(property)) {
            let propertyIndex = listCopy.findIndex(value => value == property)
            listCopy.splice(propertyIndex, 1)
            setActivePropertyList(listCopy)
        } else {
            listCopy.push(property)
            setActivePropertyList(listCopy)
        }
    }

    return (
        <section key={`propertyContainer_${itemId}`} className='w-3/4 h-full  overflow-scroll'>
            <ul className='flex flex-wrap gap-2 w-full justify-center'>
                {propertyList.map(property =>
                    <li
                        onClick={() => togglePropertyInList(property)}
                        className={`flex flex-col w-40 h-60 items-center justify-between p-1 z-20 bg-linear-to-tr  hover:cursor-pointer duration-300
                        ${activePropertyList.includes(property) ? 'from-purple-700 to-purple-600/50  text-stone-300' : "from-stone-400/20 to-stone-300/20"}`}
                    >
                        <div className=' w-full h-full max-h-1/2 max-w-2/3 aspect-square *:w-full *:h-full'>
                            {propertyComponentsData[property].component}
                        </div>
                        <h1 className='font-bold  first-letter:uppercase'>{property}</h1>
                        <p className='text-center italic font-thin  min-h-1/3'>{propertyComponentsData[property].description}</p>
                    </li>

                )}
            </ul>
        </section>
    )
}

function AmmoOptionsCreation({ item, setItemData }: { item: Ammo, setItemData: () => void }) {

    return (
        <section className='flex flex-col h-full gap-4 max-w-60 pt-4'>
            <div className='flex flex-col '>
                <Switch.Secondary id='isMagic' label='Is Magic' name='isMagic' defaultChecked={item.isMagic} onChangeFunction={(value: boolean) => { item.isMagic = value; setItemData() }} />
            </div>
            <Input.Container color='black'>
                <h1 className=''>Damage values</h1>
                <Input.Number className='ml-2' min={0} id='Fixed Value' name='fixedValue' currentValue={item.damage.fixedValue} setValueFunction={(value: number) => { item.damage.fixedValue = value; setItemData() }} />
                <Input.Number className='ml-2' min={0} id='Dice Count' name='diceCount' currentValue={item.damage.diceCount} setValueFunction={(value: number) => { item.damage.diceCount = value; setItemData() }} />
                <Input.Number className='ml-2' min={0} id='Dice Value' name='diceValue' currentValue={item.damage.diceValue} setValueFunction={(value: number) => { item.damage.diceValue = value; setItemData() }} />
                <Input.Number className='ml-2' min={0} id='Bonus' name='bonus' currentValue={item.damage.bonus} setValueFunction={(value: number) => { item.damage.bonus = value; setItemData() }} />
            </Input.Container>
        </section>
    )
}

function RangedWeaponOptionsCreation({ item, setItemData }: { item: RangedWeapon, setItemData: () => void }) {
    const [activePropertyList, setActivePropertyList] = useState<string[]>(item.property)


    useEffect(() => {
        let propertyListCopy: Array<"light" | "finesse" | "heavy" | "two-handed" | "ammunition" | "loading"> = []
        activePropertyList.map((value: string) => {
            if (value == "light" || value == "finesse" || value == "heavy" || value == "two-handed" || value == "ammunition" || value == "loading") {
                propertyListCopy.push(value)
            }
        })
        item.property = propertyListCopy
        setItemData()
    }, [activePropertyList])

    return (
        <section className='flex flex-row w-full h-auto gap-4 overflow-hidden'>
            <section className='flex-col flex  gap-4  pt-4 w-1/4'>
                <Switch.Secondary id='isMagic' label='Is Magic' name='isMagic' defaultChecked={item.isMagic} onChangeFunction={(value: boolean) => { item.isMagic = value; setItemData() }} />
                <Input.Container color='black'>
                    <h1 className=''>Damage values</h1>
                    <Input.Number className='ml-2' min={0} id='Dice Count' name='diceCount' currentValue={item.damage.diceCount} setValueFunction={(value: number) => { item.damage.diceCount = value; setItemData() }} />
                    <Input.Number className='ml-2' min={0} id='Dice Value' name='diceValue' currentValue={item.damage.diceValue} setValueFunction={(value: number) => { item.damage.diceValue = value; setItemData() }} />
                    <Input.Number className='ml-2' min={0} id='Bonus' name='bonus' currentValue={item.damage.bonus} setValueFunction={(value: number) => { item.damage.bonus = value; setItemData() }} />

                    <Input.DropMenu className='ml-2 mt-2 w-full' value={item.damage.type} valuesList={["bludgeoning", "slashing", "piercing"]} inputId='type' name='type' setInputValueFunction={(value: string) => {
                        if (value == "bludgeoning" || value == "slashing" || value == "piercing") { item.damage.type = value; setItemData() }
                    }} />

                </Input.Container>
                <Input.Container color='black'>
                    <h1>Range</h1>
                    <Input.Number className='ml-2' min={0} id='Normal' name='Range_Normal' currentValue={item.range.normal} setValueFunction={(value: number) => { item.range.normal = value; setItemData() }} />
                    <Input.Number className='ml-2' min={0} id='Long' name='Range_Long' currentValue={item.range.long || 0} setValueFunction={(value: number) => { item.range.long = value; setItemData() }} />
                </Input.Container>
            </section>
            <PropertyContainer itemId={item.id} setActivePropertyList={setActivePropertyList} activePropertyList={activePropertyList} propertyList={["light", "finesse", "heavy", "two-handed", "ammunition", "loading"]} />
        </section>
    )
}

function MeleeWeaponOptionsCreation({ item, setItemData }: { item: MeleeWeapon, setItemData: () => void }) {
    const [activePropertyList, setActivePropertyList] = useState<string[]>(item.property)

    useEffect(() => {
        let propertyListCopy: Array<"light" | "finesse" | "heavy" | "two-handed" | "versatile" | "reach" | "thrown" | "loading"> = []
        activePropertyList.map((value: string) => {
            if (value == "light" || value == "finesse" || value == "heavy" || value == "two-handed" || value == "versatile" || value == "reach" || value == "thrown" || value == "loading") {
                propertyListCopy.push(value)
            }
        })
        item.property = propertyListCopy
        setItemData()
    }, [activePropertyList])

    return (
        <section className='flex flex-row w-full h-full gap-4 overflow-hidden'>
            <section className='flex-col flex  gap-4  pt-4 w-1/4'>
                <Switch.Secondary id='isMagic' key={`switchIsMagic_${item.id}`} label='Is Magic' name='isMagic' defaultChecked={item.isMagic} onChangeFunction={(value: boolean) => { item.isMagic = value; setItemData() }} />
                <Input.Container color='black'>
                    <h1 className='w-full font-bold '>Damage values</h1>
                    <Input.Number min={0} id='Dice Count' name='diceCount' currentValue={item.damage.diceCount} setValueFunction={(value: number) => { item.damage.diceCount = value; setItemData() }} />

                    <div className="flex flex-row gap-2 items-center pl-2">
                        <Input.Label inputId='diceValue' className='text-nowrap'>Dice Value</Input.Label>
                        <Input.DropMenu className='ml-2 mt-2 w-full' value={item.damage.diceValue.toString()} valuesList={['4', '6', '8', '10', '12', '20', '100']} inputId="diceValue" name='DiceValue' setInputValueFunction={(value: string) => { item.damage.diceValue = parseInt(value); setItemData() }} />
                    </div>
                    <div className="flex flex-row gap-2 items-center pl-2">
                        <Input.Label inputId='type' className='text-nowrap'>Type</Input.Label>
                        <Input.DropMenu className='ml-2 mt-2 w-full' value={item.damage.type} valuesList={["bludgeoning", "slashing", "piercing"]} inputId='type' name='type' setInputValueFunction={(value: string) => {
                            if (value == "bludgeoning" || value == "slashing" || value == "piercing") { item.damage.type = value; setItemData() }
                        }} />
                    </div>

                    <Input.Number min={0} id='Bonus' name='bonus' currentValue={item.damage.bonus} setValueFunction={(value: number) => { item.damage.bonus = value; setItemData() }} />
                    {item.property.includes("versatile") &&
                        <div className="flex flex-row gap-2 items-center pl-2">
                            <Input.Label inputId='diceValue' className='text-nowrap'>Versatile Dice Value</Input.Label>
                            <Input.DropMenu className='ml-2 mt-2 w-full' value={item.damage.versatileDiceValue?.toString() || ""} valuesList={['4', '6', '8', '10', '12', '20', '100']} inputId="versatileDiceValue" name='versatileDiceValue' setInputValueFunction={(value: string) => { item.damage.versatileDiceValue = parseInt(value); setItemData() }} />
                        </div>
                    }

                </Input.Container>
            </section>
            <PropertyContainer itemId={item.id} setActivePropertyList={setActivePropertyList} activePropertyList={activePropertyList} propertyList={["light", "finesse", "heavy", "two-handed", "versatile", "reach", "thrown", "loading"]} />
        </section>

    )
}

