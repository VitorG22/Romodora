import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IPotion } from "../../../../classes/itemClasses."
import { GetData } from "../../../../scripts/api/getData"
import { AnsiHtml } from "fancy-ansi/react"
import { TransparentLoader } from "../../../../components/loaders/loader"


export default function ShowItem({ itemId, setSelectedItemToShow }: { itemId: string, setSelectedItemToShow: React.Dispatch<React.SetStateAction<string | undefined>> }) {
    const [itemData, setItemData] = useState<IPotion>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            await GetData({
                route: `/getItembyId/${itemId}`
            })
                .then(res => {
                    if (res.data.status == "success") {
                        let selectedItemData = res.data.result
                        selectedItemData.description = selectedItemData.description.replace(/-ansi-/g, "\x1b[")
                        setItemData(selectedItemData)
                    }else(setSelectedItemToShow(undefined))
                }
                )
                .catch(()=> setSelectedItemToShow(undefined))
                .finally(() => { setIsLoading(false) })
        })()
    }, [])

    return (
        <section>
            {isLoading ? (
                <TransparentLoader />
            ) : (<>
                {itemData &&
                    <main className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center'>
                        <section className='absolute self-center z-30 w-4/5 max-w-lg m-4 p-2 bg-romo-950 flex flex-col'>
                            <div className='flex flex-row'>
                                <div className='w-56 h-56 overflow-hidden'>
                                    <img src={itemData.image} className='object-fill' />
                                </div>
                                <ItemInfoSection itemData={itemData} />
                            </div>
                            <article className='text-romo-200/90 px-2 py-4'>
                                <AnsiHtml text={itemData.description} />
                            </article>
                        </section>
                        <div id="backDropLayer" className='z-20 absolute top-0 left-0 h-full w-full bg-romo-950/40 backdrop-blur-[3px]' onClick={() => setSelectedItemToShow(undefined)} />
                    </main>
                }
            </>
            )}
        </section>
    )
}

function ItemInfoSection({ itemData }: { itemData: IPotion }) {
    return (
        <section className='row-start-1 row-end-2 col-start-2 col-end-3'>
            <ul className='flex flex-col h-fit w-full gap-1 *:px-2 *:pl-4 *:bg-romo-950 *:rounded-sm'>
                {!!itemData.damage?.diceAmount &&
                    <li><article>
                        <h1 className='text-md font-semibold text-romo-200/50 italic'>Damage</h1>
                        <p>Type: {itemData.damage?.damageType}</p>
                        <p>Value: {itemData.damage?.diceAmount} x D{itemData.damage.diceType}</p>
                        <p>Area of effect: {itemData.damage.effectArea}</p>
                    </article></li>
                }
                {!!itemData.heal?.diceAmount &&
                    <li><article>
                        <h1 className='text-md font-semibold text-romo-200/50 italic'>Heal</h1>
                        <p>Value: {itemData.heal.diceAmount} x D{itemData.heal.diceType}</p>
                        <p>Area of effect: {itemData.heal.effectArea}</p>
                    </article></li>
                }
                {itemData.launch.isLaunchable &&
                    <li><article>
                        <h1 className='text-md font-semibold text-romo-200/50 italic'>Throw</h1>
                        <p>Throwing distance: {itemData.launch.range}</p>
                    </article></li>
                }
            </ul>
        </section>
    )
}

function CreatorArea({ itemData }: { itemData: IPotion }) {
    return (
        <div className='col-start-4 col-end-7 row-start-5 row-end-7'>

        </div>
    )
}