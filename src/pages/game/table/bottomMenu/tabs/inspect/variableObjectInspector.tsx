import { ChevronLeft, ChevronRight, SparklesIcon } from "lucide-react";
import { Ammo, MeleeWeapon, RangedWeapon, type TItems } from "../../../../../items/itemsClass";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../../../../scripts/socket";

export default function VariableObjectInspector() {
    const game = useContext(GameContext)
    const [object, setObject] = useState<TItems | undefined>(undefined)

    useEffect(() => {
        setObject(game!.tableControl.getSelectedObject())
    }, [game?.tableControl])


    switch (true) {
        case (object instanceof MeleeWeapon):
            return <MeleeWeaponInspector object={object} />
        case (object instanceof RangedWeapon):
            return <RangedWeaponInspector object={object} />
        case (object instanceof Ammo):
            return <AmmoInspector object={object} />
    }
}

function MeleeWeaponInspector({ object }: { object: MeleeWeapon }) {

    const amountPlus = () => {
        if (object.amount + 1 > object.maxStack) return
        object.amount += 1
        object.emitUpdatedItem()
    }
    const amountMinus = () => {
        if (object.amount - 1 <= 0) return
        object.amount -= 1
        object.emitUpdatedItem()

    }

    const pricePlus = () => {
        object.price += 1
        object.emitUpdatedItem()
    }
    const priceMinus = () => {
        if (object.price - 1 < 0) return
        object.price -= 1
        object.emitUpdatedItem()

    }


    return (
        <>
            <article className="">
                <p className='font-semibold flex flex-row gap-1 text-nowrap'>Name: <span className='italic font-thin flex flex-row items-center'> {object.isMagic && <SparklesIcon strokeWidth={1} className="h-2/3" />}{object.name}</span></p>
                <ul>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>Amount:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={amountMinus} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{object.amount}</p>
                        <button onClick={amountPlus} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>Unit Price:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={priceMinus} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{object.price}</p>
                        <button onClick={pricePlus} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'>
                        <p className='font-semibold'>Dmg Type: </p>
                        <p className='font-thin italic'>{object.damage.type}</p>
                    </li>
                    <li className='flex flex-row gap-1'>
                        <p className='font-semibold'>Damage: </p>
                        <p className='font-thin italic'>{object.damage.diceCount}D{object.damage.diceValue}</p>
                    </li>
                    {object.damage.versatileDiceValue && <li className='flex flex-row gap-1'>
                        <p className='font-semibold'>Versatile Damage: </p>
                        <p className='font-thin italic'>{object.damage.diceCount}D{object.damage.versatileDiceValue}</p>
                    </li>}
                    <li className='flex flex-row gap-1'>
                        <p className='font-semibold'>Range: </p>
                        <p className='font-thin italic'>{object.range}</p>
                    </li>
                    <li className='flex flex-row gap-1'>
                        <p className='font-semibold'>Weight: </p>
                        <p className='font-thin italic'>{object.weight}</p>
                    </li>
                </ul>
            </article>
            <div className='flex overflow-hidden h-full w-fit rounded-md'>
                <img src={object.picture} className='object-contain' />
            </div>
        </>
    )
}


function RangedWeaponInspector({ object }: { object: RangedWeapon }) {

    const amountPlus = () => {
        if (object.amount + 1 > object.maxStack) return
        object.amount += 1
        object.emitUpdatedItem()
    }
    const amountMinus = () => {
        if (object.amount - 1 <= 0) return
        object.amount -= 1
        object.emitUpdatedItem()

    }

    const pricePlus = () => {
        object.price += 1
        object.emitUpdatedItem()
    }
    const priceMinus = () => {
        if (object.price - 1 < 0) return
        object.price -= 1
        object.emitUpdatedItem()

    }

    return (
        <>
            <article className="">
                <p className='font-semibold flex flex-row gap-1'>Name: <span className='italic font-thin flex flex-row items-center'> {object.isMagic && <SparklesIcon strokeWidth={1} className="h-2/3" />}{object.name}</span></p>
                <ul>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>Amount:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={amountMinus} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{object.amount}</p>
                        <button onClick={amountPlus} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>Unit Price:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={priceMinus} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{object.price}</p>
                        <button onClick={pricePlus} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'>
                        <p className='font-semibold'>Dmg Type: </p>
                        <p className='font-thin italic'>{object.damage.type}</p>
                    </li>
                    <li className='flex flex-row gap-1'>
                        <p className='font-semibold'>Damage: </p>
                        <p className='font-thin italic'>{object.damage.diceCount}D{object.damage.diceValue}</p>
                    </li>
                    {object.damage.versatileDiceValue && <li className='flex flex-row gap-1'>
                        <p className='font-semibold'>Versatile Damage: </p>
                        <p className='font-thin italic'>{object.damage.diceCount}D{object.damage.versatileDiceValue}</p>
                    </li>}
                    <li className='flex flex-row gap-1'>
                        <p className='font-semibold'>Range: </p>
                        <p className='font-thin italic'>{object.range.normal}</p>
                    </li>
                    <li className='flex flex-row gap-1'>
                        <p className='font-semibold'>Long Range: </p>
                        <p className='font-thin italic'>{object.range.long}</p>
                    </li>
                    <li className='flex flex-row gap-1'>
                        <p className='font-semibold'>Weight: </p>
                        <p className='font-thin italic'>{object.weight}</p>
                    </li>
                </ul>
            </article>
            <div className='flex overflow-hidden h-full w-fit rounded-md'>
                <img src={object.picture} className='object-contain' />
            </div>
        </>
    )
}


function AmmoInspector({ object }: { object: Ammo }) {

    const amountPlus = () => {
        if (object.amount + 1 > object.maxStack) return
        object.amount += 1
        object.emitUpdatedItem()
    }
    const amountMinus = () => {
        if (object.amount - 1 <= 0) return
        object.amount -= 1
        object.emitUpdatedItem()

    }

    const pricePlus = () => {
        object.price += 1
        object.emitUpdatedItem()
    }
    const priceMinus = () => {
        if (object.price - 1 < 0) return
        object.price -= 1
        object.emitUpdatedItem()

    }


    return (
        <>
            <article className="">
                <p className='font-semibold flex flex-row gap-1'>Name: <span className='italic font-thin flex flex-row items-center'> {object.isMagic && <SparklesIcon strokeWidth={1} className="h-2/3" />}{object.name}</span></p>
                <ul>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>Amount:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={amountMinus} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{object.amount}</p>
                        <button onClick={amountPlus} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    <li className='flex flex-row gap-1'><p className='font-semibold'>Unit Price:</p><div className='flex flex-row gap-1 items-center font-thin italic'>
                        <button onClick={priceMinus} className='h-full w-fit hover:cursor-pointer hover:bg-stone-800'><ChevronLeft className="h-1/2" /></button>
                        <p>{object.price}</p>
                        <button onClick={pricePlus} className='h-full hover:cursor-pointer hover:bg-stone-800'><ChevronRight className="h-1/2" /></button>
                    </div></li>
                    {object.damage.fixedValue ? (
                        <li className='flex flex-row gap-1'>
                            <p className='font-semibold'>Damage: </p>
                            <p className='font-thin italic'>{object.damage.fixedValue}</p>
                        </li>
                    ) : (
                        <>
                            <li className='flex flex-row gap-1'>
                                <p className='font-semibold'>Damage: </p>
                                <p className='font-thin italic'>{object.damage.diceCount}D{object.damage.diceValue}</p>
                            </li>
                            {object.damage.bonus > 0 &&
                                <li className='flex flex-row gap-1'>
                                    <p className='font-semibold'>Bonus: </p>
                                    <p className='font-thin italic'>{object.damage.bonus}</p>
                                </li>
                            }
                        </>
                    )
                    }
                    <li className='flex flex-row gap-1'>
                        <p className='font-semibold'>Weight: </p>
                        <p className='font-thin italic'>{object.weight}</p>
                    </li>
                </ul >
            </article >
            <div className='flex overflow-hidden h-full w-fit rounded-md'>
                <img src={object.picture} className='object-contain' />
            </div>
        </>
    )
}