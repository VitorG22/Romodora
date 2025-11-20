import { useEffect } from "react"
import { DefaultCanvasElement, DefaultGridElement} from "./canvas"
import * as HUD from './hud'
import type { TableMapEdit } from "./mapsClass"
import type { ITile } from "./tileGallery"

export default function Table({mapObject, selectedTile ,tileDirection}:{mapObject:TableMapEdit,selectedTile:ITile|null , tileDirection: 'top'|'left'|'right'|'bottom'}) {

    useEffect(()=>{
        mapObject.reDrawAll()
    },[])
    
    return (
        <>
            <HUD.Container>
                <HUD.Controls />
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    <HUD.GridOptions sizeX={mapObject.sizeX} sizeY={mapObject.sizeY} addGridRow={mapObject.addGridRow} deleteGridRow={mapObject.deleteGridRow} addGridColumn={mapObject.addGridColumn} deleteGridColumn={mapObject.deleteGridColumn} />
                </div>
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 items-end">
                    <HUD.LayerOptions mapObject={mapObject}/>
                    <HUD.SaveMapComponent mapObject={mapObject}/>
                </div>
                
            </HUD.Container>
            <DefaultGridElement tileDirection={tileDirection} selectedTile={selectedTile} z={mapObject.layers.length + 1} rightClickFunction={mapObject.deleteTileFromMatrix} leftClickFunction={mapObject.AddTileInMatrix} sizeX={mapObject.sizeX} sizeY={mapObject.sizeY} 
            style={{height: `${mapObject.sizeY * 2}rem`, width: `${mapObject.sizeX* 2}rem`}}
            className=' absolute border border-stone-950  rounded-md overflow-hidden place-self-center'>
                {mapObject.layers.map(layerData => <DefaultCanvasElement key={`default_canvas_element_${layerData.id}`} id={layerData.id} sizeX={mapObject.sizeX} sizeY={mapObject.sizeY} />)}
            </DefaultGridElement>
        </>

    )
}