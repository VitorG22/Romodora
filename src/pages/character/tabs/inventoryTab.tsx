import { useSelector } from "react-redux"
import type {  RootState } from "../../../redux/store"
import { useEffect, useRef, useState } from "react"
import { MeleeWeapon, type TItems } from "../../items/itemsClass"
import ParseItem  from "../../items/JsonToClassParser"
import { ArrowDown10, ArrowDownAz, ArrowUp10, ArrowUpAz, BowArrowIcon, ChevronLeft, ChevronRight, LocateFixedIcon, Maximize2Icon, RefreshCcwIcon, SendToBackIcon, ShuffleIcon, Sparkle, SparklesIcon, SwordIcon, SwordsIcon, Trash2, WeightIcon } from "lucide-react"
import { getData } from "../../../scripts/axios"
import "./inventoryTabStyle.css"
import { Loader } from "../../../assets/loader/loader"

const rarityColorSet = {
    "Very Rare": "#ad46ff",
    "Common": "#6a7282",
    "Legendary": "#fe9a00",
    "Rare": "#2b7fff",
    "Uncommon": "#00c950"

}
const getContrastColor = (hexcolor: string) => {
    if (hexcolor.slice(0, 1) === '#') {
        hexcolor = hexcolor.slice(1);
    }

    if (hexcolor.length === 3) {
        hexcolor = hexcolor.split('').map(function (hex) {
            return hex + hex;
        }).join('');
    }

    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);

    const perceivedBrightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    return (perceivedBrightness > 128) ? 'black' : 'white';
}
const generateUndefinedBoxes = (minBoxCount:number ,inventory?:Array<TItems>) => {
    let newTempInventoryList: Array<TItems | undefined> = []
    if(inventory && inventory.length >0){
        newTempInventoryList.push(...inventory)
        if (minBoxCount - inventory.length > 0) {
            newTempInventoryList.push(...new Array((minBoxCount - inventory.length)))
        } else {
            newTempInventoryList.push(undefined)
        }
    }else{
        newTempInventoryList = [...Array.from({length: minBoxCount},()=> undefined)]
    }
    
    
    return newTempInventoryList
}

export default function InventoryTab({ setInventory, inventory }: { setInventory: (inventoryData: TItems[]) => void, inventory: TItems[] }) {
    let minBoxCount = 60
    const [inventoryData, setInventoryData] = useState<Array<TItems | undefined>>(generateUndefinedBoxes(minBoxCount,inventory))
    const [containerItemsList, setContainerItemsList] = useState<Array<TItems | undefined>>(useSelector((state: RootState) => state.items))

    const [selectedItem, setSelectedItem] = useState<{ item: TItems, from: 'inventory' | 'container', index: number } | null>(null)

    useEffect(()=>{
        setInventory(inventoryData.filter(item=> item != undefined))
    },[inventoryData])

    return (
        <main className='grid grid-cols-3 grid-rows-2 gap-2 p-2 h-full overflow-hidden divide-y divide-stone-500/40'>
            <section className='border border-stone-500/40 row-start-1 row-end-2 col-start-1 col-end-3'><Inventory minBoxCount={minBoxCount} inventoryData={inventoryData} setInventoryData={setInventoryData} setSelectedItem={setSelectedItem} /></section>
            <section className='border border-stone-500/40 row-start-2 row-end-3 col-start-1 col-end-3'><ItemsContainer setSelectedItem={setSelectedItem} setContainerItemsList={setContainerItemsList} containerItemsList={containerItemsList} /></section>
            <section className='px-2 flex items-center justify-center row-start-1 row-end-3 col-start-3 col-end-4'>
                {selectedItem &&
                    <ItemCard itemData={selectedItem} setInventoryData={setInventoryData} setContainerItemsList={setContainerItemsList} />
                }
            </section>

        </main>
    )
}

function ItemCard({ itemData, setInventoryData, setContainerItemsList }: { itemData: { item: TItems, from: 'inventory' | 'container', index: number }, setInventoryData: React.Dispatch<React.SetStateAction<(TItems | undefined)[]>>, setContainerItemsList: React.Dispatch<React.SetStateAction<(TItems | undefined)[]>> }) {
    const article1Ref = useRef<HTMLElement>(null)
    const article2Ref = useRef<HTMLElement>(null)



    useEffect(() => {
        let contrastValue = getContrastColor(rarityColorSet[itemData.item.rarity])
        article1Ref.current!.style.color = contrastValue
        article2Ref.current!.style.color = contrastValue
    }, [itemData])

    const addToStack = () => {
        if (itemData.item.amount + 1 > itemData.item.maxStack) return
        itemData.item.amount += 1

        switch (itemData.from) {
            case "inventory":
                setInventoryData(currentItemsList => {
                    currentItemsList.splice(itemData.index, 1, itemData.item)
                    return [...currentItemsList]
                })
                break
            case "container":
                setContainerItemsList(currentItemsList => {
                    currentItemsList.splice(itemData.index, 1, itemData.item)
                    return [...currentItemsList]
                })
                break
        }
    }
    const subtractFromStack = () => {
        if (itemData.item.amount - 1 <= 0) return
        itemData.item.amount -= 1

        switch (itemData.from) {
            case "inventory":
                setInventoryData(currentItemsList => {
                    currentItemsList.splice(itemData.index, 1, itemData.item)
                    return [...currentItemsList]
                })
                break
            case "container":
                setContainerItemsList(currentItemsList => {
                    currentItemsList.splice(itemData.index, 1, itemData.item)
                    return [...currentItemsList]
                })
                break
        }
    }

    return (
        <main className="relative w-full h-full flex flex-col gap-2 items-center justify-center ">
            <div className='flex flex-col w-full justify-between items-center text-sm'>
                <h1>Stack</h1>
                <div className='flex flex-row w-full justify-between items-center'>
                    <button type="button" onClick={subtractFromStack}><ChevronLeft strokeWidth={1.3} /></button>
                    <p>{itemData.item.amount}/ {itemData.item.maxStack}</p>
                    <button type='button' onClick={addToStack}><ChevronRight strokeWidth={1.3} /></button>
                </div>
            </div>
            <div
                style={{ borderColor: rarityColorSet[itemData.item.rarity], background: rarityColorSet[itemData.item.rarity] + "80" }}
                className='relative flex flex-col items-center justify-between overflow-hidden  w-full max-h-full max-w-full aspect-[3/4] group rounded-sm border-2 gap-2 card'>
                <section id="cardFront" className='grid grid-cols-3 grid-rows-4 absolute p-2 w-full h-full gap-2 z-20'>
                    <div className='row-start-1 row-end-3 col-start-1 col-end-3 flex rounded-sm overflow-hidden'>
                        <img src={itemData.item.picture} className='w-full h-full object-cover' />
                    </div>
                    <article ref={article1Ref} style={{ background: rarityColorSet[itemData.item.rarity] + '70', borderColor: rarityColorSet[itemData.item.rarity] }} className='  p-2 text-start z-10 border-2  rounded-sm text-stone-900 
                    row-start-3 row-end-5 col-start-1 col-end-4'>
                        <h1 className='flex flex-row items-center gap-2 h-fit'>{itemData.item.name}
                            {itemData.item.isMagic && <SparklesIcon size={15} />}
                        </h1>
                        <p className='italic text-sm'>{itemData.item.description}</p>
                    </article>
                    <article ref={article2Ref} style={{ background: rarityColorSet[itemData.item.rarity] + '70', borderColor: rarityColorSet[itemData.item.rarity] }} className='flex flex-col p-2 text-start z-10 border-2 rounded-sm text-stone-900 row-start-1 row-end-3 col-start-3 col-end-4'>
                        <CardTopRightData item={itemData.item} />
                    </article>
                </section>
                <div style={{ background: rarityColorSet[itemData.item.rarity] + '98' }} className='w-[200%] h-[40%] rotate-45 absolute z-10 left-0 top-0' />
                <div style={{ background: rarityColorSet[itemData.item.rarity] + '60' }} className='w-[240%] h-[60%] rotate-40 absolute z-10 -left-40 top-0' />
                <div style={{ background: rarityColorSet[itemData.item.rarity] + '40' }} className='w-[200%] h-[40%] rotate-10 absolute z-10 left-0 top-40' />
                <div style={{ background: rarityColorSet[itemData.item.rarity] + '60' }} className='w-[200%] h-[40%] rotate-80 absolute z-10 -left-60 top-20' />
                <div style={{ background: rarityColorSet[itemData.item.rarity] + '70' }} className='w-[200%] h-[40%] -rotate-45 absolute z-10 -left-5 bottom-0' />
                <div style={{ background: rarityColorSet[itemData.item.rarity] + '60' }} className='w-[200%] h-[40%] -rotate-10 absolute z-10 -left-10 top-0' />
            </div>
        </main>

    )
}

function CardTopRightData({ item }: { item: TItems }) {
    let parsedItem = ParseItem(item)
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

    switch (true) {
        case parsedItem instanceof MeleeWeapon:
            return (
                <div className='flex flex-col gap-1 text-xs h-full overflow-hidden'>
                    <article >
                        <h2 className='font-bold '>Damage </h2>
                        <p className='ml-1'>Type: {parsedItem.damage.type}</p>
                        <p className='ml-1'>Dice: {parsedItem.damage.diceCount}D{parsedItem.damage.diceValue}</p>
                        <p className='ml-1'>Bonus: {parsedItem.damage.bonus}</p>
                        {parsedItem.damage.versatileDiceValue &&
                            <p className='ml-1'>Versatile Dice: {parsedItem.damage.diceCount}D{parsedItem.damage.versatileDiceValue}</p>
                        }
                    </article>

                    <h2 className='font-bold '>Price: <span className='font-normal'>{parsedItem.price}</span> </h2>
                    <article className='flex flex-col gap-2'>
                        <h2 className='font-bold '>Property: </h2>
                        <ul className='flex flex-row justify-center flex-wrap gap-1'>
                            {parsedItem.property.map(property =>
                                <li className='flex flex-row gap-1 items-center h-auto overflow-hidden *:first:h-full'>
                                    {propertyComponentsData[property].component}
                                    {/* <p className='first-letter:uppercase'>{property}</p> */}
                                </li>
                            )}
                        </ul>

                    </article>
                </div>
            )

    }
}

function Inventory({ minBoxCount, inventoryData, setInventoryData, setSelectedItem }: { minBoxCount: number, inventoryData: (TItems | undefined)[], setInventoryData: React.Dispatch<React.SetStateAction<(TItems | undefined)[]>>, setSelectedItem: React.Dispatch<React.SetStateAction<{ item: TItems; from: "inventory" | "container"; index: number; } | null>> }) {

    const [itemsListToRender, setItemsListToRender] = useState<Array<{ itemData: TItems | undefined, render: boolean }>>([])

    const handleDropItemInBox = (e: React.DragEvent<HTMLElement>, index: number) => {
        e.preventDefault()
        const itemData = ParseItem(JSON.parse(e.dataTransfer.getData('text/itemData')))
        const itemIndex = parseInt(e.dataTransfer.getData('text/itemIndex'))

        let inventoryDataCopy = structuredClone(inventoryData)

        if (itemIndex >= 0) {
            inventoryDataCopy[itemIndex] = undefined
        }

        inventoryDataCopy[index] = itemData!


        let haveUndefinedBoxes = false
        for (let box of inventoryDataCopy) {
            if (box == undefined) {
                haveUndefinedBoxes = true
            }
        }

        if (!haveUndefinedBoxes) { inventoryDataCopy.push(undefined) }
        setInventoryData(inventoryDataCopy)
    }

    const handleDropItemInTrash = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        const itemIndex = parseInt(e.dataTransfer.getData('text/itemIndex'))

        let inventoryDataCopy = structuredClone(inventoryData)
        inventoryDataCopy[itemIndex] = undefined

        let undefinedBoxCount = inventoryDataCopy.filter(boxValue => boxValue == undefined).length
        console.log(undefinedBoxCount)


        if (inventoryData.length > minBoxCount && undefinedBoxCount > 1) {
            inventoryDataCopy.splice(itemIndex, 1)
        }

        setInventoryData(inventoryDataCopy)
    }

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, itemData: TItems, index: number) => {
        e.dataTransfer.setData("text/itemData", JSON.stringify(itemData))
        e.dataTransfer.setData("text/itemIndex", index.toString())
    }



    return (
        <section className='flex flex-col w-full h-full gap-2 overflow-hidden p-2'>
            <ItemsFilter itemsList={inventoryData} setListData={setInventoryData} setItemsListToRender={setItemsListToRender} />
            <div className="flex flex-row justify-between gap-2 h-full w-full overflow-hidden ">
                <div className='flex h-full overflow-scroll'>

                    <ul className="flex flex-row items-start justify-start w-full h-fit flex-wrap gap-1 ">

                        {itemsListToRender.map(({ itemData, render }, index) =>
                            itemData != undefined ? (
                                render &&
                                <li
                                    onClick={() => setSelectedItem({
                                        item: itemData,
                                        index: index,
                                        from: 'inventory'
                                    })}
                                    onDragStart={(e) => handleDragStart(e, itemData, index)}
                                    className="relative hover:cursor-pointer flex justify-center items-center border border-stone-500/40 aspect-square rounded-sm h-14 object-cover overflow-hidden border-b-2"
                                    style={{
                                        borderBottomColor: rarityColorSet[itemData.rarity],
                                        boxShadow: `0 0 2px ${rarityColorSet[itemData.rarity]}`
                                    }}>
                                    <img src={itemData.picture} />
                                    <p style={{
                                        background: rarityColorSet[itemData.rarity],
                                        color: getContrastColor(rarityColorSet[itemData.rarity])
                                    }}
                                        className='flex justify-center items-center absolute bottom-0 right-0  h-1/3 min-w-1/3 w-fit  font-thin rounded-tl-sm border-t border-l border-stone-500/40 p-'>{itemData.amount}</p>
                                </li>

                            ) : (
                                <li
                                    onDrop={(e) => handleDropItemInBox(e, index)} onDragOver={(e) => e.preventDefault()}
                                    className="hover:cursor-pointer flex justify-center items-center border border-stone-500/40 aspect-square rounded-sm h-14 object-cover overflow-hidden border-b-2"
                                    style={{
                                        borderBottomColor: "#292524",
                                        boxShadow: `0 0 2px #292524`
                                    }}>
                                </li>
                            )
                        )}
                    </ul>
                </div>
                <div
                    onDragOver={(e) => { e.currentTarget.classList.add("dragOver"); e.preventDefault() }}
                    onDragLeave={(e) => e.currentTarget.classList.remove("dragOver")}
                    onDrop={(e) => { handleDropItemInTrash(e); e.currentTarget.classList.remove("dragOver") }}
                    className='flex flex-col gap-2 justify-center items-center text-center h-full max-w-50 min-w-1/4 w-full  border border-dashed duration-300 border-stone-500/40 text-stone-500/40 rounded-sm'>
                    <Trash2 size={40} strokeWidth={.5} />
                    <p className='font-thin italic'>Drop to Remove</p>
                </div>
            </div>
        </section >
    )
}

function ItemsContainer({ setSelectedItem, setContainerItemsList, containerItemsList }: { containerItemsList: (TItems | undefined)[] | undefined, setSelectedItem: React.Dispatch<React.SetStateAction<{ item: TItems; from: "inventory" | "container"; index: number; } | null>>, setContainerItemsList: React.Dispatch<React.SetStateAction<(TItems | undefined)[]>> }) {
    const [itemsListToRender, setItemsListToRender] = useState<Array<{ itemData: TItems | undefined, render: boolean }>>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchItemsList()
    }, [])


    const fetchItemsList = () => {
        getData({
            endPoint: "getItems",
            onSuccess: (res) => {
                let parsedList = res.data.map((itemData: TItems) => ParseItem(itemData))
                setContainerItemsList(parsedList)
                setIsLoading(false)
            },
            onError: () => {
                setIsLoading(false)
            }
        })
    }

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, itemData: TItems) => {
        e.dataTransfer.setData("text/itemData", JSON.stringify(itemData))
    }

    return (
        <section className='flex flex-col p-2 gap-2 h-full w-full justify-center items-center'>
            {isLoading ?
                <Loader /> :
                containerItemsList && containerItemsList.length > 0 ? (
                    <>
                        <ItemsFilter itemsList={containerItemsList} setListData={setContainerItemsList} setItemsListToRender={setItemsListToRender} />
                        <ul className="flex flex-row w-full h-full flex-wrap gap-1">
                            {itemsListToRender.map(({ itemData, render }, index) =>
                                itemData && render &&
                                <li
                                    draggable={true}
                                    onDragStart={(e) => handleDragStart(e, itemData)}
                                    onClick={() => setSelectedItem?.({
                                        item: itemData,
                                        from: 'container',
                                        index: index
                                    })}
                                    className="relative hover:cursor-grab flex justify-center items-center border border-stone-800 aspect-square rounded-sm h-14 object-cover overflow-hidden border-b-2"
                                    style={{
                                        borderBottomColor: rarityColorSet[itemData.rarity],
                                        boxShadow: `0 0 2px ${rarityColorSet[itemData.rarity]}`
                                    }}>
                                    <img src={itemData.picture} />
                                    <p style={{
                                        background: rarityColorSet[itemData.rarity],
                                        color: getContrastColor(rarityColorSet[itemData.rarity])
                                    }}
                                        className='flex justify-center items-center absolute bottom-0 right-0  h-1/3 min-w-1/3 w-fit  font-thin rounded-tl-sm border-t border-l border-stone-500/40 p-'>{itemData.amount}</p>
                                </li>
                            )}
                        </ul>
                    </>
                ) : (
                    <h1 className='text-3xl text-stone-500/40 font-semibold '>You have no items created</h1>
                )
            }
        </section>
    )
}

function ItemsFilter({ itemsList, setListData, setItemsListToRender }: { itemsList: Array<TItems | undefined>, setListData: React.Dispatch<React.SetStateAction<(TItems | undefined)[]>>, setItemsListToRender: React.Dispatch<React.SetStateAction<{ itemData: TItems | undefined; render: boolean; }[]>> }) {
    const alphaNumeric = "ABCÇDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const textInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        textFilter()
    }, [itemsList])

    const textFilter = () => {
        let renderList: { itemData: TItems | undefined; render: boolean; }[] = []

        renderList = itemsList.map(itemData => {
            let renderState = true
            let inputValue = textInputRef.current?.value.trim().toLowerCase()
            if (itemData != undefined && inputValue && (!itemData?.name.toLocaleLowerCase().trim().includes(inputValue))) {
                renderState = false
            }
            return {
                itemData: itemData,
                render: renderState
            }

        })
        setItemsListToRender(renderList)
    }


    const sortAZ = () => {
        let tempItemsListCopy = structuredClone(itemsList)

        for (let i: number = 0; i < tempItemsListCopy.length; i++) {
            let lowerCharacterItemIndex = i

            for (let j: number = i + 1; j < tempItemsListCopy.length; j++) {
                if (tempItemsListCopy[lowerCharacterItemIndex] == undefined) {
                    lowerCharacterItemIndex = j

                } else if (tempItemsListCopy[j] == undefined) {

                } else {
                    let currentCharacterPosition = 0
                    while (true) {

                        let currentItemCharacterPositionIndAlphaNumeric = alphaNumeric.indexOf(tempItemsListCopy[j]!.name[currentCharacterPosition])
                        let currentLowerItemCharacterPositionIndAlphaNumeric = alphaNumeric.indexOf(tempItemsListCopy[lowerCharacterItemIndex]!.name[currentCharacterPosition])

                        if (currentCharacterPosition > tempItemsListCopy[j]!.name.length) {
                            lowerCharacterItemIndex = j
                            break
                        } else if (currentItemCharacterPositionIndAlphaNumeric == currentLowerItemCharacterPositionIndAlphaNumeric) {
                            currentCharacterPosition += 1
                        } else if (currentItemCharacterPositionIndAlphaNumeric < currentLowerItemCharacterPositionIndAlphaNumeric) {
                            lowerCharacterItemIndex = j
                            break
                        } else {
                            break
                        }
                    }
                }
            }
            let temp = tempItemsListCopy[i]
            tempItemsListCopy[i] = tempItemsListCopy[lowerCharacterItemIndex]
            tempItemsListCopy[lowerCharacterItemIndex] = temp

        }
        return tempItemsListCopy
    }

    const sortZA = () => {
        let listSortedAZ = sortAZ()
        let onlyNotUndefinedItemsListReversed = listSortedAZ.filter(value => value != undefined).reverse()

        let listSortedZA = [...onlyNotUndefinedItemsListReversed, ...Array.from({ length: itemsList.length - onlyNotUndefinedItemsListReversed.length }, () => undefined)]

        return (listSortedZA)

    }

    const sortByRarity = () => {
        let tempRarityList: { "Legendary": TItems[], "Very Rare": TItems[], "Rare": TItems[], "Uncommon": TItems[], "Common": TItems[], "Undefined": Array<TItems | undefined> } = {
            "Legendary": [],
            "Very Rare": [],
            "Rare": [],
            "Uncommon": [],
            "Common": [],
            "Undefined": []
        }

        itemsList.forEach(itemData => {
            if (itemData == undefined) {
                tempRarityList.Undefined.push(itemData)
            } else {
                tempRarityList[itemData.rarity].push(itemData)
            }
        })

        return ([
            ...tempRarityList.Legendary,
            ...tempRarityList["Very Rare"],
            ...tempRarityList.Rare,
            ...tempRarityList.Uncommon,
            ...tempRarityList.Common,
            ...tempRarityList.Undefined
        ])
    }


    return (
        <section className="flex flex-row gap-2 w-full h-8  overflow-hidden">
            <input ref={textInputRef} type="text" onChange={textFilter}
                className="flex border border-stone-500/40 w-full h-full px-2 outline-none text-stone-500 caret-purple-500 focus:border-purple-500 focus:text-purple-500" />
            <ul className='flex flex-row gap-1 w-fit h-full justify-between
                *:p-1 *:relative *:h-full *:aspect-square *:border *:border-stone-500/40 *:text-stone-500/40 *:hover:bg-purple-500/10 *:hover:text-purple-500 *:hover:border-purple-500'>
                <li className='*:hover:cursor-pointer'><button type='button' className='absolute w-full h-full opacity-0' onClick={() => setListData(sortAZ)} /><ArrowDownAz className="flex w-full h-full" /></li>
                <li className='*:hover:cursor-pointer'><button type='button' className='absolute w-full h-full opacity-0' onClick={() => setListData(sortZA)} /><ArrowUpAz className="flex w-full h-full" /></li>
                <li className='*:hover:cursor-pointer'><button type='button' className='absolute w-full h-full opacity-0' /><ArrowDown10 className="flex w-full h-full" /></li>
                <li className='*:hover:cursor-pointer'><button type='button' className='absolute w-full h-full opacity-0' /><ArrowUp10 className="flex w-full h-full" /></li>
                <li className='*:hover:cursor-pointer'><button type='button' className='absolute w-full h-full opacity-0' onClick={() => setListData(sortByRarity)} /><Sparkle className="flex w-full h-full" /></li>
            </ul>
        </section>
    )
}