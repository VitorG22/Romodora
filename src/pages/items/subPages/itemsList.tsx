import { ArrowLeftFromLineIcon, FlaskConicalIcon, Plus, SparklesIcon } from 'lucide-react'
import * as Button from '../../../assets/buttons/buttons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../redux/store'
import { useEffect, useRef } from 'react'
import { getData } from '../../../scripts/axios'
import { changeItemsList } from '../../../redux/itemsSlice'
import { type TItems } from '../itemsClass'


const rarityColorSet = {
    "Very Rare": "#ad46ff",
    "Common": "#6a7282",
    "Legendary": "#fe9a00",
    "Rare": "#2b7fff",
    "Uncommon": "#00c950"

}

export default function ItemsList() {
    const navigate = useNavigate()
    const items = useSelector((state: RootState) => state.items)
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        fetchItemsList()
    }, [])

    const fetchItemsList = () => {
        getData({
            endPoint: "getItems",
            onSuccess: (res) => {
                dispatch(changeItemsList(res.data))
            }
        })
    }


    return (
        <section className='flex flex-row gap-2 px-4 h-full overflow-hidden'>
            <Button.Primary color="white" className='max-w-fit mt-4' onClick={() => navigate('/home')} ><ArrowLeftFromLineIcon strokeWidth={1} /></Button.Primary>
            <ul className=' flex flex-wrap flex-row items-start w-full h-fit max-h-full overflow-scroll gap-2 py-2'>
                <NewItemCard />
                {items?.map(itemData => <ItemCard item={itemData} />)}
            </ul>
        </section>
    )
}


function NewItemCard() {
    const navigate = useNavigate()

    return (
        <li onClick={() => navigate(`../edit/newItem`)} className='relative flex items-center justify-center overflow-hidden h-80 aspect-[3/4] group hover:-translate-y-1 hover:cursor-pointer duration-150 p-2 rounded-sm bg-linear-45 border border-stone-500
            hover:from-purple-700 hover:via-purple-600/50 hover:to-purple-500/50 hover:border-purple-500 hover:text-white'>
            <FlaskConicalIcon strokeWidth={.5} size={250} className="absolute z-10 blur-[2px] -left-[45%] top-[25%]  opacity-10" />
            <Plus strokeWidth={1} size={50} />
        </li>
    )
}

function ItemCard({ item }: { item: TItems }) {
    const navigate = useNavigate()
    const articleRef = useRef<HTMLElement>(null)

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
    useEffect(() => {
        articleRef.current!.style.color = getContrastColor(rarityColorSet[item.rarity])
    }, [])




    return (
        <li onClick={() => navigate(`../edit/${item.id}`)}
            style={{
                borderColor: rarityColorSet[item.rarity],
                background: rarityColorSet[item.rarity] + "80"
            }}
            className='relative flex flex-col items-center justify-between overflow-hidden h-80 aspect-[3/4] group hover:-translate-y-1 hover:cursor-pointer duration-150 p-2 pb-0 rounded-sm border-2 gap-2'>
            <div className='flex w-full aspect-square rounded-sm overflow-hidden z-10'>
                <img src={item.picture} className='w-full h-full object-cover' />
            </div>
            <article ref={articleRef} style={{ background: rarityColorSet[item.rarity] + '70', borderColor: rarityColorSet[item.rarity] }} className='flex flex-col max-h-full h-1/3 p-2 text-start w-full z-10 border-2 border-b-0 rounded-t-sm text-stone-900'>
                <h1 className='flex flex-row items-center gap-2 h-fit'>{item.name}
                    {item.isMagic && <SparklesIcon size={15} />}
                </h1>
                <p className='italic text-sm'>{item.description}</p>
            </article>
            <div style={{ background: rarityColorSet[item.rarity] + '98' }} className='w-[200%] h-[40%] rotate-45 absolute z-0 left-0 top-0' />
            <div style={{ background: rarityColorSet[item.rarity] + '60' }} className='w-[240%] h-[60%] rotate-40 absolute z-0 -left-40 top-0' />
            <div style={{ background: rarityColorSet[item.rarity] + '40' }} className='w-[200%] h-[40%] rotate-10 absolute z-0 left-0 top-40' />
            <div style={{ background: rarityColorSet[item.rarity] + '60' }} className='w-[200%] h-[40%] rotate-80 absolute z-0 -left-60 top-20' />
            <div style={{ background: rarityColorSet[item.rarity] + '70' }} className='w-[200%] h-[40%] -rotate-45 absolute z-0 -left-5 bottom-0' />
            <div style={{ background: rarityColorSet[item.rarity] + '60' }} className='w-[200%] h-[40%] -rotate-10 absolute z-0 -left-10 top-0' />
        </li>
    )
}
