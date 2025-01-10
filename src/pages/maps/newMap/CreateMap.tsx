import React, { useContext, useEffect, useRef, useState } from "react"
import { updateMapMatrixAdd, updateMapMatrixDelete } from "../scripts/updateMapMatrix"
import { drawGhostHover } from "../scripts/drawInCanva"
import LateralTileMenu from "./components/lateralTilesMenu"
import { useParams } from "react-router-dom"
import { MapsContext } from ".."
import { BlocksList } from "../BlocksList"
import { Minus, Mouse, Move, Plus, SquareDashedMousePointer, SquareMousePointer } from "lucide-react"
import { Tile } from "../classes/tileClasses"
import convertMapJsonToClasses from "../scripts/convertMapJsonToClasses"
import { IMapMatrix } from "../../../interfaces"


export default function CreateMap() {
    const tileRotateValues: ['top', 'right', 'bottom', 'left'] = ['top', 'right', 'bottom', 'left']
    const blockSize: number = 100
    const [tileCountX, setTileCountX] = useState<number>(35)
    const [tileCountY, setTileCountY] = useState<number>(35)
    const [selectedTile, setSelectedTileId] = useState<{ tileId: number, variant: number }>({ tileId: 0, variant: 0 })
    const [isDampingActive, setIsDampingActive] = useState<boolean>(false)
    const [translateX, setTranslateX] = useState<number>(0)
    const [translateY, setTranslateY] = useState<number>(0)
    const [tileRotate, setTileRotate] = useState<number>(0)
    const [canvasZoomValue, setCanvasZoomValue] = useState<number>(100)
    const canvasCoverRef = useRef<HTMLCanvasElement | null>(null)
    const canvasPropsRef = useRef<HTMLCanvasElement | null>(null)
    const canvasFloorRef = useRef<HTMLCanvasElement | null>(null)
    const canvasMobRef = useRef<HTMLCanvasElement | null>(null)
    const canvasWallRef = useRef<HTMLCanvasElement | null>(null)
    const canvasContainer = useRef<HTMLElement | null>(null)
    const { mapId } = useParams()
    const { mapList } = useContext(MapsContext)
    const [mapMatrix, setMapMatrix] = useState<IMapMatrix | null>(null)
    const [readyToRender, setReadyToRender] = useState<boolean>(false)

    useEffect(() => {

        const mapData = mapList.find(element => element.id == mapId)
        if (!mapData) return

        setTileCountX(mapData.sizeX)
        setTileCountY(mapData.sizeY)

        let defaultMatrix: IMapMatrix;
        if (!mapData.mapMatrix || mapData.mapMatrix == undefined) {
            defaultMatrix = {
                floor: Array.from({ length: mapData.sizeY }, (i, row) => {
                    return Array.from({ length: mapData.sizeX }, (e, column) => new Tile({
                        canvaType: 'floor',
                        paths: [{ name: '', path: [''] }],
                        position: { X: column, Y: row },
                        rotate: 'top',
                        size: { X: 1, Y: 1 },
                        status: 0,
                        variant: 0,
                        blockMatrix: [[0]],
                    }))
                }),
                mob: Array.from({ length: mapData.sizeY }, (i, row) => {
                    return Array.from({ length: mapData.sizeX }, (e, column) => new Tile({
                        canvaType: 'mob',
                        paths: [{ name: '', path: [''] }],
                        position: { X: column, Y: row },
                        rotate: 'top',
                        size: { X: 1, Y: 1 },
                        status: 0,
                        variant: 0,
                        blockMatrix: [[0]],
                    }))
                }),
                prop: Array.from({ length: mapData.sizeY }, (i, row) => {
                    return Array.from({ length: mapData.sizeX }, (e, column) => new Tile({
                        canvaType: 'prop',
                        paths: [{ name: '', path: [''] }],
                        position: { X: column, Y: row },
                        rotate: 'top',
                        size: { X: 1, Y: 1 },
                        status: 0,
                        variant: 0,
                        blockMatrix: [[0]],
                    }))
                }),
                wall: Array.from({ length: mapData.sizeY }, (i, row) => {
                    return Array.from({ length: mapData.sizeX }, (e, column) => new Tile({
                        canvaType: 'wall',
                        paths: [{ name: '', path: [''] }],
                        position: { X: column, Y: row },
                        rotate: 'top',
                        size: { X: 1, Y: 1 },
                        status: 0,
                        variant: 0,
                        blockMatrix: [[0]],
                    }))
                }),
            }

        } else {
            defaultMatrix = convertMapJsonToClasses(mapData.mapMatrix)
        }
        setMapMatrix(defaultMatrix)
        setReadyToRender(true)

    }, [])



    useEffect(() => {
        if (!canvasCoverRef.current || !canvasFloorRef.current || !canvasPropsRef.current || !canvasMobRef.current || !canvasWallRef.current) return


        canvasCoverRef.current.width = tileCountX * blockSize
        canvasCoverRef.current.height = tileCountY * blockSize

        canvasPropsRef.current.width = tileCountX * blockSize
        canvasPropsRef.current.height = tileCountY * blockSize

        canvasFloorRef.current.width = tileCountX * blockSize
        canvasFloorRef.current.height = tileCountY * blockSize

        canvasMobRef.current.width = tileCountX * blockSize
        canvasMobRef.current.height = tileCountY * blockSize

        canvasWallRef.current.width = tileCountX * blockSize
        canvasWallRef.current.height = tileCountY * blockSize

    }, [tileCountX, tileCountY])

    useEffect(() => {
        if (!canvasCoverRef.current || !canvasFloorRef.current || !canvasPropsRef.current || !canvasMobRef.current || !canvasWallRef.current) return
        canvasCoverRef.current.addEventListener('click', handleDraw)
        canvasCoverRef.current.addEventListener('mousemove', handleDraw)

        canvasCoverRef.current.addEventListener("contextmenu", handleDraw)
        document.addEventListener("keydown", handleKeyDown)


        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            if (!canvasCoverRef.current || !canvasFloorRef.current || !canvasPropsRef.current || !canvasMobRef.current || !canvasWallRef.current) return
            canvasCoverRef.current.removeEventListener('click', handleDraw)
            canvasCoverRef.current.removeEventListener('mousemove', handleDraw)
            canvasCoverRef.current.removeEventListener("contextmenu", handleDraw)
        }
    }, [tileCountX, tileCountY, mapMatrix, selectedTile, tileRotate])



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
            isAltActive: e.altKey,
            tileId: selectedTile.tileId,
            rotate: tileRotateValues[tileRotate]
        })
        if (e.ctrlKey) {
            switch (e.which) {
                case 1:
                    if (!mapMatrix) return
                    setMapMatrix({
                        ...mapMatrix,
                        floor: updateMapMatrixDelete({
                            canvaType: 'floor',
                            X: tileX,
                            Y: tileY,
                            mapMatrix: mapMatrix.floor,
                            canva: canvasFloorRef,
                            blockSize: blockSize
                        })
                    }
                    )
                    return
                case 3:
                    if (!mapMatrix) return
                    setMapMatrix({
                        ...mapMatrix,
                        wall: updateMapMatrixDelete({
                            canvaType: 'wall',
                            X: tileX,
                            Y: tileY,
                            mapMatrix: mapMatrix.wall,
                            canva: canvasWallRef,
                            blockSize: blockSize
                        })
                    }
                    )
                    return
            }

        }
        if (e.altKey) {
            switch (e.which) {
                case 1:
                    if (!mapMatrix) return
                    setMapMatrix({
                        ...mapMatrix,
                        prop: updateMapMatrixDelete({
                            canvaType: 'prop',
                            X: tileX,
                            Y: tileY,
                            mapMatrix: mapMatrix.prop,
                            canva: canvasPropsRef,
                            blockSize: blockSize
                        })
                    }
                    )
                    return
                case 3:
                    if (!mapMatrix) return
                    setMapMatrix({
                        ...mapMatrix,
                        mob: updateMapMatrixDelete({
                            canvaType: 'mob',
                            X: tileX,
                            Y: tileY,
                            mapMatrix: mapMatrix.mob,
                            canva: canvasMobRef,
                            blockSize: blockSize
                        })
                    }
                    )
                    return
            }

        }

        if (e.which == 1) {

            const newMapMatrix = updateMapMatrixAdd({
                blockSize: blockSize,
                canvasList: {
                    floor: canvasFloorRef,
                    mob: canvasMobRef,
                    prop: canvasPropsRef,
                    wall: canvasWallRef
                },
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
        if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasMobRef.current || !canvasWallRef.current) return
        let canvasList = {
            floor: canvasFloorRef,
            mob: canvasMobRef,
            prop: canvasPropsRef,
            wall: canvasWallRef
        }

        mapMatrix?.floor.forEach(row => {
            row.forEach(tileData => {
                tileData.renderTile({
                    blockSize: blockSize,
                    canvas: canvasList[tileData.canvaType]
                })
            })
        })
        mapMatrix?.mob.forEach(row => {
            row.forEach(tileData => {
                tileData.renderTile({
                    blockSize: blockSize,
                    canvas: canvasList[tileData.canvaType]
                })
            })
        })
        mapMatrix?.prop.forEach(row => {
            row.forEach(tileData => {
                tileData.renderTile({
                    blockSize: blockSize,
                    canvas: canvasList[tileData.canvaType]
                })
            })
        })
        mapMatrix?.wall.forEach(row => {
            row.forEach(tileData => {
                tileData.renderTile({
                    blockSize: blockSize,
                    canvas: canvasList[tileData.canvaType]
                })
            })
        })
    }, [readyToRender])


    const handleGetCanvasMousePosition = (e: MouseEvent) => {
        if (!canvasCoverRef.current || !canvasFloorRef.current || !canvasPropsRef.current || !canvasMobRef.current || !canvasWallRef.current) return { tileX: -1, tileY: -1 }
        const tilePercentWidth = 100 / tileCountX
        const mousePositionXPercent = (e.offsetX / canvasCoverRef.current.offsetWidth) * 100
        const tileX = Math.floor(mousePositionXPercent / tilePercentWidth)

        const tilePercentHeight = 100 / tileCountY
        const mousePositionYPercent = (e.offsetY / canvasCoverRef.current.offsetHeight) * 100
        const tileY = Math.floor(mousePositionYPercent / tilePercentHeight)



        return ({ tileX, tileY })
    }



    useEffect(() => {
        if (!canvasCoverRef.current || !canvasFloorRef.current || !canvasPropsRef.current || !canvasMobRef.current || !canvasWallRef.current || !canvasContainer.current) return

        canvasContainer.current.addEventListener('wheel', canvasZoom)

        canvasCoverRef.current.style.scale = (canvasZoomValue / 100).toString()
        canvasFloorRef.current.style.scale = (canvasZoomValue / 100).toString()
        canvasPropsRef.current.style.scale = (canvasZoomValue / 100).toString()
        canvasMobRef.current.style.scale = (canvasZoomValue / 100).toString()
        canvasWallRef.current.style.scale = (canvasZoomValue / 100).toString()
        return () => {
            if (!canvasCoverRef.current || !canvasFloorRef.current || !canvasPropsRef.current || !canvasMobRef.current || !canvasWallRef.current || !canvasContainer.current) return
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
            document.body.style.cursor = 'move'
            if (!canvasContainer.current) return
            canvasContainer.current.addEventListener('mousemove', CanvasDamping)
            canvasContainer.current.addEventListener('mouseup', setLastMousePositionTo0)
        } else {
            document.body.style.cursor = 'default'
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
        if (!canvasCoverRef.current || !canvasFloorRef.current || !canvasPropsRef.current || !canvasMobRef.current || !canvasWallRef.current) return
        canvasCoverRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`
        canvasFloorRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`
        canvasPropsRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`
        canvasMobRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`
        canvasWallRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`


    }, [translateX, translateY])

    const handleTileCountXPlus = () => {
        if (!mapMatrix) return
        setTileCountX(tileCountX + 1)
        let newFloorMapMatrix = [...mapMatrix.floor]
        let newMobMapMatrix = [...mapMatrix.mob]
        let newPropMapMatrix = [...mapMatrix.prop]
        let newWallMapMatrix = [...mapMatrix.wall]


        newFloorMapMatrix.map((row, rowIndex) => {
            row.push(new Tile({
                canvaType: 'floor',
                paths: [{ name: '', path: [''] }],
                position: { X: tileCountX + 1, Y: rowIndex },
                rotate: 'top',
                size: { X: 1, Y: 1 },
                status: 0,
                variant: 0,
                blockMatrix: [[0]],
            }))
        })

        newMobMapMatrix.map((row, rowIndex) => {
            row.push(new Tile({
                canvaType: 'mob',
                paths: [{ name: '', path: [''] }],
                position: { X: tileCountX + 1, Y: rowIndex },
                rotate: 'top',
                size: { X: 1, Y: 1 },
                status: 0,
                variant: 0,
                blockMatrix: [[0]],
            }))
        })

        newPropMapMatrix.map((row, rowIndex) => {
            row.push(new Tile({
                canvaType: 'prop',
                paths: [{ name: '', path: [''] }],
                position: { X: tileCountX + 1, Y: rowIndex },
                rotate: 'top',
                size: { X: 1, Y: 1 },
                status: 0,
                variant: 0,
                blockMatrix: [[0]],
            }))
        })

        newWallMapMatrix.map((row, rowIndex) => {
            row.push(new Tile({
                canvaType: 'wall',
                paths: [{ name: '', path: [''] }],
                position: { X: tileCountX + 1, Y: rowIndex },
                rotate: 'top',
                size: { X: 1, Y: 1 },
                status: 0,
                variant: 0,
                blockMatrix: [[0]],
            }))
        })

        setMapMatrix({
            floor: newFloorMapMatrix,
            mob: newMobMapMatrix,
            prop: newPropMapMatrix,
            wall: newWallMapMatrix
        })

    }
    const handleTileCountXMinus = () => {
        if (tileCountX <= 2 || !mapMatrix) return
        setTileCountX(tileCountX - 1)

        let newFloorMapMatrix = [...mapMatrix.floor]
        let newMobMapMatrix = [...mapMatrix.mob]
        let newPropMapMatrix = [...mapMatrix.prop]
        let newWallMapMatrix = [...mapMatrix.wall]

        newFloorMapMatrix.forEach(row => row.pop())
        newMobMapMatrix.forEach(row => row.pop())
        newPropMapMatrix.forEach(row => row.pop())
        newWallMapMatrix.forEach(row => row.pop())
        setMapMatrix({
            floor: newFloorMapMatrix,
            mob: newMobMapMatrix,
            prop: newPropMapMatrix,
            wall: newWallMapMatrix
        })

    }

    const handleTileCountYPlus = () => {
        if (!mapMatrix) return
        setTileCountY(tileCountY + 1)

        let newFloorMapMatrix = [...mapMatrix.floor]
        let newMobMapMatrix = [...mapMatrix.mob]
        let newPropMapMatrix = [...mapMatrix.prop]
        let newWallMapMatrix = [...mapMatrix.wall]

        newFloorMapMatrix.push(
            Array.from({ length: tileCountX }, (e, column) => new Tile({
                canvaType: 'floor',
                paths: [{ name: '', path: [''] }],
                position: { X: column, Y: tileCountY + 1 },
                rotate: 'top',
                size: { X: 1, Y: 1 },
                status: 0,
                variant: 0,
                blockMatrix: [[0]],
            }))
        )

        newPropMapMatrix.push(
            Array.from({ length: tileCountX }, (e, column) => new Tile({
                canvaType: 'prop',
                paths: [{ name: '', path: [''] }],
                position: { X: column, Y: tileCountY + 1 },
                rotate: 'top',
                size: { X: 1, Y: 1 },
                status: 0,
                variant: 0,
                blockMatrix: [[0]],
            }))
        )

        newMobMapMatrix.push(
            Array.from({ length: tileCountX }, (e, column) => new Tile({
                canvaType: 'mob',
                paths: [{ name: '', path: [''] }],
                position: { X: column, Y: tileCountY + 1 },
                rotate: 'top',
                size: { X: 1, Y: 1 },
                status: 0,
                variant: 0,
                blockMatrix: [[0]],
            }))
        )

        newWallMapMatrix.push(
            Array.from({ length: tileCountX }, (e, column) => new Tile({
                canvaType: 'wall',
                paths: [{ name: '', path: [''] }],
                position: { X: column, Y: tileCountY + 1 },
                rotate: 'top',
                size: { X: 1, Y: 1 },
                status: 0,
                variant: 0,
                blockMatrix: [[0]],
            }))
        )

        setMapMatrix({
            floor: newFloorMapMatrix,
            mob: newMobMapMatrix,
            prop: newPropMapMatrix,
            wall: newWallMapMatrix
        })
    }
    const handleTileCountYMinus = () => {
        if (tileCountY <= 2 || !mapMatrix) return
        setTileCountY(tileCountY - 1)

        let newFloorMapMatrix = [...mapMatrix.floor]
        let newMobMapMatrix = [...mapMatrix.mob]
        let newPropMapMatrix = [...mapMatrix.prop]
        let newWallMapMatrix = [...mapMatrix.wall]

        newFloorMapMatrix.pop()
        newMobMapMatrix.pop()
        newPropMapMatrix.pop()
        newWallMapMatrix.pop()

        setMapMatrix({
            floor: newFloorMapMatrix,
            mob: newMobMapMatrix,
            prop: newPropMapMatrix,
            wall: newWallMapMatrix
        })
    }


    return (
        <main className='relative flex flex-row justify-between hiddenScroll overflow-hidden h-screen w-full'>
            <section ref={canvasContainer} className='relative w-full h-full overflow-hidden'>
                <CreateMapHud canvasZoomValue={canvasZoomValue} tileCountX={tileCountX} tileCountY={tileCountY} selectedTile={selectedTile} tileRotate={tileRotate} handleTileCountXMinus={handleTileCountXMinus} handleTileCountXPlus={handleTileCountXPlus} handleTileCountYMinus={handleTileCountYMinus} handleTileCountYPlus={handleTileCountYPlus}/>
                <canvas ref={canvasCoverRef} className="absolute top-0 lef-0 z-40 border border-lagun-500/50 h-screen " />
                <canvas ref={canvasMobRef} className="absolute top-0 lef-0 z-30 h-screen " />
                <canvas ref={canvasWallRef} className="absolute top-0 lef-0 z-20 h-screen " />
                <canvas ref={canvasPropsRef} className="absolute top-0 lef-0 z-10 h-screen " />
                <canvas ref={canvasFloorRef} className="absolute top-0 lef-0 z-0 h-screen " />
            </section>
            <LateralTileMenu selectedTile={selectedTile} setSelectedTileId={setSelectedTileId} mapMatrix={mapMatrix} mapSize={{ X: tileCountX, Y: tileCountY }} />
        </main>
    )
}

interface IHud {
    canvasZoomValue: number
    tileCountX: number
    tileCountY: number
    selectedTile: {
        tileId: number;
        variant: number;
    }
    tileRotate: number
    handleTileCountXPlus: ()=>void
    handleTileCountXMinus:()=>void
    handleTileCountYPlus:()=>void
    handleTileCountYMinus:()=>void
}


function CreateMapHud({ canvasZoomValue, tileCountX, tileCountY, selectedTile, tileRotate,handleTileCountXMinus,handleTileCountXPlus,handleTileCountYMinus,handleTileCountYPlus }: IHud) {
    let selectedBlock = BlocksList.find(blockData => blockData.id == selectedTile.tileId)

    return (
        <main className='flex flex-col gap-2 selection:bg-transparent top-0 left-0 z-20 absolute w-full h-full border border-sky-500'>
            {/* top Left section */}
            <section className='absolute top-1 left-2 text-lagun-200/50 *:gap-2 *:flex *:flex-row'>
                Map Size:
                <div >
                    X: <button onClick={handleTileCountXMinus} disabled={tileCountX <= 2} className='hover:bg-lagun-200/20 flex  px-1 rounded-sm items-center aspect-square'>
                        <Minus size={15} strokeWidth={1} />
                    </button>
                    {tileCountX}
                    <button onClick={handleTileCountXPlus} className='hover:bg-lagun-200/20 flex  px-1 rounded-sm items-center aspect-square'>
                        <Plus size={15} strokeWidth={1} />
                    </button>
                </div>
                <div>
                    Y: <button onClick={handleTileCountYMinus} disabled={tileCountY <= 2} className='hover:bg-lagun-200/20 flex  px-1 rounded-sm items-center aspect-square'>
                        <Minus size={15} strokeWidth={1} />
                    </button>
                    {tileCountY}
                    <button onClick={handleTileCountYPlus} className='hover:bg-lagun-200/20 flex  px-1 rounded-sm items-center aspect-square'>
                        <Plus size={15} strokeWidth={1} />
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