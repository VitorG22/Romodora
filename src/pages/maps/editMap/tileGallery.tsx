import { useEffect, useRef, useState } from "react"
import { getData } from "../../../scripts/axios"
import { Loader } from "../../../assets/loader/loader"
export interface ITile {
    name: string,
    path: string,
    size: { x: number, y: number }
    group: string
}

type ITileGroup = ITile[]

interface ITileList {
    [key: string]: ITileGroup
}

export default function TileGallery({ selectedTile, setSelectedTile, tileDirection, setTileDirection }: { selectedTile: ITile | null, setSelectedTile: React.Dispatch<React.SetStateAction<ITile | null>>, tileDirection: "top" | "left" | "bottom" | "right", setTileDirection: React.Dispatch<React.SetStateAction<"top" | "left" | "bottom" | "right">> }) {
    const [tileList, setTileList] = useState<ITileList | null>(null)
    const [selectedGroup, setSelectedGroup] = useState<number>(0)
    const [tileListToRender, setTileListToRender] = useState<ITileGroup | null>(null)
    const sectionRef = useRef<HTMLElement>(null)

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
        const rotateTile = (e: KeyboardEvent) => {
            if (e.key != "r") { return }
            switch (tileDirection) {
                case "top":
                    setTileDirection("left")
                    break
                case "left":
                    setTileDirection("bottom")
                    break
                case "bottom":
                    setTileDirection("right")
                    break
                case "right":
                    setTileDirection("top")
                    break
            }
        }


        window.addEventListener("keydown", rotateTile)
        return () => {
            window.removeEventListener("keydown", rotateTile)
        }
    }, [tileDirection])

    useEffect(() => {
        if (tileList == null) { return }
        setTileListToRender(Object.values(tileList)[selectedGroup])

    }, [selectedGroup, tileList])


    return (
        <section ref={sectionRef} className='flex flex-col bg-stone-900 text-stone-300 w-full h-full relative'>

            {tileList != null &&
                <div className="w-full overflow-scroll scroll-smooth absolute top-0 left-0 z-10 bg-stone-900 border-b border-t border-stone-950/50">
                    <ul className='flex flex-row w-fit  h-10 '>
                        {Object.keys(tileList)?.map((groupName, index) =>
                            <li onClick={() => setSelectedGroup(index)} className={`hover:cursor-pointer flex flex-row items-center px-2 text-nowrap border-b ${selectedGroup == index ? ('border-purple-500') : ('border-transparent')} `}>
                                {groupName.replace('_', ' ')}
                            </li>
                        )}
                    </ul>
                </div>
            }
            {tileListToRender != null &&
                <ul className="grid grid-cols-4 pt-10  px-4  items-between w-full items-center gap-2 overflow-x-hidden overflow-scroll" >
                    {Object.values(tileListToRender)?.map((tileData, tileIndex) =>
                        <li key={`tileComponent_${tileData.group}_${tileData.path}_${tileIndex}`} onClick={() => setSelectedTile(tileData)} className={`flex flex-col w-full ring relative h-full hover:cursor-pointer hover:scale-105 hover:ring-purple-500 ${selectedTile?.path == tileData.path ? ('ring-purple-500') : ('ring-stone-950/50')}`}>
                            <div className='absolute top-2 right-2 bg-stone-950/50 rounded-full text-stone-300 text-xs font-thin px-4 py-1'>{tileData.size.x}x{tileData.size.y}</div>
                            <div className="w-full ">
                                <ImageComponent path={tileData?.path} />
                            </div>
                            <p className=' text-x  overflow-hidden p-1'>{tileData.name}</p>
                        </li>
                    )}
                </ul>

            }
            {selectedTile &&
            <div className="flex flex-row px-4 py-2  gap-2 text-neutral-300 border-t-2 border-stone-950/50 w-full min-h-1/4">
                <div style={{ rotate: tileDirection == "top" ? '0deg' : tileDirection == "left" ? "90deg" : tileDirection == 'bottom' ? "180deg" : tileDirection == "right" ? "270deg" : "auto" }}>
                    <ImageComponent path={selectedTile?.path} />
                </div>
                <article>
                    <h2 className='font-semibold text-stone-300 text-xl'>{selectedTile?.name}</h2>
                    <h3 className=' italic text-stone-500 text-md'>{selectedTile?.group}</h3>
                    <p className="text-stone-300 italic font-thin">Width: <span className="text-stone-300 not-italic ">{selectedTile?.size.x}</span></p>
                    <p className="text-stone-300 italic font-thin">Height: <span className="text-stone-300 not-italic ">{selectedTile?.size.y}</span></p>
                </article>
            </div>
            }
        </section >
    )
}

function ImageComponent({ path }: { path: string | undefined }) {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const imageRef = useRef<HTMLImageElement>(null)

    const onErrorFunction = () => {
        if (!imageRef.current) return
        imageRef.current.src = ''
        setTimeout(() => {
            if (!imageRef.current) return
            imageRef.current.src = path || ""
        }, 100)
    }

    const onLoadFunction = () => {
        setIsLoaded(true)
        if (!imageRef.current) return
        imageRef.current.style.height = "100%"
    }

    return (
        <>
            {!isLoaded &&
                <div className=" flex justify-center items-center h-full aspect-square">
                    <Loader />
                </div>
            }
            <img ref={imageRef} onError={onErrorFunction} onLoad={onLoadFunction} loading='lazy' src={path} className="object-contain h-0  aspect-square" />
        </>
    )

}
