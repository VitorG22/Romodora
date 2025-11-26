import React, { useEffect, useRef, useState } from "react"
import type { TBlock } from "./mapsClass";
import type { ITile } from "./tileGallery";

interface IContainer extends React.ComponentPropsWithoutRef<'div'> {
    z: number,
    sizeX: number,
    sizeY: number,
    selectedTile: ITile | null
    tileDirection: "top" | "left" | "bottom" | "right"
    leftClickFunction?: (x: number, y: number, selectedTile: ITile, tileDirection: "top" | "left" | "bottom" | "right") => void
    rightClickFunction: (x: number, y: number, e?:React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    closeFloatingMenu?: ()=>void
}

export function DefaultCanvasElement(data: { sizeX: number, sizeY: number, id: string, onLoad?: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        data.onLoad?.()
    }, [])

    return (
        <canvas
            ref={canvasRef}
            id={data.id}
            height={100 * data.sizeY} width={100 * data.sizeX}
            className={`w-full h-full absolute top-0 left-0 ${data.id}`}
        />
    )
}


let lastMousePosition = { x: -1, y: -1, sizeX: 1, sizeY: 1, tileDirection: "top" }
export function DefaultGridElement(props: IContainer) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [currentCanvasZoom, setCurrentCanvasZoom] = useState<number>(1)


    useEffect(() => {
        drawGrid()
    }, [props.sizeX, props.sizeY])

    useEffect(() => {
        setContainerScale()
    }, [currentCanvasZoom])

    const setContainerScale = () => {
        if (!containerRef.current) return
        containerRef.current.style.scale = `${currentCanvasZoom * 100}%`
    }

    const drawGrid = () => {
        let canvasContext = canvasRef.current?.getContext('2d')
        if (!canvasContext) return

        canvasContext.clearRect(0, 0, props.sizeX * 100, props.sizeY * 100)
        for (let i = 0; i <= props.sizeX; i++) {
            canvasContext.beginPath()
            canvasContext.lineWidth = 2
            canvasContext.strokeStyle = '#0c0a09'
            canvasContext.moveTo((i * 100), 0)
            canvasContext.lineTo(i * 100, props.sizeY * 100)
            canvasContext.stroke()
            canvasContext.closePath()
        }

        for (let i = 0; i <= props.sizeY; i++) {
            canvasContext.beginPath()
            canvasContext.lineWidth = 2
            canvasContext.strokeStyle = '#0c0a09'
            canvasContext.moveTo(0, i * 100)
            canvasContext.lineTo(props.sizeX * 100, i * 100)
            canvasContext.stroke()
            canvasContext.closePath()
        }
    }

    const getMousePosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (!canvasRef.current || !containerRef.current) return ({ x: -1, y: -1 })

        const canvasClientX = containerRef.current.getBoundingClientRect().left
        const canvasClientY = containerRef.current.getBoundingClientRect().top



        const mouseClientX = e.clientX
        const mouseClientY = e.clientY
        let blockCords = {
            x: Math.floor((mouseClientX - canvasClientX) / ((containerRef.current.clientWidth * currentCanvasZoom) / props.sizeX)),
            y: Math.floor((mouseClientY - canvasClientY) / ((containerRef.current.clientHeight * currentCanvasZoom) / props.sizeY))
        }

        return ({ x: blockCords.x, y: blockCords.y })
    }

    const onCanvasClickCapture = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (e.shiftKey) return

        const { x, y } = getMousePosition(e)
        switch (e.buttons) {
            case 1:
                if (props.selectedTile){
                    props.leftClickFunction?.(x, y, props.selectedTile, props.tileDirection)
                }else{
                    props.closeFloatingMenu?.()
                }
                break;
            case 2:
                props.rightClickFunction(x, y, e)
                break;
        }
    }

    const img = new Image();
    let lastTileRendered = ''
    const onCanvasMouseMoveCapture = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { x, y } = getMousePosition(e)
        if (!props.selectedTile) { return }

        let selectedTileCopy = { ...props.selectedTile }
        if (props.tileDirection == 'left' || props.tileDirection == "right") {
            selectedTileCopy.size = {
                x: selectedTileCopy.size.y,
                y: selectedTileCopy.size.x
            }
        }

        if (x == lastMousePosition.x && y == lastMousePosition.y && lastMousePosition.sizeX == selectedTileCopy?.size.x && lastMousePosition.sizeY == selectedTileCopy.size.y) return


        const canvasContext = canvasRef.current?.getContext('2d')
        if (!canvasContext || !selectedTileCopy) { lastMousePosition = { x: x, y: y, sizeX: 1, sizeY: 1, tileDirection: lastMousePosition.tileDirection }; return }

        canvasContext.clearRect(lastMousePosition.x * 100, lastMousePosition.y * 100, lastMousePosition.sizeX * 100, lastMousePosition.sizeY * 100)


        for (let i = lastMousePosition.x; i <= (lastMousePosition.x + lastMousePosition.sizeX); i++) {

            canvasContext.lineWidth = 2
            canvasContext.strokeStyle = '#0c0a09'
            canvasContext.moveTo(i * 100, lastMousePosition.y * 100)
            canvasContext.lineTo(i * 100, (lastMousePosition.y + lastMousePosition.sizeY) * 100)
        }

        for (let i = lastMousePosition.y; i <= (lastMousePosition.y + lastMousePosition.sizeY); i++) {

            canvasContext.lineWidth = 2
            canvasContext.strokeStyle = '#0c0a09'
            canvasContext.moveTo(lastMousePosition.x * 100, i * 100)
            canvasContext.lineTo((lastMousePosition.x + lastMousePosition.sizeX) * 100, i * 100)
        }
        canvasContext.stroke()

        canvasContext.fillStyle = "#ad46ff80"
        canvasContext.fillRect(x * 100, y * 100, selectedTileCopy.size.x * 100, selectedTileCopy.size.y * 100)

        const draw = () => {
            if (!selectedTileCopy) return
            const centerX = x * 100 + selectedTileCopy.size.x * 100 / 2;
            const centerY = y * 100 + selectedTileCopy.size.y * 100 / 2;
            const angleInDegrees = { top: 0, right: 270, bottom: 180, left: 90, };
            const angleInRadians = (angleInDegrees[props.tileDirection] * Math.PI) / 180;

            canvasContext.save();
            canvasContext.translate(centerX, centerY);
            canvasContext.rotate(angleInRadians);
            switch (true) {
                case (props.tileDirection == "top" || props.tileDirection == "bottom"):
                    canvasContext.translate(-selectedTileCopy.size.x * 100 / 2, -selectedTileCopy.size.y * 100 / 2)
                    canvasContext.drawImage(img, 0, 0, selectedTileCopy.size.x * 100, selectedTileCopy.size.y * 100);
                    break
                case (props.tileDirection == "left" || props.tileDirection == "right"):
                    canvasContext.translate(-selectedTileCopy.size.y * 100 / 2, -selectedTileCopy.size.x * 100 / 2)
                    canvasContext.drawImage(img, 0, 0, selectedTileCopy.size.y * 100, selectedTileCopy.size.x * 100);
                    break
            }
            canvasContext.restore();


        }

        if (lastTileRendered == selectedTileCopy.path) {
            // canvasContext.drawImage(img, x * 100, y * 100, selectedTileCopy.size.x * 100, selectedTileCopy.size.y * 100)
            draw()
        } else {
            img.onload = () => {
                draw()
            }

            img.src = selectedTileCopy.path
            lastTileRendered = selectedTileCopy.path
        }

        lastMousePosition = { x: x, y: y, sizeX: selectedTileCopy.size.x, sizeY: selectedTileCopy.size.y, tileDirection: props.tileDirection }
    }

    const onCanvasScrollCapture = (e: React.WheelEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        if (e.deltaY < 0) {
            // zoom +
            if (currentCanvasZoom + 0.03 >= 2) return

            setCurrentCanvasZoom(currentValue => currentValue + 0.03)
        }
        if (e.deltaY > 0) {
            // zoom -
            if (currentCanvasZoom - 0.03 <= .2) return
            setCurrentCanvasZoom(currentValue => currentValue - 0.03)

        }

    }

    let canvasPosition = { x: 0, y: 0 }
    const onCanvasDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.shiftKey == false || e.buttons != 1 || !containerRef.current) return

        canvasPosition.x = canvasPosition.x + e.movementX / 10 * currentCanvasZoom
        canvasPosition.y = canvasPosition.y + e.movementY / 10 * currentCanvasZoom

        containerRef.current.style.transform = `translate(${canvasPosition.x}%, ${canvasPosition.y}%)`
    }

    return (
        <div id='tableCanvasContainer' ref={containerRef} {...props} onMouseMove={(e) => onCanvasMouseMoveCapture(e)} onMouseDown={(e) => onCanvasClickCapture(e)} onWheel={(e) => onCanvasScrollCapture(e)} onMouseMoveCapture={(e) => onCanvasDrag(e)} onContextMenu={(e) => e.preventDefault()}>
            <canvas style={{ zIndex: props.z }} ref={canvasRef} height={100 * props.sizeY} width={100 * props.sizeX} className='h-full w-full absolute top-0 left-0 z-5' />
            {props.children}
        </div>
    )
}


export const drawInCanvas = ({ canvasId, blockData, needProxy = true}: { blockData: TBlock, canvasId: string, needProxy?:boolean }) => {
    const canvasElementsList: Element[] | null = Array.from(document.getElementsByClassName(canvasId))
    const baseURL = import.meta.env.VITE_API_URL

    for (let canvasElement of canvasElementsList) {
        if (canvasElement instanceof HTMLCanvasElement) {
            const canvasContext = canvasElement.getContext('2d')
            if (!canvasContext || !blockData.tileData) return
            canvasContext.clearRect(blockData.x * 100, blockData.y * 100, blockData.tileData.size.x * 100, blockData.tileData.size.y * 100)

            // const img = new Image();
            // img.onload = () => {
            //     if (!blockData.tileData) return
            //     draw()
            // }
            
            // img.src =  blockData.tileData.path

            const img = new Image();
            img.onload = () => {
                if (!blockData.tileData) return
                draw()
            }  

            if(needProxy){
                img.setAttribute('crossorigin', 'anonymous');
                img.src = baseURL+ "proxy?url=" + encodeURIComponent(blockData.tileData.path)
            }else{
                img.src = blockData.tileData.path
            }
            

            const draw = () => {
                if (!blockData.tileData) return
                const centerX = blockData.x * 100 + blockData.tileData.size.x * 100 / 2;
                const centerY = blockData.y * 100 + blockData.tileData.size.y * 100 / 2;
                const angleInDegrees = { top: 0, right: 270, bottom: 180, left: 90, };
                const angleInRadians = (angleInDegrees[blockData.direction] * Math.PI) / 180;

                canvasContext.save();
                canvasContext.translate(centerX, centerY);
                canvasContext.rotate(angleInRadians);
                switch (true) {
                    case (blockData.direction == "top" || blockData.direction == "bottom"):
                        canvasContext.translate(-blockData.tileData.size.x * 100 / 2, -blockData.tileData.size.y * 100 / 2)
                        canvasContext.drawImage(img, 0, 0, blockData.tileData.size.x * 100, blockData.tileData.size.y * 100);
                        break
                    case (blockData.direction == "left" || blockData.direction == "right"):
                        canvasContext.translate(-blockData.tileData.size.y * 100 / 2, -blockData.tileData.size.x * 100 / 2)
                        canvasContext.drawImage(img, 0, 0, blockData.tileData.size.y * 100, blockData.tileData.size.x * 100);
                        break
                }
                canvasContext.restore();
            }
        }
    }

}

export const eraseCanvas = ({ x, y, canvasId, sizeX, sizeY }: { x: number, y: number, canvasId: string, sizeX: number, sizeY: number }) => {

    const canvasElement: HTMLElement | null = document.getElementById(canvasId)
    if (canvasElement instanceof HTMLCanvasElement) {
        const canvasContext = canvasElement.getContext('2d')

        if (!canvasContext) return
        canvasContext.clearRect(x * 100, y * 100, sizeX * 100, sizeY * 100)
    }
}