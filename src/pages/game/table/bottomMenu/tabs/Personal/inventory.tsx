import { BoxIcon } from "lucide-react"
import { Ammo, MeleeWeapon, RangedWeapon } from "../../../../../items/itemsClass"
import { useContext } from "react"
import { GameContext } from "../../../../../../scripts/socket"

const rarityColorSet = {
    "Very Rare": "#ad46ff",
    "Common": "#6a7282",
    "Legendary": "#fe9a00",
    "Rare": "#2b7fff",
    "Uncommon": "#00c950"

}

type TItem = MeleeWeapon | RangedWeapon | Ammo | undefined
export default function Inventory() {

    let InventoryData = [
        new MeleeWeapon({
            id: '',
            amount: 1,
            damage: {
                bonus: 2,
                diceCount: 2,
                diceValue: 8,
                type: "bludgeoning",
            },
            description: "Lorem Ipsum doler sit amneu",
            isMagic: true,
            maxStack: 1,
            name: "Teste Sword",
            price: 100,
            property: ["finesse", "heavy"],
            range: 1.5,
            rarity: "Very Rare",
            type: "meleeWeapon",
            weight: 1.5,
            picture: "https://i.pinimg.com/736x/ac/fa/87/acfa874d54f1922eab9f4d93865f968c.jpg",
        }),
        new RangedWeapon({
            id:'',
            amount: 1,
            damage: {
                bonus: 2,
                diceCount: 1,
                diceValue: 10,
                type: 'piercing',
            },
            description: "Lorem Ipsum doler sit amneu",
            isMagic: false,
            maxStack: 1,
            name: "Teste Bow",
            price: 120,
            property: ["ammunition"],
            range: {
                normal: 80,
                long: 150
            },
            rarity: "Rare",
            type: "rangedWeapon",
            weight: 1,
            picture: "https://i.pinimg.com/1200x/e7/8f/3b/e78f3b4d0516b7717d0e96e49b6685cb.jpg",
        }),
        new MeleeWeapon({
            amount: 1,
            id:'',
            damage: {
                bonus: 2,
                diceCount: 4,
                diceValue: 10,
                type: "bludgeoning",
            },
            description: "Lorem Ipsum doler sit amneu",
            isMagic: true,
            maxStack: 1,
            name: "Battle Hammer",
            price: 3700,
            property: ["two-handed"],
            range: 2,
            rarity: "Legendary",
            type: "meleeWeapon",
            weight: 6,
            picture: "https://i.pinimg.com/736x/55/3c/03/553c0349b5b44d6711dce9c7ecf024a8.jpg",
        }),
        undefined,
        undefined,
        undefined,
        undefined,
    ]


    return (
        <section className='w-full h-full'>
            <h1 className="flex gap-1 w-full justify-center mt-1 "><BoxIcon strokeWidth={1} />Inventory</h1>
            <div className='flex flex-row gap-2 h-full w-full'>
                <SelectedItemData />
                <ul className='w-full flex flex-wrap gap-2 overflow-scroll pt-1 px-2'>
                    {InventoryData.map(item => <ItemContainer itemData={item} />)}
                </ul>
            </div>
        </section>
    )
}

function ItemContainer({ itemData }: { itemData?: TItem}) {
    const game = useContext(GameContext)

    const onLeftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (!itemData) return
        game!.tableControl!.setSelectedObject(itemData)
    }

    const onRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();

    }


    if (itemData) {
        return (
            <div
                onClick={(e) => onLeftClick(e)}
                onAuxClick={(e) => onRightClick(e)}
                onContextMenu={(e => e.preventDefault())}
                className="hover:cursor-pointer flex justify-center items-center border border-stone-800 aspect-square rounded-sm h-10 object-cover overflow-hidden border-b-2"
                style={{ 
                    borderBottomColor: rarityColorSet[itemData.rarity],
                    boxShadow: `0 0 2px ${rarityColorSet[itemData.rarity]}`
                    }}>
                <img src={itemData.picture} />
            </div>
        )
    }else{
        return (
            <div
                onClick={(e) => onLeftClick(e)}
                onAuxClick={(e) => onRightClick(e)}
                onContextMenu={(e => e.preventDefault())}
                className="hover:cursor-pointer flex justify-center items-center border border-stone-800 aspect-square rounded-sm h-10 object-cover overflow-hidden">
            </div>
        )

    }
}

function SelectedItemData() {
    const game = useContext(GameContext)
    let selectedItem = game?.tableControl.selectedObject

    return (
        <section className='flex flex-col h-full w-3/5'>
            {selectedItem &&
                <>
                    <div className='flex flex-row'>
                        <div className="flex justify-center w-2/3 items-center aspect-square rounded-sm object-cover overflow-hidden">
                            <img src={selectedItem.picture} />
                        </div>
                        <article className='flex flex-col w-full text-sm justify-between py-0.5 pl-1'>
                            <h1 className='font-semibold' style={{ color: rarityColorSet[selectedItem.rarity] }}>
                                {selectedItem.name}
                            </h1>
                            <p>Damage: {selectedItem.damage.diceCount}d{selectedItem.damage.diceValue}</p>
                            <p>Price: {selectedItem.price}</p>
                            <p>Weight: {selectedItem.weight}</p>
                        </article>
                    </div>
                    <article className='flex h-full text-xs  italic'>
                        {selectedItem.description}
                    </article>
                </>
            }

        </section>
    )
}
