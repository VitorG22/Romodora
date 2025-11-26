import { Check, Eye, EyeClosed, Layers, Maximize, Minus, MouseIcon, Move, Pen, Plus, RotateCcw, Trash } from "lucide-react";
import type { TableMap, TableMapEdit, TLayer } from "./mapsClass";
import { useEffect, useRef, useState } from "react";
import { saveMap } from "./mapScript";
import { useNavigate } from "react-router-dom";

export function Container(props: React.ComponentPropsWithoutRef<'section'>) {
    return (
        <section {...props} className='flex h-full w-full absolute left-0 top-0'>
            {props.children}
        </section>
    )
}

export function Controls() {
    return (
        
        <div className="text-stone-600 absolute left-4 bottom-4 flex flex-col gap-1 z-10 bg-stone-300 p-2 border border-stone-900/40 rounded-md">
            <p className=" flex flex-row gap-2"><Move strokeWidth={1} />Move : Shift + Mouse Drag</p>
            <p className="flex flex-row gap-2"><Maximize strokeWidth={1} />Zoom : Mouse Scroll</p>
            <p className="flex flex-row gap-2"><RotateCcw strokeWidth={1} />R : Rotate Tile</p>
            <p className="flex flex-row gap-2"><MouseIcon strokeWidth={1} />Mouse L/R: Place/Remove Tile</p>
        </div>
    )
}


export function GridOptions({ sizeX, sizeY, addGridColumn, deleteGridColumn, addGridRow, deleteGridRow }: { sizeX: number, sizeY: number, addGridColumn: () => void, deleteGridColumn: () => void, addGridRow: () => void, deleteGridRow: () => void }) {
    return (
        <div className="text-stone-600 w-fit flex flex-col gap-1 z-10 bg-stone-300 p-2 border border-stone-900/40 rounded-md">
            <h2>Grid Options</h2>
            <p className="flex flex-row items-center gap-2 text-sm">X : <Minus onClick={deleteGridColumn} strokeWidth={1} size={12} /> {sizeX} <Plus onClick={addGridColumn} strokeWidth={1} size={12} /></p>
            <p className="flex flex-row items-center gap-2 text-sm">Y : <Minus onClick={deleteGridRow} strokeWidth={1} size={12} /> {sizeY} <Plus onClick={addGridRow} strokeWidth={1} size={12} /></p>
        </div>
    )
}

export function SaveMapComponent({ mapObject }: { mapObject: TableMap }) {
    const navigate = useNavigate()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isButtonsDisabled ,setIsButtonsDisabled] = useState<boolean>(false)

    const cancel = () => {
        navigate("/maps")
    }

    const save = () => {
        setIsButtonsDisabled(true)
        if (canvasRef.current) {
            let finalCanvasContext = canvasRef.current.getContext('2d')

            mapObject.layers.forEach(layerData => {
                const canvasElement: HTMLElement | null = document.getElementById(layerData.id)
                if (canvasElement instanceof HTMLCanvasElement) {
                    finalCanvasContext?.drawImage(canvasElement, 0, 0, mapObject.sizeX * 100, mapObject.sizeY * 100)
                }
            })
            const canvasInBase64 = canvasRef.current.toDataURL()
            mapObject.image = canvasInBase64
        }

        saveMap(mapObject,
            () => {
                navigate("/maps")
                setIsButtonsDisabled(false)
            },
            () => {
                console.log("Error on save Map")
                setIsButtonsDisabled(false)
            }
        )
        
    }

    return (
        <div className="text-stone-600  flex flex-row  z-10 bg-stone-300 border border-stone-900/40 rounded-md w-68">
            <button onClick={cancel} disabled={isButtonsDisabled} className="disabled:opacity-80 flex flex-row gap-1 items-center justify-center w-full hover:bg-red-500/40 hover:text-stone-800 rounded-l p-2"><Trash className='h-5' strokeWidth={1} />Cancel</button>
            <button onClick={save} disabled={isButtonsDisabled} className="disabled:opacity-80 flex flex-row gap-1 items-center justify-center w-full hover:bg-emerald-500/40 hover:text-stone-800 rounded-r p-2"><Check className='h-5' strokeWidth={1} />Save</button>
            <canvas className="absolute w-0 h-0" ref={canvasRef} width={mapObject.sizeX * 100} height={mapObject.sizeY * 100} />
        </div>
    )
}

export function LayerOptions({ mapObject }: { mapObject: TableMapEdit }) {
    const [isEditNameActive, setIsEditNameActive] = useState<boolean>(false)
    const mapNameInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        mapObject.setSelectedLayer(mapObject.layers[0].id)
    }, [])

    
    useEffect(() => {
        if (isEditNameActive) {
            mapNameInputRef.current?.focus()
        }
    }, [isEditNameActive])

    const changeMapName = () => {
        if (!mapNameInputRef.current?.value.trim()) {
            setIsEditNameActive(false)
            return
        }
        mapObject.name = mapNameInputRef.current?.value.trim()
        setIsEditNameActive(false)
    }

    return (
        <>
            <div className="text-stone-600  flex flex-col  z-10 bg-stone-300 p-2 border border-stone-900/40 rounded-md divide-stone-900/40 divide-y w-68">
                <div className='flex flex-row justify-between items-center gap-2 pb-2'>
                    <div className='flex flex-row gap-2 items-center'><Layers strokeWidth={1} className='h-5' /> Layers</div>
                    <div className="flex flex-row items-center justify-end gap-2">
                        {isEditNameActive ? (
                            <>
                                <input type="text" ref={mapNameInputRef} onBlur={() => changeMapName()} defaultValue={mapObject.name} className='w-28 text-right outline-0 ' />
                                <Check strokeWidth={1} className="h-5 hover:cursor-pointer" onClick={(e) => { e.stopPropagation(); changeMapName() }}/>
                            </>
                        ) : (
                            <>
                                <p>{mapObject.name}</p>
                                <Pen strokeWidth={1} className="h-5 hover:cursor-pointer" onClick={() => setIsEditNameActive(true)} />
                            </>
                        )}
                    </div>
                </div >
                <ul className="my-2 pb-2 flex flex-col gap-.5 max-h-40 overflow-scroll-x overflow-scroll">
                    {mapObject.layers.map((layerData) =>
                        <LayerComponent key={`layer_option_${layerData.id}`} mapObject={mapObject} isSelectedLayer={layerData.id == mapObject.selectedLayer} layerData={layerData} />
                    )}
                </ul>
                <div className='pb-2'>
                    <button onClick={() => mapObject.addLayer()} className="flex flex-row gap-1 items-center justify-center w-full hover:bg-purple-500/40 hover:text-stone-800 rounded-md py-1 px-2"><Plus className='h-5' strokeWidth={1} />Add Layer</button>
                </div>
            </div >
        </>
    )
}

function LayerComponent({ mapObject, layerData, isSelectedLayer }: { mapObject: TableMapEdit, layerData: TLayer, isSelectedLayer: boolean }) {
    const [isModifyNameActive, setIsModifyNameActive] = useState<boolean>(false)
    const nameInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isModifyNameActive) {
            nameInputRef.current?.focus()
        }
    }, [isModifyNameActive])

    const changeLayerVisibility = (layerData: TLayer) => {
        layerData.show = !layerData.show
        let canvasElement = document.getElementById(layerData.id)
        if (!canvasElement) return
        canvasElement.style.opacity = layerData.show ? "100%" : "0%"
        mapObject.setLayer(layerData)
    }

    const changeLayerName = () => {
        layerData.name = nameInputRef.current?.value || layerData.name
        setIsModifyNameActive(false)
        mapObject.setLayer(layerData)
    }

    return (
        <li onClick={() => mapObject.setSelectedLayer(layerData.id)} style={{ opacity: layerData.show ? "100%" : "40%", borderColor: isSelectedLayer ? "#ad46ff" : 'transparent' }} className="border  flex flex-row gap-2 items-center hover:cursor-pointer py-1 px-2 rounded-sm hover:bg-stone-500/10 ">
            <button onClick={(e) => { e.stopPropagation(); changeLayerVisibility(layerData) }} className="hover:cursor-pointer p-1">
                {layerData.show ?
                    <Eye strokeWidth={1} className="h-5" /> :
                    <EyeClosed strokeWidth={1} className="h-5" />
                }
            </button>
            {
                isModifyNameActive ?
                    <>
                        <input type="text" ref={nameInputRef} onBlur={() => changeLayerName()} defaultValue={layerData.name} className='w-28 outline-0' />
                        <button onClick={(e) => { e.stopPropagation(); changeLayerName() }} className="hover:cursor-pointer p-1 "><Check strokeWidth={1} className="h-5" /></button>
                    </> :
                    <>
                        <p className="w-28">{layerData.name}</p>
                        <button onClick={(e) => { e.stopPropagation(); setIsModifyNameActive(true) }} className="hover:cursor-pointer p-1 "><Pen strokeWidth={1} className="h-5" /></button>
                    </>
            }
            <button onClick={(e) => { e.stopPropagation(); mapObject.deleteLayer(layerData.id) }} className="hover:cursor-pointer p-1 text-red-600"><Trash strokeWidth={1} className="h-5" /></button>

        </li>
    )
}