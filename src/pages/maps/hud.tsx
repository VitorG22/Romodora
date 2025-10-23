import { Check, Eye, EyeClosed, Layers, Maximize, Minus, Move, Pen, Plus, Trash } from "lucide-react";
import type { TLayer } from "./mapsClass";
import { useEffect, useRef, useState } from "react";


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
        </div>
    )
}


export function GridOptions({ sizeX, sizeY, addGridColumn, deleteGridColumn, addGridRow, deleteGridRow }: { sizeX: number, sizeY: number, addGridColumn: () => void, deleteGridColumn: () => void, addGridRow: () => void, deleteGridRow: () => void }) {
    return (
        <div className="text-stone-600 w-fit flex flex-col gap-1 z-10 bg-stone-300 p-2 border border-stone-900/40 rounded-md">
            <h2>Grid Options</h2>
            <p className=" flex flex-row items-center gap-2 text-sm">X : <Minus onClick={deleteGridColumn} strokeWidth={1} size={12} /> {sizeX} <Plus onClick={addGridColumn} strokeWidth={1} size={12} /></p>
            <p className=" flex flex-row items-center gap-2 text-sm">Y : <Minus onClick={deleteGridRow} strokeWidth={1} size={12} /> {sizeY} <Plus onClick={addGridRow} strokeWidth={1} size={12} /></p>
        </div>
    )
}

export function LayerOptions({ layerList, setLayer, addLayer, deleteLayer, setSelectedLayer, selectedLayer }: { layerList: TLayer[], setLayer: (layerData: TLayer) => void, addLayer: () => void, deleteLayer: (layerId: string) => void, setSelectedLayer: (layerId: string) => void, selectedLayer: string }) {


    return (
        <div className="text-stone-600  flex flex-col  z-10 bg-stone-300 p-2 border border-stone-900/40 rounded-md divide-stone-900/40 divide-y w-68">
            <h2 className='flex flex-row gap-2 pb-2'><Layers strokeWidth={1} /> Layers</h2>
            <ul className="showScroll my-2 flex flex-col gap-.5 max-h-40 overflow-scroll-x overflow-scroll pr-2">
                {layerList.map((layerData) =>
                    <LayerComponent key={`layer_option_${layerData.id}`} isSelectedLayer={layerData.id == selectedLayer} setSelectedLayer={setSelectedLayer} layerData={layerData} setLayer={setLayer} deleteLayer={deleteLayer} />
                )}
            </ul>
            <button onClick={addLayer} className="flex flex-row gap-1 mt-2 items-center justify-center w-full hover:bg-purple-500/40 hover:text-stone-800 rounded-md py-1 px-2"><Plus className='h-5' strokeWidth={1} />Add Layer</button>
        </div>
    )
}

function LayerComponent({ layerData, isSelectedLayer, setLayer, deleteLayer, setSelectedLayer }: { layerData: TLayer, isSelectedLayer: boolean, setLayer: (layerData: TLayer) => void, deleteLayer: (layerId: string) => void, setSelectedLayer: (layerId: string) => void }) {
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
        setLayer(layerData)
    }

    const changeLayerName = () => {
        layerData.name = nameInputRef.current?.value || layerData.name
        setIsModifyNameActive(false)
        setLayer(layerData)
    }

    return (
        <li onClick={() => setSelectedLayer(layerData.id)} style={{ opacity: layerData.show ? "100%" : "40%", borderColor: isSelectedLayer ? "#ad46ff" : 'transparent' }} className="border  flex flex-row gap-2 items-center hover:cursor-pointer py-1 px-2 rounded-sm hover:bg-stone-500/10 ">
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
            <button onClick={(e) => { e.stopPropagation(); deleteLayer(layerData.id) }} className="hover:cursor-pointer p-1 text-red-600"><Trash strokeWidth={1} className="h-5" /></button>

        </li>
    )
}