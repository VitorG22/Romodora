import { useContext, useEffect, useState } from "react"
import { GameContext } from "../../../../scripts/socket"
import { DefaultCanvasElement, DefaultGridElement } from "../../../maps/editMap/canvas"
import { TableMapGame } from "../../../maps/editMap/mapsClass"


export function TableCanvas() {
    const game = useContext(GameContext)
    const [mapObject, setMapObject] = useState<TableMapGame>()

    useEffect(() => {
        if (game?.tableControl.tableMap) {
            setMapObject(game.tableControl.tableMap)
        } else (
            setMapObject(undefined)
        )
    }, [game?.tableControl.tableMap])

    const renderMap = ()=>{
        mapObject?.reDrawAll()
        game?.tableControl.renderEntities()
    }
    
    return (
        <section className="flex items-center justify-center absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            {mapObject &&
                <>
                    <DefaultGridElement tileDirection={"top"} selectedTile={null} z={mapObject.layers.length + 1} rightClickFunction={mapObject.deleteTileFromMatrix} leftClickFunction={mapObject.AddTileInMatrix} sizeX={mapObject.sizeX} sizeY={mapObject.sizeY}
                        style={{ height: `${mapObject.sizeY * 2}rem`, width: `${mapObject.sizeX * 2}rem` }}
                        className=' absolute border border-stone-950  rounded-md overflow-hidden place-self-center'>
                            <DefaultCanvasElement key={`playersCanvas_${game?.lobbyId}`} id={`EntityCanvas`} sizeX={mapObject.sizeX} sizeY={mapObject.sizeY}/>    
                        {mapObject.layers.map((layerData, layerIndex) => <DefaultCanvasElement key={`default_canvas_element_${layerData.id}`} id={layerData.id} sizeX={mapObject.sizeX} sizeY={mapObject.sizeY} 
                        onLoad={()=>{if(layerIndex == mapObject.layers.length -1){renderMap()}}}
                        />)}
                    </DefaultGridElement>
                </>
            }
        </section >
    )

}
