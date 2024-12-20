import React, { useContext, useEffect, useRef, useState } from "react"
import { ITileData, updateMapMatrixAdd, updateMapMatrixDelete } from "./updateMapMatrix"
import { DrawInCanva, drawGhostHover } from "./drawInCanva"
import LateralTileMenu from "./components/lateralTilesMenu"
import { useParams } from "react-router-dom"
import { MapsContext } from ".."
import { BlocksList } from "./BlocksList"
import { Minus, Mouse, Move, Plus, SquareDashedMousePointer, SquareMousePointer } from "lucide-react"


export default function CreateMap() {
    const tileRotateValues: ['top', 'right', 'bottom', 'left'] = ['top', 'right', 'bottom', 'left']
    const blockSize:number = 100
    const [tileCountX, setTileCountX] = useState<number>(20)
    const [tileCountY, setTileCountY] = useState<number>(20)
    const [selectedTile, setSelectedTileId] = useState<{ tileId: number, variant: number }>({ tileId: 0, variant: 0 })
    const [isDampingActive, setIsDampingActive] = useState<boolean>(false)
    const [translateX, setTranslateX] = useState<number>(0)
    const [translateY, setTranslateY] = useState<number>(0)
    const [tileRotate, setTileRotate] = useState<number>(0)
    const [canvasZoomValue, setCanvasZoomValue] = useState<number>(100)
    const canvasCoverRef = useRef<HTMLCanvasElement | null>(null)
    const canvasPropsRef = useRef<HTMLCanvasElement | null>(null)
    const canvasFloorRef = useRef<HTMLCanvasElement | null>(null)
    const canvasContainer = useRef<HTMLElement | null>(null)
    const { mapId } = useParams()
    const { mapList } = useContext(MapsContext)
    const [mapMatrix, setMapMatrix] = useState<Array<ITileData[]>>([])

    useEffect(() => {
        let defaultMatrix: Array<ITileData[]> = []

        const mapData = mapList.find(element => element.id == mapId) || null
        if (!mapData) return

        setTileCountX(mapData.sizeX)
        setTileCountY(mapData.sizeY)
        if (mapData.mapStructureData.length <= 0) {
            defaultMatrix = Array.from({ length: mapData.sizeY }, () => new Array(mapData.sizeX).fill({
                props: null,
                floor: null,

            }))
        } else {
            defaultMatrix = mapData.mapStructureData
        }
        setMapMatrix(defaultMatrix)


    }, [])



    useEffect(() => {
        if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasCoverRef.current || !canvasContainer.current) return

        canvasCoverRef.current.width = tileCountX * blockSize
        canvasCoverRef.current.height = tileCountY * blockSize

        canvasPropsRef.current.width = tileCountX * blockSize
        canvasPropsRef.current.height = tileCountY * blockSize

        canvasFloorRef.current.width = tileCountX * blockSize
        canvasFloorRef.current.height = tileCountY * blockSize

    }, [tileCountX, tileCountY])

    useEffect(() => {
        if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasCoverRef.current || !canvasContainer.current) return
        canvasCoverRef.current.addEventListener('click', handleDraw)
        canvasCoverRef.current.addEventListener('mousemove', handleDraw)

        canvasCoverRef.current.addEventListener("contextmenu", handleDraw)
        document.addEventListener("keydown", handleKeyDown)


        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasCoverRef.current || !canvasContainer.current) return
            canvasCoverRef.current.removeEventListener('click', handleDraw)
            canvasCoverRef.current.removeEventListener('mousemove', handleDraw)
            canvasCoverRef.current.removeEventListener("contextmenu", handleDraw)
        }
    }, [tileCountX, tileCountY, mapMatrix, selectedTile, tileRotate, isDampingActive])



    const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault()
        if (e.code == 'KeyQ') {
            if (tileRotate == 3) {
                setTileRotate(0)
            } else {
                setTileRotate(prevValue => prevValue + 1)
            }
        }
    }

    const handleDraw = (e: MouseEvent) => {
        e.preventDefault()
        if (isDampingActive == true) return
        const { tileX, tileY } = handleGetCanvasMousePosition(e)
        if (!canvasCoverRef.current) return
        drawGhostHover({
            blockSize,
            tileCountX,
            tileCountY,
            X: tileX,
            Y: tileY,
            canvas: canvasCoverRef.current,
            isCtrlActive: e.ctrlKey,
            isShiftActive: e.shiftKey,
            tileId: selectedTile.tileId,
            rotate: tileRotateValues[tileRotate]
        })
        if (e.ctrlKey) {
            switch (e.which) {
                case 1:
                    setMapMatrix(updateMapMatrixDelete({
                        X: tileX,
                        Y: tileY,
                        mapMatrix: mapMatrix,
                        LayerToDelete: "floor"
                    }))
                    return
                case 3:
                    setMapMatrix(updateMapMatrixDelete({
                        X: tileX,
                        Y: tileY,
                        mapMatrix: mapMatrix,
                        LayerToDelete: "props"
                    }))
                    return
            }

        }

        if (e.which == 1) {
            const newMapMatrix = updateMapMatrixAdd({
                X: tileX,
                Y: tileY,
                mapMatrix: mapMatrix,
                rotate: tileRotateValues[tileRotate],
                tileId: selectedTile.tileId,
                variant: selectedTile.variant,
            })
            setMapMatrix(newMapMatrix)
        }

        return false
    }



    useEffect(() => {
        if (!canvasPropsRef.current || !canvasFloorRef.current) return
        DrawInCanva({
            blockSize: blockSize,
            canvas: canvasFloorRef.current,
            mapMatrix: mapMatrix,
            canvaType: 'floor'
        })
        DrawInCanva({
            blockSize: blockSize,
            canvas: canvasPropsRef.current,
            mapMatrix: mapMatrix,
            canvaType: 'props'
        })
    }, [mapMatrix])


    const handleGetCanvasMousePosition = (e: MouseEvent) => {
        if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasCoverRef.current) return { tileX: -1, tileY: -1 }
        const tilePercentWidth = 100 / tileCountX
        const mousePositionXPercent = (e.offsetX / canvasCoverRef.current.offsetWidth) * 100
        const tileX = Math.floor(mousePositionXPercent / tilePercentWidth)

        const tilePercentHeight = 100 / tileCountY
        const mousePositionYPercent = (e.offsetY / canvasCoverRef.current.offsetHeight) * 100
        const tileY = Math.floor(mousePositionYPercent / tilePercentHeight)



        return ({ tileX, tileY })
    }



    useEffect(() => {
        if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasCoverRef.current || !canvasContainer.current) return

        canvasContainer.current.addEventListener('wheel', canvasZoom)

        canvasCoverRef.current.style.scale = (canvasZoomValue / 100).toString()
        canvasFloorRef.current.style.scale = (canvasZoomValue / 100).toString()
        canvasPropsRef.current.style.scale = (canvasZoomValue / 100).toString()
        return () => {
            if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasCoverRef.current || !canvasContainer.current) return
            canvasContainer.current.removeEventListener('wheel', canvasZoom)

        }
    }, [canvasZoomValue])

    function canvasZoom(zoomValue: WheelEvent) {
        if (!canvasPropsRef.current || !canvasFloorRef.current) return
        if (zoomValue.deltaY < 0) {
            if (canvasZoomValue >= 200) return
            setCanvasZoomValue(canvasZoomValue + 3)
        }
        if (zoomValue.deltaY > 0) {
            if (canvasZoomValue <= 15) return
            setCanvasZoomValue(canvasZoomValue - 3)

        }

    }



    useEffect(() => {
        document.addEventListener("keydown", CanvasToggleDamping)
        document.addEventListener("keyup", CanvasToggleDamping)
        if (isDampingActive) {
            if (!canvasContainer.current) return
            canvasContainer.current.addEventListener('mousemove', CanvasDamping)
            canvasContainer.current.addEventListener('mouseup', setLastMousePositionTo0)
        }
        return () => {
            document.removeEventListener("keydown", CanvasToggleDamping)
            document.removeEventListener("keyup", CanvasToggleDamping)
            if (!canvasContainer.current) return
            canvasContainer.current.removeEventListener('mousemove', CanvasDamping)
            canvasContainer.current.removeEventListener('mouseup', setLastMousePositionTo0)
        }
    }, [isDampingActive])


    let lastMousePositionXDamping: number = 0
    let lastMousePositionYDamping: number = 0

    const setLastMousePositionTo0 = () => {
        lastMousePositionXDamping = 0
        lastMousePositionYDamping = 0
    }
    const CanvasToggleDamping = (e: KeyboardEvent) => {
        e.preventDefault()
        if (e.code == 'ShiftLeft') {
            setIsDampingActive(e.shiftKey)
            setLastMousePositionTo0()
        }
    }

    const CanvasDamping = (e: MouseEvent) => {
        e.preventDefault()
        if (e.which == 1) {
            if (!canvasContainer.current) return
            console.log({ X: e.clientX, Y: e.offsetY })

            let mousePercentPositionX = (e.clientX / canvasContainer.current.offsetWidth) * 100
            let mousePercentPositionY = (e.clientY / canvasContainer.current.offsetHeight) * 100
            let differenceX = mousePercentPositionX - lastMousePositionXDamping
            let differenceY = mousePercentPositionY - lastMousePositionYDamping

            if (lastMousePositionXDamping != 0 || lastMousePositionYDamping != 0) {
                setTranslateX(prevState => prevState + differenceX)
                setTranslateY(prevState => prevState + differenceY)
            }
            lastMousePositionXDamping = mousePercentPositionX
            lastMousePositionYDamping = mousePercentPositionY
        }
    }

    useEffect(() => {
        if (!canvasCoverRef.current || !canvasFloorRef.current || !canvasPropsRef.current) return
        canvasCoverRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`
        canvasFloorRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`
        canvasPropsRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`

    }, [translateX, translateY])

    return (
        <main className='relative flex flex-row justify-between hiddenScroll overflow-hidden h-screen w-full'>
            <section ref={canvasContainer} className='relative w-full h-full overflow-hidden'>
                <CreateMapHud canvasZoomValue={canvasZoomValue} tileCountX={tileCountX} tileCountY={tileCountY} setTileCountX={setTileCountX} setTileCountY={setTileCountY} mapMatrix={mapMatrix} setMapMatrix={setMapMatrix} selectedTile={selectedTile} tileRotate={tileRotate} />
                <canvas ref={canvasCoverRef} className="absolute top-0 lef-0 z-20 border border-lagun-500/50 h-screen " />
                <canvas ref={canvasPropsRef} className="absolute top-0 lef-0 z-10 h-screen " />
                <canvas ref={canvasFloorRef} className="absolute top-0 lef-0 z-0 h-screen " />
            </section>
            <LateralTileMenu selectedTile={selectedTile} setSelectedTileId={setSelectedTileId} mapMatrix={mapMatrix} />
        </main>
    )
}

interface IHud {
    canvasZoomValue: number
    tileCountX: number
    tileCountY: number
    setTileCountX: React.Dispatch<React.SetStateAction<number>>
    setTileCountY: React.Dispatch<React.SetStateAction<number>>
    mapMatrix: Array<ITileData[]>
    setMapMatrix: React.Dispatch<React.SetStateAction<ITileData[][]>>
    selectedTile: {
        tileId: number;
        variant: number;
    }
    tileRotate: number
}


function CreateMapHud({ canvasZoomValue, setTileCountX, setTileCountY, tileCountX, tileCountY, mapMatrix, setMapMatrix, selectedTile, tileRotate }: IHud) {
    let selectedBlock = BlocksList.find(blockData => blockData.id == selectedTile.tileId)


    const handleTileCountXPlus = () => {
        setTileCountX(tileCountX + 1)
        let newMapMatrix = [...mapMatrix]
        newMapMatrix.forEach((rowData) => {
            rowData.push({
                props: null,
                floor: null,
            })
        })
        setMapMatrix(newMapMatrix)
    }
    const handleTileCountXMinus = () => {
        if (tileCountX <= 2) return
        setTileCountX(tileCountX - 1)
        let newMapMatrix = [...mapMatrix]
        newMapMatrix.forEach(rowData => {
            rowData.pop()
        })
        setMapMatrix(newMapMatrix)
    }
    const handleTileCountYPlus = () => {
        setTileCountY(tileCountY + 1)
        let newMapMatrix = [...mapMatrix]
        let newRow = new Array(tileCountX).fill({
            props: null,
            floor: null,
        })
        newRow.forEach((element, index) => {
            element.X = index,
                element.Y = tileCountY + 1
        })
        newMapMatrix.push(newRow)
        setMapMatrix(newMapMatrix)
    }
    const handleTileCountYMinus = () => {
        if (tileCountY <= 2) return
        setTileCountY(tileCountY - 1)
        let newMapMatrix = [...mapMatrix]
        newMapMatrix.pop()
        setMapMatrix(newMapMatrix)
    }



    return (
        <main className='flex flex-col gap-2 selection:bg-transparent top-0 left-0 z-20 absolute w-full h-full border border-sky-500'>
            {/* top Left section */}
            <section className='absolute top-1 left-2 text-lagun-200/50 *:gap-2 *:flex *:flex-row'>
                Map Size:
                <div >
                    X: <button onClick={handleTileCountXMinus} disabled={tileCountX <= 2} className='hover:bg-lagun-200/20 flex  px-1 rounded-sm items-center aspect-square'>
                        <Minus size={15} strokeWidth={1}/>
                    </button>
                    {tileCountX}
                    <button onClick={handleTileCountXPlus} className='hover:bg-lagun-200/20 flex  px-1 rounded-sm items-center aspect-square'>
                        <Plus size={15} strokeWidth={1}/>
                    </button>
                </div>
                <div>
                    Y: <button onClick={handleTileCountYMinus} disabled={tileCountY <= 2} className='hover:bg-lagun-200/20 flex  px-1 rounded-sm items-center aspect-square'>
                        <Minus size={15} strokeWidth={1}/>
                    </button>
                    {tileCountY}
                    <button onClick={handleTileCountYPlus} className='hover:bg-lagun-200/20 flex  px-1 rounded-sm items-center aspect-square'>
                        <Plus size={15} strokeWidth={1}/>
                    </button>
                </div>
                Zoom: {canvasZoomValue}%
            </section>
            {/* Bottom Right section */}
            <section className='absolute right-2 bottom-1 flex flex-row gap-2 items-end'>
                {selectedBlock &&
                    <>
                        <p className='font-thin text-sm italic text-lagun-200'>{selectedBlock.variant[selectedTile.variant].name}</p>
                        <img style={{ rotate: `${tileRotate * 90}deg` }}
                            className='border border-lagun-500 aspect-square w-20 rounded-md'
                            src={selectedBlock.variant[selectedTile.variant].path[0]} />
                    </>
                }
            </section>
            {/* Bottom Left section */}
            <section className="*:text-lagun-200/40 hover:*:text-lagun-200 *:flex *:flex-row *:gap-2 *:items-center absolute left-2 bottom-1">
                <p><Mouse size={20} strokeWidth={1} /> Scroll To Zoom</p>
                <p><SquareMousePointer size={20} strokeWidth={1} /> Mouse Left To Add Block</p>
                <p><Move size={20} strokeWidth={1} />Shift + Mouse Left To Move Map</p>
                <p><SquareDashedMousePointer size={20} strokeWidth={1} />Ctrl + Mouse Left To Delete Floor</p>
                <p><SquareDashedMousePointer size={20} strokeWidth={1} />Ctrl + Mouse Right To Delete Props</p>
            </section>
        </main>
    )
}