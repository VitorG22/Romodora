import { MutableRefObject, useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "../../../../AppContext"
import { drawGhostHover } from "../../../maps/scripts/drawInCanva"
import { IMapMatrix } from "../../../../interfaces"
import { IIteractiveMenu, Tile } from "../../../maps/classes/tileClasses"
import { findMob, findTileInMapMatrix } from "../../../maps/scripts/updateMapMatrix"
import { BoardContext } from "../boardContext"
import { IIteractiveMobMenu, Mob } from "../../../maps/classes/mobClasses"

export default function BoardMapCanvas() {
    const { partyData } = useContext(AppContext)
    const { selectedTileToMove, setSelectedTileToMove } = useContext(BoardContext)
    const blockSize: number = 100
    const canvasCoverRef = useRef<HTMLCanvasElement | null>(null)
    const canvasPropsRef = useRef<HTMLCanvasElement | null>(null)
    const canvasFloorRef = useRef<HTMLCanvasElement | null>(null)
    const canvasMobRef = useRef<HTMLCanvasElement | null>(null)
    const canvasWallRef = useRef<HTMLCanvasElement | null>(null)
    const [iteractiveMenuSelectedTilePosition, setIteractiveMenuSelectedTilePosition] = useState<{ tilePositionX: number, tilePositionY: number } | null>(null)
    const [iteractiveMenuPosition, setIteractiveMenuPosition] = useState<{ positionX: number, positionY: number } | null>(null)
    const canvasContainer = useRef<HTMLElement | null>(null)
    const [isDampingActive, setIsDampingActive] = useState<boolean>(false)
    const [translateX, setTranslateX] = useState<number>(0)
    const [translateY, setTranslateY] = useState<number>(0)
    const [canvasZoomValue, setCanvasZoomValue] = useState<number>(100)
    const [tileCountX, setTileCountX] = useState<number>(0)
    const [tileCountY, setTileCountY] = useState<number>(0)



    useEffect(() => {
        let newTileCountX = partyData?.mapData.mapMatrix.floor[0].length || 0
        let newTileCountY = partyData?.mapData.mapMatrix.floor.length || 0
        setTileCountX(newTileCountX)
        setTileCountY(newTileCountY)

        tradeMapSize({
            sizeCountX: newTileCountX, sizeCountY: newTileCountY, callback: () => {
                if (partyData?.mapData.mapMatrix) {
                    RenderTiles(partyData.mapData.mapMatrix)
                }
            }
        })
    }, [partyData?.mapData])



    const tradeMapSize = ({ sizeCountX, sizeCountY, callback }: { sizeCountX: number, sizeCountY: number, callback?: () => void }) => {

        if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasMobRef.current || !canvasWallRef.current || !canvasCoverRef.current || !canvasContainer.current) return

        canvasCoverRef.current.width = sizeCountX * blockSize
        canvasCoverRef.current.height = sizeCountY * blockSize

        canvasPropsRef.current.width = sizeCountX * blockSize
        canvasPropsRef.current.height = sizeCountY * blockSize

        canvasFloorRef.current.width = sizeCountX * blockSize
        canvasFloorRef.current.height = sizeCountY * blockSize

        canvasMobRef.current.width = sizeCountX * blockSize
        canvasMobRef.current.height = sizeCountY * blockSize

        canvasWallRef.current.width = sizeCountX * blockSize
        canvasWallRef.current.height = sizeCountY * blockSize
        console.log('trade size')

        callback?.()
    }

    useEffect(() => {
        if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasMobRef.current || !canvasWallRef.current) return
        canvasCoverRef.current?.addEventListener('mousemove', drawInCanva)
        canvasCoverRef.current?.addEventListener('mousedown', openBordIteractiveMenu)
        document.addEventListener('contextmenu', disablecontextMenu)

        return () => {
            canvasCoverRef.current?.removeEventListener('mousemove', drawInCanva)
            canvasCoverRef.current?.removeEventListener('mousedown', openBordIteractiveMenu)
            document.removeEventListener('contextmenu', disablecontextMenu)
        }
    }, [partyData?.mapData.mapMatrix, tileCountX, tileCountY])

    const disablecontextMenu = (e: MouseEvent) => {
        e.preventDefault()
    }


    const RenderTiles = (mapMatrix: IMapMatrix) => {

        mapMatrix.floor.forEach(row => {
            row.forEach(tileData => {
                tileData.renderTile()
            })

        })
        mapMatrix.prop.forEach(row => {
            row.forEach(tileData => {
                tileData.renderTile()
            })
        })
        mapMatrix.wall.forEach(row => {
            row.forEach(tileData => {
                tileData.renderTile()
            })
        })
    }


    const handleGetCanvasMousePosition = (e: MouseEvent) => {
        if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasMobRef.current || !canvasWallRef.current || !canvasCoverRef.current || !canvasContainer.current) return { tileX: -1, tileY: -1 }
        const tilePercentWidth = 100 / tileCountX
        const mousePositionXPercent = (e.offsetX / canvasCoverRef.current.offsetWidth) * 100
        const tileX = Math.floor(mousePositionXPercent / tilePercentWidth)

        const tilePercentHeight = 100 / tileCountY
        const mousePositionYPercent = (e.offsetY / canvasCoverRef.current.offsetHeight) * 100
        const tileY = Math.floor(mousePositionYPercent / tilePercentHeight)

        return ({ tileX, tileY })
    }

    const drawInCanva = (e: MouseEvent) => {
        if (!canvasCoverRef.current) return
        const { tileX, tileY } = handleGetCanvasMousePosition(e)
        drawGhostHover({
            blockSize,
            tileCountX,
            tileCountY,
            X: tileX,
            Y: tileY,
            canvas: canvasCoverRef.current,
            isCtrlActive: false,
            isAltActive: false,
            tileId: -1,
            rotate: 'top'
        })
    }

    useEffect(() => {
        if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasMobRef.current || !canvasWallRef.current || !canvasCoverRef.current || !canvasContainer.current) return

        canvasContainer.current.addEventListener('wheel', canvasZoom)

        canvasCoverRef.current.style.scale = (canvasZoomValue / 100).toString()
        canvasFloorRef.current.style.scale = (canvasZoomValue / 100).toString()
        canvasPropsRef.current.style.scale = (canvasZoomValue / 100).toString()
        canvasWallRef.current.style.scale = (canvasZoomValue / 100).toString()
        canvasMobRef.current.style.scale = (canvasZoomValue / 100).toString()
        return () => {
            if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasMobRef.current || !canvasWallRef.current || !canvasCoverRef.current || !canvasContainer.current) return
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
        if (e.code == 'ShiftLeft') {
            setIsDampingActive(e.shiftKey)
            setLastMousePositionTo0()
        }
    }

    const CanvasDamping = (e: MouseEvent) => {
        if (e.which == 1) {
            if (!canvasContainer.current) return

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
        if (!canvasPropsRef.current || !canvasFloorRef.current || !canvasMobRef.current || !canvasWallRef.current || !canvasCoverRef.current || !canvasContainer.current) return
        canvasCoverRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`
        canvasFloorRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`
        canvasPropsRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`
        canvasWallRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`
        canvasMobRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`

    }, [translateX, translateY])

    const openBordIteractiveMenu = (e: MouseEvent) => {
        e.preventDefault()
        if (e.which != 3) return

        const { tileX, tileY } = handleGetCanvasMousePosition(e)
        setIteractiveMenuSelectedTilePosition({
            tilePositionX: tileX,
            tilePositionY: tileY
        })
        setIteractiveMenuPosition({
            positionX: (e.clientX / window.innerWidth) * 100,
            positionY: (e.clientY / window.innerHeight) * 100
        })
    }

    return (
        <main className='absolute flex flex-row justify-between hiddenScroll overflow-hidden h-screen w-full'>
            <section style={{ 'cursor': isDampingActive ? ('move') : ('pointer') }} ref={canvasContainer} className='relative w-full h-full overflow-hidden'>
                <IteractiveMenu iteractiveMenuPosition={iteractiveMenuPosition} iteractiveMenuSelectedTilePosition={iteractiveMenuSelectedTilePosition} setIteractiveMenuSelectedTilePosition={setIteractiveMenuSelectedTilePosition} selectedTileToMove={selectedTileToMove} setSelectedTileToMove={setSelectedTileToMove} canvasMobRef={canvasMobRef} />
                <canvas style={{ 'zIndex': isDampingActive ? ('50') : ('') }} ref={canvasCoverRef} className="absolute top-0 lef-0 h-screen z-[60]" />
                <canvas ref={canvasMobRef} id='canvasMob' className="absolute top-0 lef-0 z-30 h-screen border border-romo-400" />
                <canvas ref={canvasWallRef} id='canvasWall' className="absolute top-0 lef-0 z-20 h-screen " />
                <canvas ref={canvasPropsRef} id='canvasProps' className="absolute top-0 lef-0 z-10 h-screen " />
                <canvas ref={canvasFloorRef} id='canvasFloor' className="absolute top-0 lef-0 z-0 h-screen " />
            </section>
        </main>
    )
}


function IteractiveMenu({ iteractiveMenuPosition, iteractiveMenuSelectedTilePosition, setIteractiveMenuSelectedTilePosition, canvasMobRef }: { iteractiveMenuPosition: { positionX: number, positionY: number } | null, iteractiveMenuSelectedTilePosition: { tilePositionX: number, tilePositionY: number } | null, setIteractiveMenuSelectedTilePosition: React.Dispatch<React.SetStateAction<{ tilePositionX: number, tilePositionY: number } | null>>, selectedTileToMove: Mob | undefined, setSelectedTileToMove: React.Dispatch<React.SetStateAction<Mob | undefined>> | undefined, canvasMobRef?: MutableRefObject<HTMLCanvasElement | null> }) {
    const { mainUser, partyData } = useContext(AppContext)
    const { selectedTileToMove } = useContext(BoardContext)
    const iteractiveMenuContainerRef = useRef<HTMLDivElement | null>(null)
    const iteractiveMenuListRef = useRef<HTMLUListElement | null>(null)
    const [floorMenuData, setFloorMenuData] = useState<Array<IIteractiveMenu> | undefined>(undefined)
    const [propMenuData, setPropMenuData] = useState<Array<IIteractiveMenu> | undefined>(undefined)
    const [wallMenuData, setWallMenuData] = useState<Array<IIteractiveMenu> | undefined>(undefined)
    const [mobMenuData, setMobMenuData] = useState<Array<IIteractiveMobMenu> | undefined>(undefined)
    const [floorTile, setFloorTile] = useState<Tile | undefined>()
    const [wallTile, setWallTile] = useState<Tile | undefined>()
    const [propTile, setPropTile] = useState<Tile | undefined>()
    const [mobTile, setMobTile] = useState<Mob | undefined>()
    const [tilePositionX, setTilePositionX] = useState<number>(-999)
    const [tilePositionY, setTilePositionY] = useState<number>(-999)



    useEffect(() => {
        if (!iteractiveMenuPosition || !iteractiveMenuSelectedTilePosition || !partyData?.mapData.mapMatrix || !iteractiveMenuContainerRef.current || !iteractiveMenuListRef.current) return

        const { tilePositionX, tilePositionY } = iteractiveMenuSelectedTilePosition
        setTilePositionX(tilePositionX)
        setTilePositionY(tilePositionY)


        let thisPlayerPartydata = partyData?.players.find(playerData => playerData.id == mainUser.id)
        if (thisPlayerPartydata?.permissionType == undefined) return

        let currentFloorTile = findTileInMapMatrix({ matrix: partyData.mapData.mapMatrix.floor, tilePositionX: tilePositionX, tilePositionY: tilePositionY })
        let currentPropTile = findTileInMapMatrix({ matrix: partyData.mapData.mapMatrix.prop, tilePositionX: tilePositionX, tilePositionY: tilePositionY })
        let currentWallTile = findTileInMapMatrix({ matrix: partyData.mapData.mapMatrix.wall, tilePositionX: tilePositionX, tilePositionY: tilePositionY })
        let currentMobTile = findMob({ partyData, tilePositionX, tilePositionY })
        setFloorTile(currentFloorTile)
        setMobTile(currentMobTile)
        setPropTile(currentPropTile)
        setWallTile(currentWallTile)

        setFloorMenuData(currentFloorTile?.getIteractiveMenuData(thisPlayerPartydata?.permissionType))
        setPropMenuData(currentPropTile?.getIteractiveMenuData(thisPlayerPartydata?.permissionType))
        setWallMenuData(currentWallTile?.getIteractiveMenuData(thisPlayerPartydata?.permissionType))
        if (currentMobTile) {
            setMobMenuData(currentMobTile?.getIteractiveMenuData(thisPlayerPartydata?.permissionType))
        } else if (selectedTileToMove) {
            setMobTile(selectedTileToMove)
            setMobMenuData([{ text: `Move ${selectedTileToMove.name}`, functionName: 'moveTo' }])
        } else {
            setMobMenuData(undefined)
        }


        iteractiveMenuListRef.current.style.top = `${iteractiveMenuPosition.positionY}%`
        iteractiveMenuListRef.current.style.left = `${iteractiveMenuPosition.positionX}%`

    }, [iteractiveMenuSelectedTilePosition])

    return (
        iteractiveMenuSelectedTilePosition ? (
            <div className='absolute h-screen w-screen border border-sky-500 z-[70]' ref={iteractiveMenuContainerRef} >
                <ul ref={iteractiveMenuListRef} className='absolute bg-lagun-900 w-fit'>
                    {floorMenuData?.map(buttonData => <IteractiveMenuButton tile={floorTile} iteractiveButtonData={buttonData} setIteractiveMenuSelectedTilePosition={setIteractiveMenuSelectedTilePosition} />)}
                    {mobMenuData?.map(buttonData => <IteractiveMobMenuButton Mob={mobTile} canvasMobRef={canvasMobRef} iteractiveButtonData={buttonData} blockPosition={{ X: tilePositionX, Y: tilePositionY }} setIteractiveMenuSelectedTilePosition={setIteractiveMenuSelectedTilePosition} />)}
                    {propMenuData?.map(buttonData => <IteractiveMenuButton tile={propTile} iteractiveButtonData={buttonData} setIteractiveMenuSelectedTilePosition={setIteractiveMenuSelectedTilePosition} />)}
                    {wallMenuData?.map(buttonData => <IteractiveMenuButton tile={wallTile} iteractiveButtonData={buttonData} setIteractiveMenuSelectedTilePosition={setIteractiveMenuSelectedTilePosition} />)}
                </ul>
                <div id='backgroundCloseContainer' onMouseDown={() => setIteractiveMenuSelectedTilePosition(null)}
                    className='w-full h-full'
                ></div>
            </div>
        ) : (
            null
        )
    )
}

function IteractiveMobMenuButton({ Mob, iteractiveButtonData, canvasMobRef, blockPosition, setIteractiveMenuSelectedTilePosition }: { Mob: Mob | undefined, iteractiveButtonData: IIteractiveMobMenu, canvasMobRef?: MutableRefObject<HTMLCanvasElement | null>, blockPosition: { X: number, Y: number }, setIteractiveMenuSelectedTilePosition: React.Dispatch<React.SetStateAction<{ tilePositionX: number, tilePositionY: number } | null>> }) {
    const { partyData, socket } = useContext(AppContext)
    const { setSelectedTileToMove, setSelectedCharacterInfo } = useContext(BoardContext)

    const executeAction = () => {
        setIteractiveMenuSelectedTilePosition(null)
        if (!Mob || !canvasMobRef) return
        if (iteractiveButtonData.functionName == 'selectThisTile') {
            setSelectedTileToMove?.(Mob)
            setSelectedCharacterInfo?.(Mob)
        } else {
            socket?.emit('mobAction', {
                partyCode: partyData?.partyCode,
                data: {
                    mobId: Mob.id,
                    mobOwnerId: Mob.ownerId,
                    functionName: iteractiveButtonData.functionName,
                    additionalData: {
                        newPosition: blockPosition
                    }
                }
            })
        }



    }

    return (
        <li>
            <button onClick={executeAction} className='w-full px-4 py-1 hover:bg-lagun-950/80 text-xs text-lagun-200'>
                {iteractiveButtonData.text}
            </button>
        </li>
    )
}

function IteractiveMenuButton({ tile, iteractiveButtonData, setIteractiveMenuSelectedTilePosition }: { tile: Tile | undefined, iteractiveButtonData: IIteractiveMenu, setIteractiveMenuSelectedTilePosition: React.Dispatch<React.SetStateAction<{ tilePositionX: number, tilePositionY: number } | null>> }) {
    const { setPartyData, partyData, socket } = useContext(AppContext)


    const executeAction = () => {
        setIteractiveMenuSelectedTilePosition(null)
        if (!partyData || !partyData.mapData || !setPartyData || !tile) return console.log('returning', { partyData, setPartyData, tile })
        let { newTile, nedRefreshMap } = tile[iteractiveButtonData.functionName]()
        let newMapMatrix: IMapMatrix = {
            floor: [...partyData.mapData.mapMatrix.floor],
            prop: [...partyData.mapData.mapMatrix.prop],
            wall: [...partyData.mapData.mapMatrix.wall],
        }

        if (!nedRefreshMap) return

        newMapMatrix[newTile.canvaType][newTile.position.Y][newTile.position.X] = newTile

        socket?.emit('setMapMatrix', {
            partyCode: partyData?.partyCode,
            newMapData: {
                mapId: partyData.mapData.mapId,
                mapMatrix: newMapMatrix,
                mapName: partyData.mapData.mapName
            }
        })
    }

    return (
        <li>
            <button onClick={executeAction} className='w-full px-4 py-1 hover:bg-lagun-950/80 text-xs text-lagun-200'>
                {iteractiveButtonData.text}
            </button>
        </li>
    )
}