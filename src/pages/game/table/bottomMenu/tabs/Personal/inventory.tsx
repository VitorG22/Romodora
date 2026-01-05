import { BoxIcon } from "lucide-react"
import { type TItems } from "../../../../../items/itemsClass"
import { useContext } from "react"
import { GameContext } from "../../../../../../scripts/socket"
import { useSelector } from "react-redux"
import type { RootState } from "../../../../../../redux/store"

const rarityColorSet = {
    "Very Rare": "#ad46ff",
    "Common": "#6a7282",
    "Legendary": "#fe9a00",
    "Rare": "#2b7fff",
    "Uncommon": "#00c950"

}


export default function Inventory() {
    const game = useContext(GameContext)
    const { userData } = useSelector((state: RootState) => state.user)
    let userCharacter = game?.tableControl.players.find(playerData => playerData.id == userData.id)?.character

    let InventoryData = userCharacter?.inventory

    return (
        <section className='w-full h-full overflow-hidden'>
            <h1 className="flex gap-1 w-full justify-center mt-1 "><BoxIcon strokeWidth={1} />Inventory</h1>
            <div className='flex flex-row  gap-2 w-full h-full items-start'>
                <div className='w-2/3 gap-2 overflow-y-scroll pt-1 px-2 h-full overflow-scroll'>
                    <ul className='h-fit  flex flex-row flex-wrap justify-start items-start gap-2 pb-12'>
                        {InventoryData?.map(item => <ItemContainer itemData={item} />)}
                    </ul>
                </div>
                <SelectedItemData />
            </div>
        </section>
    )
}

function ItemContainer({ itemData }: { itemData?: TItems }) {
    const game = useContext(GameContext)

    const onLeftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (!itemData) return
        game!.tableControl!.setSelectedObject(itemData.subSelectionId)
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
    } else {
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
    let selectedItem = game!.tableControl.getSelectedObject()

    return (
        <section className='flex flex-col h-full w-1/3 col-start-3 col-end-4'>
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
