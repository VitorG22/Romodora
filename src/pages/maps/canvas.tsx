import React, { useEffect, useRef, useState, type ReactElement } from "react"
import type { TLayerMatrix } from "./mapsClass";
import { RandomNumber } from "../../scripts/random";

interface IContainer extends React.ComponentPropsWithoutRef<'div'> {
    z: number,
    sizeX: number,
    sizeY: number,
    leftClickFunction: (x: number, y: number) => void
    rightClickFunction: (x: number, y: number) => void
}

export function DefaultCanvasElement(data: { tileMatrix: TLayerMatrix, sizeX: number, sizeY: number, id: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        reDraw()
    }, [data.sizeX, data.sizeY])



    const reDraw = () => {
        data.tileMatrix.forEach((row, y) => row.forEach((tileData, x) => {

            if (!canvasRef.current) return
            const canvasContext = canvasRef.current.getContext('2d')
            if (!canvasContext) return

            let lineWidth = 6
            canvasContext.lineWidth = lineWidth

            if (tileData.type == "void") {
                return
            }

            if (tileData.type == 'wall') {
                // ----- background linhas diagonais -----
                canvasContext.beginPath();
                let linesCount = 4
                for (let i = 0; i <= linesCount; i++) {
                    canvasContext.moveTo((x * 100), (y * 100) + i * (100 / (linesCount + 1)))
                    canvasContext.lineTo((x * 100) + (linesCount - i + 1) * (100 / (linesCount + 1)), (y + 1) * 100)

                    canvasContext.moveTo((x * 100) + i * (100 / (linesCount + 1)), (y * 100))
                    canvasContext.lineTo((x + 1) * 100, (y * 100) + (linesCount - i + 1) * (100 / (linesCount + 1)))

                }
            }




            canvasContext.stroke()
        }))
    }



    return (
        <canvas
            ref={canvasRef}
            id={data.id}
            height={100 * data.sizeY} width={100 * data.sizeX}
            className='w-full h-full absolute top-0 left-0'
        />
    )
}


let lastMousePosition = { x: -1, y: -1 }
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
            canvasContext.strokeStyle = '#0c0a0930'
            canvasContext.moveTo((i * 100), 0)
            canvasContext.lineTo(i * 100, props.sizeY * 100)
            canvasContext.stroke()
        }

        for (let i = 0; i <= props.sizeY; i++) {
            canvasContext.strokeStyle = '#0c0a0930'
            canvasContext.moveTo(0, i * 100)
            canvasContext.lineTo(props.sizeX * 100, i * 100)
            canvasContext.stroke()
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
                props.leftClickFunction(x, y)
                break;
            case 2:
                props.rightClickFunction(x, y)
                break;
        }
    }

    const onCanvasMouseMoveCapture = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { x, y } = getMousePosition(e)

        if (x == lastMousePosition.x && y == lastMousePosition.y) return


        const canvasContext = canvasRef.current?.getContext('2d')
        if (!canvasContext) { lastMousePosition = { x: x, y: y }; return }

        canvasContext.clearRect((lastMousePosition.x * 100) + 1, (lastMousePosition.y * 100) + 1, 98, 98)

        const gradient = canvasContext.createRadialGradient(x * 100 + 48, y * 100 + 48, 98, x * 100 + 48, y * 100 + 48, 0)
        gradient.addColorStop(0, '#ad46ff')
        gradient.addColorStop(1, '#ad46ff30')
        canvasContext.fillStyle = gradient
        canvasContext.fillRect((x * 100) + 1, (y * 100) + 1, 98, 98)

        lastMousePosition = { x: x, y: y }
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
            <canvas style={{ zIndex: props.z }} ref={canvasRef} height={100 * props.sizeY} width={100 * props.sizeX} className='w-full h-full absolute top-0 left-0 z-5' />
            {props.children}
        </div>
    )
}


export const drawInCanvas = ({ canvasId, tileData }: { tileData: { x: number, y: number, type: "void" | "floor" | "wall", direction: string; spriteData: string | null; }, canvasId: string }) => {
    const canvasElement: HTMLElement | null = document.getElementById(canvasId)
    if (canvasElement instanceof HTMLCanvasElement) {
        const canvasContext = canvasElement.getContext('2d')

        if (!canvasContext) return

        switch (tileData.type) {
            case 'floor':
                canvasContext.fillStyle = '#22ccff'
                canvasContext.fillRect(tileData.x * 100, tileData.y * 100, 100, 100)

                break
            case 'wall':
                drawWall({
                    canvasContext: canvasContext,
                    direction: tileData.direction,
                    x: tileData.x,
                    y: tileData.y,

                })
                break
            case 'void':
                canvasContext.clearRect(tileData.x * 100 + 1, tileData.y * 100 + 1, 98, 98)
                break
        }

        // let backgroundLineWidth = 5
        // let wallLineWidth = 10
        // let linesCount = 4

        // adjacentBlocks.forEach((row, rowIndex) => row.forEach((type, columnIndex) => {
        //     let tileX = (x - 1) + columnIndex
        //     let tileY = (y - 1) + rowIndex

        //     if (type == "wall") {
        //         for (let line = 0; line <= linesCount; line++) {
        //             canvasContext.lineWidth = backgroundLineWidth
        //             canvasContext.beginPath();
        //             canvasContext.moveTo((tileX * 100), (tileY * 100) + line * (100 / (linesCount + 1)))
        //             canvasContext.lineTo((tileX * 100) + (linesCount - line + 1) * (100 / (linesCount + 1)), (tileY + 1) * 100)

        //             canvasContext.moveTo((tileX * 100) + line * (100 / (linesCount + 1)), (tileY * 100))
        //             canvasContext.lineTo((tileX + 1) * 100, (tileY * 100) + (linesCount - line + 1) * (100 / (linesCount + 1)))
        //             canvasContext.stroke()
        //         }
        //     }

        //     if (type == 'void') {
        //         canvasContext.clearRect(tileX * 100, tileY * 100, (tileX + 1) * 100, (tileY + 1) * 100)
        //     }


        // }

        // switch (adjacentBlocks[1][1]) {

        //     case "wall":
        //         for (let line = 0; line <= linesCount; line++) {
        //             canvasContext.lineWidth = backgroundLineWidth
        //             canvasContext.beginPath();
        //             canvasContext.moveTo((x * 100), (y * 100) + line * (100 / (linesCount + 1)))
        //             canvasContext.lineTo((x * 100) + (linesCount - line + 1) * (100 / (linesCount + 1)), (y + 1) * 100)

        //             canvasContext.moveTo((x * 100) + line * (100 / (linesCount + 1)), (y * 100))
        //             canvasContext.lineTo((x + 1) * 100, (y * 100) + (linesCount - line + 1) * (100 / (linesCount + 1)))
        //             canvasContext.stroke()
        //         }
        //         break
        //     case 'void':
        //         canvasContext.clearRect(x * 100, y * 100, (x + 1) * 100, (y + 1) * 100)
        //         break

        //     case 'floor':
        //         canvasContext.clearRect(x * 100, y * 100, 100, 100)
        //         canvasContext.beginPath()
        //         canvasContext.lineWidth = wallLineWidth
        //         if (adjacentBlocks[0]?.[1] == "wall") { canvasContext.moveTo(x * 100, y * 100 - wallLineWidth / 2); canvasContext.lineTo((x + 1) * 100, y * 100 - wallLineWidth / 2) }
        //         if (adjacentBlocks[2]?.[1] == "wall") { canvasContext.moveTo(x * 100, (y + 1) * 100 + wallLineWidth / 2); canvasContext.lineTo((x + 1) * 100, (y + 1) * 100 + wallLineWidth / 2) }
        //         if (adjacentBlocks[1]?.[0] == "wall") { canvasContext.moveTo(x * 100 - wallLineWidth / 2, y * 100); canvasContext.lineTo(x * 100 - wallLineWidth / 2, (y + 1) * 100) }
        //         if (adjacentBlocks[1]?.[2] == "wall") { canvasContext.moveTo((x + 1) * 100 + wallLineWidth / 2, y * 100); canvasContext.lineTo((x + 1) * 100 + wallLineWidth / 2, (y + 1) * 100) }

        //         if (adjacentBlocks[0]?.[0] == 'wall') { canvasContext.fillRect(x * 100 - wallLineWidth, y * 100 - wallLineWidth, wallLineWidth, wallLineWidth) }
        //         if (adjacentBlocks[0]?.[2] == 'wall') { canvasContext.fillRect((x + 1) * 100, y * 100 - wallLineWidth, wallLineWidth, wallLineWidth) }
        //         if (adjacentBlocks[2]?.[0] == 'wall') { canvasContext.fillRect(x * 100 - wallLineWidth, (y + 1) * 100, wallLineWidth, wallLineWidth) }
        //         if (adjacentBlocks[2]?.[2] == 'wall') { canvasContext.fillRect((x + 1) * 100, (y + 1) * 100, wallLineWidth, wallLineWidth) }
        //         canvasContext.stroke();
        //         break
        // }


    }

    // ----- Curva -----
    // canvasContext.lineWidth = 5
    // canvasContext.moveTo((x+1)*100 , (y*100))
    // canvasContext.arc(x* 100, y*100, 100,0, Math.PI*2/4)
    // canvasContext.stroke()


}

export const eraseCanvas = ({ x, y, canvasId }: { x: number, y: number, canvasId: string }) => {
    console.log("erase")
    const canvasElement: HTMLElement | null = document.getElementById(canvasId)
    if (canvasElement instanceof HTMLCanvasElement) {
        const canvasContext = canvasElement.getContext('2d')

        if (!canvasContext) return
        canvasContext.clearRect(x * 100 + 1, y * 100 + 1, 98, 98)
    }
}



const drawWall = ({ canvasContext, direction, x, y }: { canvasContext: CanvasRenderingContext2D, direction: string, x: number, y: number }) => {


    let wallLineWidth = 8

    let linesCount = 6
    canvasContext.clearRect(x * 100, y * 100, 100, 100)
    canvasContext.fillStyle = 'black'
    canvasContext.lineWidth = wallLineWidth
    // Linhas Diagonais
    // for (let line = 0; line <= linesCount; line++) {
    //     canvasContext.beginPath()
    //     canvasContext.lineWidth = wallLineWidth / 2
    //     canvasContext.moveTo((x * 100), (y * 100) + line * (100 / (linesCount + 1)))
    //     canvasContext.lineTo((x * 100) + (linesCount - line + 1) * (100 / (linesCount + 1)), (y + 1) * 100)

    //     canvasContext.moveTo((x * 100) + line * (100 / (linesCount + 1)), (y * 100))
    //     canvasContext.lineTo((x + 1) * 100, (y * 100) + (linesCount - line + 1) * (100 / (linesCount + 1)))
    //     canvasContext.stroke()
    //     canvasContext.closePath()
    // }



    switch (direction) {
        case 'full':
            for (let line = 0; line <= linesCount; line++) {
                canvasContext.lineWidth = wallLineWidth / 2
                canvasContext.moveTo((x * 100), (y * 100) + line * (100 / (linesCount + 1)))
                canvasContext.lineTo((x * 100) + (linesCount - line + 1) * (100 / (linesCount + 1)), (y + 1) * 100)

                canvasContext.moveTo((x * 100) + line * (100 / (linesCount + 1)), (y * 100))
                canvasContext.lineTo((x + 1) * 100, (y * 100) + (linesCount - line + 1) * (100 / (linesCount + 1)))
                canvasContext.stroke()
            }
            break
        case 'top':
            canvasContext.beginPath()
            canvasContext.moveTo((x + 1) * 100 - wallLineWidth / 2, y * 100 + 50 - wallLineWidth)
            canvasContext.arc(x * 100 + 50, y * 100 + 50, 50 - wallLineWidth / 2, 0, Math.PI)
            canvasContext.moveTo(x * 100 + wallLineWidth / 2, y * 100)
            canvasContext.lineTo(x * 100 + wallLineWidth / 2, y * 100 + 50)
            canvasContext.moveTo((x + 1) * 100 - wallLineWidth / 2, y * 100)
            canvasContext.lineTo((x + 1) * 100 - wallLineWidth / 2, y * 100 + 50)
            canvasContext.stroke()
            canvasContext.closePath
            break
        case 'right':
            canvasContext.beginPath()
            canvasContext.moveTo(x * 100 + 50, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.arc(x * 100 + 50, y * 100 + 50, 50 - wallLineWidth / 2, Math.PI / 2, (3 / 2) * Math.PI)
            canvasContext.moveTo(x * 100 + 50, y * 100 + wallLineWidth / 2)
            canvasContext.lineTo((x + 1) * 100, y * 100 + wallLineWidth / 2)
            canvasContext.moveTo(x * 100 + 50, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.lineTo((x + 1) * 100, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.stroke()
            canvasContext.closePath()
            break
        case 'bottom':
            canvasContext.beginPath()
            canvasContext.moveTo(x * 100 + wallLineWidth / 2, y * 100 + 50 - wallLineWidth / 2)
            canvasContext.arc(x * 100 + 50, y * 100 + 50, 50 - wallLineWidth / 2, Math.PI, 0)
            canvasContext.moveTo(x * 100 + wallLineWidth / 2, y * 100 + 50)
            canvasContext.lineTo(x * 100 + wallLineWidth / 2, (y + 1) * 100)
            canvasContext.moveTo((x + 1) * 100 - wallLineWidth / 2, y * 100 + 50)
            canvasContext.lineTo((x + 1) * 100 - wallLineWidth / 2, (y + 1) * 100)
            canvasContext.stroke()
            canvasContext.closePath
            break
        case 'left':
            canvasContext.beginPath()
            canvasContext.moveTo(x * 100 + 50, y * 100 + wallLineWidth / 2)
            canvasContext.arc(x * 100 + 50, y * 100 + 50, 50 - wallLineWidth / 2, (3 / 2) * Math.PI, Math.PI / 2)
            canvasContext.moveTo(x * 100, y * 100 + wallLineWidth / 2)
            canvasContext.lineTo(x * 100 + 50, y * 100 + wallLineWidth / 2)
            canvasContext.moveTo(x * 100, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.lineTo(x * 100 + 50, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.stroke()
            canvasContext.closePath()
            break
        case 'right_left':
            canvasContext.beginPath()
            canvasContext.lineWidth = wallLineWidth
            canvasContext.moveTo(x * 100, y * 100 + wallLineWidth / 2)
            canvasContext.lineTo((x + 1) * 100, y * 100 + wallLineWidth / 2)
            canvasContext.moveTo(x * 100, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.lineTo((x + 1) * 100, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.stroke()
            canvasContext.closePath()
            break
        case 'top_bottom':
            canvasContext.beginPath()
            canvasContext.lineWidth = wallLineWidth
            canvasContext.moveTo(x * 100 + wallLineWidth / 2, y * 100)
            canvasContext.lineTo(x * 100 + wallLineWidth / 2, (y + 1) * 100)
            canvasContext.moveTo((x + 1) * 100 - wallLineWidth / 2, y * 100)
            canvasContext.lineTo((x + 1) * 100 - wallLineWidth / 2, (y + 1) * 100)
            canvasContext.stroke()
            canvasContext.closePath()
            break
        case 'bottom_left':
            canvasContext.beginPath()
            canvasContext.lineWidth = wallLineWidth
            canvasContext.moveTo(x * 100 + 50 - wallLineWidth / 2, y * 100 + wallLineWidth / 2)
            canvasContext.arc(x * 100 + 50 - wallLineWidth / 2, ((y + 1) * 100) - 50 + wallLineWidth / 2, 50, Math.PI * (3 / 2), 0)
            canvasContext.moveTo(x * 100, y * 100 + wallLineWidth / 2)
            canvasContext.lineTo(x * 100 + 50 - wallLineWidth / 2, y * 100 + wallLineWidth / 2)
            canvasContext.moveTo((x + 1) * 100 - wallLineWidth / 2, y * 100 + 50 + wallLineWidth / 2)
            canvasContext.lineTo((x + 1) * 100 - wallLineWidth / 2, (y + 1) * 100)
            canvasContext.fillRect(x * 100, (y + 1) * 100 - wallLineWidth, wallLineWidth, wallLineWidth)
            canvasContext.stroke()
            canvasContext.closePath()

            break
        case 'top_left':
            canvasContext.beginPath()
            canvasContext.lineWidth = wallLineWidth
            canvasContext.moveTo((x + 1) * 100 - wallLineWidth / 2, y * 100 + 50 - wallLineWidth / 2)
            canvasContext.arc(x * 100 + 50 - wallLineWidth / 2, y * 100 + 50 - wallLineWidth / 2, 50, 0, Math.PI / 2)
            canvasContext.moveTo((x + 1) * 100 - wallLineWidth / 2, y * 100)
            canvasContext.lineTo((x + 1) * 100 - wallLineWidth / 2, y * 100 + 50)
            canvasContext.moveTo(x * 100, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.lineTo(x * 100 + 50, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.fillRect(x * 100, y * 100, wallLineWidth, wallLineWidth)
            canvasContext.stroke()
            canvasContext.closePath()
            break
        case 'top_right':
            canvasContext.beginPath()
            canvasContext.lineWidth = wallLineWidth
            canvasContext.moveTo(x * 100 + 50 + wallLineWidth / 2, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.arc(x * 100 + 50 + wallLineWidth / 2, y * 100 + 50 - wallLineWidth / 2, 50, Math.PI / 2, Math.PI)
            canvasContext.moveTo(x * 100 + wallLineWidth / 2, y * 100)
            canvasContext.lineTo(x * 100 + wallLineWidth / 2, y * 100 + 50)
            canvasContext.moveTo(x * 100 + 50, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.lineTo((x + 1) * 100, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.fillRect((x + 1) * 100 - wallLineWidth, y * 100, wallLineWidth, wallLineWidth)
            canvasContext.stroke()
            canvasContext.closePath()
            break
        case 'right_bottom':
            canvasContext.beginPath()
            canvasContext.lineWidth = wallLineWidth
            canvasContext.moveTo(x * 100 + wallLineWidth / 2, y * 100 + 50 + wallLineWidth / 2)
            canvasContext.arc(x * 100 + 50 + wallLineWidth / 2, y * 100 + 50 + wallLineWidth / 2, 50, Math.PI, Math.PI * (3 / 2))
            canvasContext.moveTo(x * 100 + wallLineWidth / 2, y * 100 + 50)
            canvasContext.lineTo(x * 100 + wallLineWidth / 2, (y + 1) * 100)
            canvasContext.moveTo(x * 100 + 50, y * 100 + wallLineWidth / 2)
            canvasContext.lineTo((x + 1) * 100, y * 100 + wallLineWidth / 2)
            canvasContext.fillRect((x + 1) * 100 - wallLineWidth, (y + 1) * 100 - wallLineWidth, wallLineWidth, wallLineWidth)
            canvasContext.stroke()
            canvasContext.closePath()
            break
        case 'right_bottom_left':
            canvasContext.beginPath()
            canvasContext.moveTo(x * 100, y * 100 + wallLineWidth / 2)
            canvasContext.lineTo((x + 1) * 100, y * 100 + wallLineWidth / 2)
            canvasContext.fillRect(x * 100, (y + 1) * 100 - wallLineWidth, wallLineWidth, wallLineWidth)
            canvasContext.fillRect((x + 1) * 100 - wallLineWidth, (y + 1) * 100 - wallLineWidth, wallLineWidth, wallLineWidth)
            canvasContext.stroke()
            canvasContext.closePath
            break
        case 'top_right_left':
            canvasContext.beginPath()
            canvasContext.moveTo(x * 100, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.lineTo((x + 1) * 100, (y + 1) * 100 - wallLineWidth / 2)
            canvasContext.fillRect(x * 100, y * 100, wallLineWidth, wallLineWidth)
            canvasContext.fillRect((x + 1) * 100 - wallLineWidth, y * 100, wallLineWidth, wallLineWidth)
            canvasContext.stroke()
            canvasContext.closePath
            break
        case 'top_bottom_left':
            canvasContext.beginPath()
            canvasContext.moveTo((x + 1) * 100 - wallLineWidth / 2, y * 100)
            canvasContext.lineTo((x + 1) * 100 - wallLineWidth / 2, (y + 1) * 100)
            canvasContext.fillRect(x * 100, y * 100, wallLineWidth, wallLineWidth)
            canvasContext.fillRect(x * 100, (y + 1) * 100 - wallLineWidth, wallLineWidth, wallLineWidth)
            canvasContext.stroke()
            canvasContext.closePath
            break
        case 'top_right_bottom':
            canvasContext.beginPath()
            canvasContext.moveTo(x * 100 + wallLineWidth / 2, y * 100)
            canvasContext.lineTo(x * 100 + wallLineWidth / 2, (y + 1) * 100)
            canvasContext.fillRect((x + 1) * 100 - wallLineWidth, y * 100, wallLineWidth, wallLineWidth)
            canvasContext.fillRect((x + 1) * 100 - wallLineWidth, (y + 1) * 100 - wallLineWidth, wallLineWidth, wallLineWidth)
            canvasContext.stroke()
            canvasContext.closePath
            break
    }
}