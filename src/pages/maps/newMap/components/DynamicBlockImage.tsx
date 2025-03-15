import React, { useEffect, useRef } from "react"

interface IDynamicBlockImage extends React.ComponentPropsWithoutRef<'canvas'>{
    img: string
}

export default function DynamicBlockImage(props:IDynamicBlockImage) {
    let canvaRef = useRef<HTMLCanvasElement | null>(null)
    let imageElement = new Image();
    imageElement.src = props.img

    useEffect(() => {
        if (!canvaRef.current) return
        drawImageInCanva()
    }, [])

    const drawImageInCanva = () => {
        if(!canvaRef.current)return
        let canvasCtx = canvaRef.current?.getContext('2d')
        if (!canvasCtx) return

        let tileWidth = 100
        let tileHeight = 100
        let tileLeft = 0
        let tileTop = 0

        let gridBlockSize = imageElement.width / 3
        let gridLeft = 1 * gridBlockSize
        let gridTop = 1 * gridBlockSize

        canvasCtx.clearRect(tileLeft, tileTop, tileWidth, tileHeight);
        canvasCtx.drawImage(imageElement, gridLeft, gridTop, gridBlockSize, gridBlockSize, tileLeft, tileTop, tileWidth, tileHeight);
        // canvasCtx.strokeStyle = "#00000050"
        // canvasCtx.strokeRect(tileLeft, tileTop, 100, 100)
    }
    return (
        <canvas ref={canvaRef} height={100} width={100} {...props} />

    )
}