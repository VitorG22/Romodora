import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "../../../../AppContext"
import { drawGhostHover, DrawInCanva } from "../../../maps/newMap/drawInCanva"

export default function BoardMapCanvas() {
    const { partyData } = useContext(AppContext)
    const blockSize: number = 100
    const canvasCoverRef = useRef<HTMLCanvasElement | null>(null)
    const canvasPropsRef = useRef<HTMLCanvasElement | null>(null)
    const canvasFloorRef = useRef<HTMLCanvasElement | null>(null)
    const canvasContainer = useRef<HTMLElement | null>(null)
    const [isDampingActive, setIsDampingActive] = useState<boolean>(false)
    const [translateX, setTranslateX] = useState<number>(0)
    const [translateY, setTranslateY] = useState<number>(0)
    const [canvasZoomValue, setCanvasZoomValue] = useState<number>(100)
    const [tileCountX, setTileCountX] = useState<number>(0)
    const [tileCountY, setTileCountY] = useState<number>(0)

    useEffect(() => {
        setTileCountX(partyData?.mapMatrix[0].length || 0)
        setTileCountY(partyData?.mapMatrix.length || 0)
        console.log('sdyifgushd')
    }, [partyData])

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
        if (!canvasPropsRef.current || !canvasFloorRef.current) return
        DrawInCanva({
            blockSize: blockSize,
            canvas: canvasFloorRef.current,
            mapMatrix: partyData?.mapMatrix || [],
            canvaType: 'floor'
        })
        DrawInCanva({
            blockSize: blockSize,
            canvas: canvasPropsRef.current,
            mapMatrix: partyData?.mapMatrix || [],
            canvaType: 'props'
        })

        canvasCoverRef.current?.addEventListener('mousemove', drawInCanva)

        return()=>{
            canvasCoverRef.current?.removeEventListener('mousemove', drawInCanva)

        }
    }, [partyData, tileCountX, tileCountY])


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

    const drawInCanva = (e:MouseEvent) => {
        if(!canvasCoverRef.current)return
        const {tileX, tileY}=handleGetCanvasMousePosition(e)

        drawGhostHover({
            blockSize,
            tileCountX,
            tileCountY,
            X: tileX,
            Y: tileY,
            canvas: canvasCoverRef.current,
            isCtrlActive: false,
            isShiftActive: false,
            tileId: -1,
            rotate: 'top'
        })
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
            canvasContainer.current.addEventListener('mousemove', CanvasDamping, true)
            canvasContainer.current.addEventListener('mouseup', setLastMousePositionTo0, true)
        }
        return () => {
            document.removeEventListener("keydown", CanvasToggleDamping)
            document.removeEventListener("keyup", CanvasToggleDamping)
            if (!canvasContainer.current) return
            canvasContainer.current.removeEventListener('mousemove', CanvasDamping, true)
            canvasContainer.current.removeEventListener('mouseup', setLastMousePositionTo0, true)
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
        if (!canvasCoverRef.current || !canvasFloorRef.current || !canvasPropsRef.current) return
        canvasCoverRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`
        canvasFloorRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`
        canvasPropsRef.current.style.transform = `translate(${translateX.toString()}%,${translateY.toString()}% )`

    }, [translateX, translateY])


    return (
        <main className='absolute border border-red-500 flex flex-row justify-between hiddenScroll overflow-hidden h-screen w-full'>
            <section style={{ 'cursor': isDampingActive ? ('move') : ('pointer') }} ref={canvasContainer} className='relative w-full h-full overflow-hidden'>
                <canvas ref={canvasCoverRef} style={{ 'zIndex': isDampingActive ? ('50') : ('20') }} className="absolute top-0 lef-0 border border-lagun-500/50 h-screen " />
                <canvas ref={canvasPropsRef} className="absolute top-0 lef-0 z-10 h-screen " />
                <canvas ref={canvasFloorRef} className="absolute top-0 lef-0 z-0 h-screen " />
            </section>
            {/* <LateralTileMenu selectedTile={selectedTile} setSelectedTileId={setSelectedTileId} mapMatrix={mapMatrix} /> */}
        </main>
    )
} 