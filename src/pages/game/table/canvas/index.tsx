import { useContext, useEffect, useState } from "react"
import { GameContext } from "../../../../scripts/socket"
import { DefaultCanvasElement, DefaultGridElement } from "../../../maps/editMap/canvas"
import { TableMapGame } from "../../../maps/editMap/mapsClass"


export function TableCanvas() {
    const game = useContext(GameContext)
    const [mapObject, setMapObject] = useState<TableMapGame>()
    const [functionList, setFunctionList] = useState<TFunctionList>([])
    const [floatingMenuData, setFloatingMenuData] = useState({ x: 0, y: 0, isOpen: false })
    const [dataToFloatingMenuFunction, setDataToFloatingMenuFunction] = useState<any>()


    useEffect(() => {
        if (game?.tableControl.tableMap) {
            setMapObject(game.tableControl.tableMap)
        } else (
            setMapObject(undefined)
        )
    }, [game?.tableControl.tableMap])

    const renderMap = () => {
        mapObject?.reDrawAll()
        game?.tableControl.renderEntities()
    }

    const onRightClickInGrid = (x: number, y: number, e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        if (!game?.tableControl.tableMap) return

        let newDataToFloatingMenuFunction = {
            x: x,
            y: y,
            selectedEntity: game!.tableControl.selectedObjectOrEntity?.entity,
            selectedObject: game!.tableControl.selectedObjectOrEntity?.object
        }
        setDataToFloatingMenuFunction(newDataToFloatingMenuFunction)

        let newFunctionsList: TFunctionList = []

        let selectedEntityOrObjectFunctions = game!.tableControl.selectedObjectOrEntity?.entity?.getInteractionTableFunctionsAsPrimaryObject() || null
        if (selectedEntityOrObjectFunctions) { newFunctionsList.push(selectedEntityOrObjectFunctions) }

        game!.tableControl.players.map(playerData => {
            if (!playerData.character) return
            if (playerData.character.position.x == x && playerData.character?.position.y == y) {
                let playerCharacterFunction = playerData.character.getInteractionTableFunctionsAsSecondaryObject()
                playerCharacterFunction.list.push(
                    {
                        name: "Select",
                        executableFunction: () => game!.tableControl.setSelectedObjectOrEntity({ entity: playerData.character })
                    })
                newFunctionsList.push(playerCharacterFunction)
            }
        })


        setFunctionList(newFunctionsList)

        if (!e) { return }
        setFloatingMenuData({
            isOpen: true,
            x: e.clientX,
            y: e.clientY
        })
    }

    const closeFloatingMenu = () => {
        setFloatingMenuData({
            isOpen: false,
            x: 0,
            y: 0
        })
    }

    return (
        <section className="flex items-center justify-center absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            {mapObject &&
                <>
                    <DefaultGridElement tileDirection={"top"} selectedTile={null} z={mapObject.layers.length + 1} rightClickFunction={onRightClickInGrid} closeFloatingMenu={closeFloatingMenu} leftClickFunction={() => { }} sizeX={mapObject.sizeX} sizeY={mapObject.sizeY}
                        style={{ height: `${mapObject.sizeY * 2}rem`, width: `${mapObject.sizeX * 2}rem` }}
                        className=' absolute border border-stone-950  rounded-md overflow-hidden place-self-center'>


                        {mapObject.layers.map((layerData, layerIndex) => <DefaultCanvasElement key={`default_canvas_element_${layerData.id}`} id={layerData.id} sizeX={mapObject.sizeX} sizeY={mapObject.sizeY}
                            onLoad={() => { if (layerIndex == mapObject.layers.length - 1) { renderMap() } }}
                        />)}
                        <DefaultCanvasElement key={`playersCanvas_${game?.lobbyId}`} id={`EntityCanvas`} sizeX={mapObject.sizeX} sizeY={mapObject.sizeY} />
                    </DefaultGridElement>
                </>
            }
            {floatingMenuData.isOpen &&
                <div className='absolute top-0 left-0'>
                    <FloatingInteractionMenu dataToFloatingMenuFunction={dataToFloatingMenuFunction} functionList={functionList} floatingMenuData={floatingMenuData} closeFloatingMenu={() => setFloatingMenuData({ x: 0, y: 0, isOpen: false })} />
                </div>
            }
        </section >
    )

}


type TFunctionList = Array<{
    Title: string,
    list: {
        name: string,
        executableFunction: (data: any) => void
    }[]
}>

function FloatingInteractionMenu({ dataToFloatingMenuFunction, functionList, floatingMenuData, closeFloatingMenu }: { dataToFloatingMenuFunction: any, functionList: TFunctionList, floatingMenuData: { x: number, y: number, isOpen: boolean }, closeFloatingMenu: () => void }) {
    return (
        <section className='absolute flex flex-col bg-stone-900 text-stone-400 py-2' style={{ left: floatingMenuData.x, top: floatingMenuData.y }}>
            {functionList.map(functionListObject =>
                <div>
                    <h2 className="font-semibold px-1 border-b-1 border-stone-400/40">{functionListObject.Title}</h2>
                    <ul>
                        {functionListObject.list.map(listObject =>
                            <li><button className='flex w-full text-nowrap px-4 hover:cursor-pointer hover:bg-stone-800'
                                onClick={() => { listObject.executableFunction(dataToFloatingMenuFunction); closeFloatingMenu() }}>
                                {listObject.name}
                            </button></li>
                        )}
                    </ul>
                </div>
            )
            }
        </section>
    )
}
