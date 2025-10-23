import { useEffect, useState } from "react"
import { getData } from "../../scripts/axios"

interface ITile {
    name: string,
    path: string,
    size: { x: number, y: number }
}

type ITileGroup = ITile[]

interface ITileList {
    [key: string]: ITileGroup
}

export default function TileGallery() {
    const [tileList, setTileList] = useState<ITileList | null>(null)

    useEffect(() => {
        getData({
            endPoint: "mapAssets",
            onSuccess: (res) => {
                setTileList(res.data)
            },
            onError: (res) => { console.log(res) }
        })
    }, [])

    useEffect(() => {
        if (tileList == null) { return }
        // Object.values(tileList)?.map(tiles => console.log(tiles))
        // Object.keys(tileList)?.map(group => console.log(group))
    }, [tileList])


    return (
        <section className='flex px-4 bg-stone-900 text-stone-300 w-4xl h-full overflow-x-hidden overflow-scroll'>
            {tileList != null &&
                <ul className="grid grid-cols-4  items-between w-full items-center gap-2" >
                    {Object.values(tileList)?.map(tiles => tiles.map(tileData =>
                        <li className="flex flex-col w-full ring ring-stone-950/50 relative">
                            <div className='absolute top-2 right-2 bg-stone-950/50 rounded-full text-stone-300 text-xs font-thin px-4 py-1'>{tileData.size.x}x{tileData.size.y}</div>
                            <div className="w-full ">
                                <img src={tileData.path} className="object-contain w-full h-full aspect-square" />
                            </div>
                            <p className='text-x  overflow-hidden '>{tileData.name}</p>
                        </li>
                    ))}
                </ul>
            }
            <div>

            </div>
        </section >
    )
}