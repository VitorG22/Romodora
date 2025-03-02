import { useContext, useEffect, useRef, useState } from "react"
import { IPotion, ItemPotion, IWeapon } from "../../../classes/itemClasses."
import { PostData } from "../../../scripts/api/postData"
import { AppContext } from "../../../AppContext"
import { CircleFadingPlus, Flame, FlaskRound, Skull, Snowflake, Sword, Zap } from "lucide-react"
import { AnsiHtml } from "fancy-ansi/react"
import ShowItem from "./showItem"
import { TransparentLoader } from "../../../components/loaders/loader"

export default function ItemsGallery() {
    const { mainUser } = useContext(AppContext)
    const [itemsList, setItemsList] = useState<Array<ItemPotion>>()
    const [isFetchingItems, setIsFetchingItems] = useState<boolean>(false)
    const [selectedItemToShow, setSelectedItemToShow] = useState<string|undefined>(undefined)
    

    useEffect(() => {
        (async () => {
            setIsFetchingItems(true)
            await PostData({
                data: { userId: mainUser.id },
                route: '/getItems'
            })
                .then(res => {
                    console.log(res)
                    let listOfItems: Array<ItemPotion> = []
                    if (res.data.status == "success") {
                        res.data.result.forEach((itemData: IPotion | IWeapon) => {
                            switch (itemData.type) {
                                case 'potion':
                                    listOfItems.push(new ItemPotion(itemData))
                                    break
                                case 'money':
                                    listOfItems.push(new ItemPotion(itemData))
                                    break
                                case 'weapon':
                                    listOfItems.push(new ItemPotion(itemData))
                                    break
                                case 'utility':
                                    listOfItems.push(new ItemPotion(itemData))
                                    break
                            }
                        })
                        setItemsList(listOfItems)
                    }
                    return (listOfItems)
                })
                .then(res => console.log(res))
                .finally(() => setIsFetchingItems(false))

        })()
    }, [])

    return (
        <section className='h-screen w-screen flex flex-col gap-6'>
            {isFetchingItems && <TransparentLoader/>}
            <h1 className='pt-4 text-3xl font-semibold  text-romo-500 italic px-4'>
                Gallery
                <hr className='border-romo-500' />
            </h1>
            <ul className='flex flex-row flex-wrap gap-2 h-full overflow-scroll pb-4 px-4'>
                {itemsList?.map(itemData => {
                    switch (itemData.type) {
                        case "potion":
                            return <PotionItemCard itemData={itemData} setSelectedItemToShow={setSelectedItemToShow} key={`itemCardId_${itemData.id}`} />
                        // case "weapon":
                        // return <WaeponItemCard itemData={itemData} key={`itemCardId_${itemData.id}`} />
                    }
                }
                )}
            </ul>
            {selectedItemToShow != undefined && <ShowItem setSelectedItemToShow={setSelectedItemToShow} itemId={selectedItemToShow}/>}
        </section>
    )
}

function WaeponItemCard({ itemData }: { itemData: IWeapon }) {
    return (
        <li className='group relative aspect-[3/4] w-60 shadow-lg'>
            <ul className='absolute top-2 right-2 flex flex-row gap-1'>
                <Sword size={15} strokeWidth={1} />
                {itemData.damage?.damageType == 'poison' && <Skull size={15} strokeWidth={1} />}
                {itemData.damage?.damageType == 'electro' && <Zap size={15} strokeWidth={1} />}
                {itemData.damage?.damageType == 'fire' && <Flame size={15} strokeWidth={1} />}
                {itemData.damage?.damageType == 'ice' && <Snowflake size={15} strokeWidth={1} />}
            </ul>
            <div className='h-60 aspect-square overflow-hidden justify-center'>
                <img src={itemData.image}
                    className='object-cover min-w-full min-h-full'
                />
            </div>
            <article className='grid rows-2 columns-2 p-3 bg-gradient-to-br from-romo-500 via-romo-500 to-cyan-400/10'>
                <h1 className="text-md font-thin text-romo-200 row-start-1 row-end-2 col-start-1 col-end-2">{itemData.name}</h1>
                <p className="text-xs italic text-romo-200/70 row-start-2 row-end-3 col-start-1 col-end-3">{itemData.description}</p>
            </article>
        </li>
    )
}

function PotionItemCard({ itemData,setSelectedItemToShow }: { itemData: IPotion, setSelectedItemToShow:React.Dispatch<React.SetStateAction<string | undefined>> }) {

    return (
        <li className=' group relative aspect-[3/4] w-60 h-fit shadow-sm' onClick={()=> setSelectedItemToShow(itemData.id)}>
            <ul className='absolute top-2 right-2 flex flex-row gap-1 z-10'>
                <FlaskRound size={15} strokeWidth={1} />
                {!!itemData.heal?.diceAmount && <CircleFadingPlus size={15} strokeWidth={1} />}
                {itemData.damage?.damageType == 'poison' && <Skull size={15} strokeWidth={1} />}
                {itemData.damage?.damageType == 'electro' && <Zap size={15} strokeWidth={1} />}
                {itemData.damage?.damageType == 'fire' && <Flame size={15} strokeWidth={1} />}
                {itemData.damage?.damageType == 'ice' && <Snowflake size={15} strokeWidth={1} />}

            </ul>
            <div className='h-60 aspect-square overflow-hidden justify-center'>
                <img src={itemData.image}className='object-cover min-w-full min-h-full'/>
            </div>
            <article className='grid rows-2 columns-2 p-3 bg-gradient-to-br from-romo-500 via-romo-500 to-romo-200/10'>
                <h1 className="text-md font-thin text-romo-200 row-start-1 row-end-2 col-start-1 col-end-2">{itemData.name}</h1>
            <AnsiHtml text={itemData.description} className='text-xs italic text-romo-200/70 row-start-2 row-end-3 col-start-1 col-end-3'/>
            </article>
        </li>
    )
}