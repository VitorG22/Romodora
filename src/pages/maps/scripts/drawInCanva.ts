import { BlocksList } from "../BlocksList"

interface IDrawGhost {
    X: number,
    Y: number,
    canvas: HTMLCanvasElement,
    blockSize: number,
    tileCountX: number,
    tileCountY: number,
    isCtrlActive: boolean,
    isAltActive: boolean,
    tileId: number,
    rotate: 'top' | 'right' | 'left' | 'bottom'
}


export function drawGhostHover({ X, Y, canvas, blockSize, tileCountX, tileCountY, isCtrlActive, isAltActive, tileId, rotate }: IDrawGhost) {
    let canvasCtx = canvas.getContext("2d")
    if (!canvasCtx) return
    
    const blockData = BlocksList.find((element) => element.id == tileId)

    canvasCtx.clearRect(0, 0, tileCountX * blockSize, tileCountY * blockSize)
    if (isCtrlActive || isAltActive) {
        canvasCtx.fillStyle = '#dc262610'
        canvasCtx.fillRect(X * blockSize, Y * blockSize, blockSize, blockSize)
        canvasCtx.strokeStyle = '#dc2626'
        canvasCtx.strokeRect(X * blockSize, Y * blockSize, blockSize, blockSize)

    } else {
        let ghostBlockWidth = 1 * blockSize
        let ghostBlockHeight = 1 * blockSize
        if (blockData) {
            ghostBlockWidth = blockData.size.X * blockSize
            ghostBlockHeight = blockData.size.Y * blockSize
        }

        if (rotate == "top" || rotate == 'bottom') {
            canvasCtx.fillStyle = '#00d67d10'
            canvasCtx.fillRect(X * blockSize, Y * blockSize, ghostBlockWidth, ghostBlockHeight)
            canvasCtx.strokeStyle = '#00d67d'
            canvasCtx.strokeRect(X * blockSize, Y * blockSize, ghostBlockWidth, ghostBlockHeight)

        } else if (rotate == "left" || rotate == 'right') {
            canvasCtx.fillStyle = '#00d67d10'
            canvasCtx.fillRect(X * blockSize, Y * blockSize, ghostBlockHeight, ghostBlockWidth)
            canvasCtx.strokeStyle = '#00d67d'
            canvasCtx.strokeRect(X * blockSize, Y * blockSize, ghostBlockHeight, ghostBlockWidth)
        }


    }

}