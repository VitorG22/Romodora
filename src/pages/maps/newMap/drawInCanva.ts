import { BlocksList } from "./BlocksList"
import { ITileData } from "./updateMapMatrix"

interface IDrawInCanva {
    canvas: HTMLCanvasElement
    mapMatrix: Array<ITileData[]>
    blockSize: number
    canvaType: 'floor' | 'props' | 'mobs'
}

interface IRenderTile {
    tileData: {
        paths: string[];
        tileId: number;
        variant: number;
        size: {
            X: number;
            Y: number;
        };
        rotate: "top" | "right" | "bottom" | "left";
        type: "solid" | "void";
        group?: Array<{
            X: number;
            Y: number;
        }>;
    } | null
    canvasCtx: CanvasRenderingContext2D,
    tileTop: number,
    tileLeft: number,
    blockSize: number,
    group?: { X: number; Y: number; }[] | undefined
}

interface IDrawGhost {
    X: number,
    Y: number,
    canvas: HTMLCanvasElement,
    blockSize: number,
    tileCountX: number,
    tileCountY: number,
    isCtrlActive: boolean,
    isShiftActive: boolean,
    tileId: number,
    rotate: 'top' | 'right' | 'left' | 'bottom'
}


export function DrawInCanva({ canvas, mapMatrix, blockSize, canvaType }: IDrawInCanva) {
    if (!canvas) return
    let canvasCtx = canvas.getContext("2d")
    mapMatrix.forEach((rowData, rowIndex) => {
        rowData.forEach((tileData, columnIndex) => {
            if (!canvasCtx) return
            let tileTop = rowIndex * blockSize
            let tileLeft = columnIndex * blockSize

            switch (canvaType) {
                case "floor":
                    renderTile({
                        tileData: tileData.floor,
                        canvasCtx,
                        tileTop,
                        tileLeft,
                        blockSize: blockSize,
                    })

                    break
                case "props":
                    renderTile({
                        tileData: tileData.props,
                        canvasCtx,
                        tileTop,
                        tileLeft,
                        blockSize: blockSize,
                    })

                    break
                break
            }

        })

    })
}


function renderTile({ tileData, canvasCtx, tileTop, tileLeft, blockSize }: IRenderTile) {


    if (tileData == null) {
        canvasCtx.clearRect(tileLeft, tileTop, blockSize, blockSize)
        canvasCtx.strokeStyle = "#00000050"
        canvasCtx.strokeRect(tileLeft, tileTop, blockSize, blockSize)
        return
    }
    let tileWidth = blockSize * tileData.size.X
    let tileHeight = blockSize * tileData.size.Y


    let img = new Image();
    img.onload = function () {
        canvasCtx.save();
        switch (tileData.rotate) {
            case 'top':
                canvasCtx.clearRect(tileLeft, tileTop, tileWidth, tileHeight)
                canvasCtx.translate(tileLeft + tileWidth / 2, tileTop + tileHeight / 2);
                canvasCtx.rotate(0 * Math.PI / 180.0);
                canvasCtx.translate(-tileLeft - tileWidth / 2, -tileTop - tileHeight / 2);
                canvasCtx.drawImage(img, tileLeft, tileTop, tileWidth, tileHeight);
                break
            case 'right':
                canvasCtx.clearRect(tileLeft, tileTop, tileHeight, tileWidth)
                canvasCtx.translate(tileLeft + tileHeight / 2, tileTop + tileWidth / 2);
                canvasCtx.rotate(90 * Math.PI / 180.0);
                canvasCtx.translate(-tileLeft - tileWidth / 2, -tileTop - tileHeight / 2);
                canvasCtx.drawImage(img, tileLeft, tileTop, tileWidth, tileHeight);
                break
            case 'left':
                canvasCtx.clearRect(tileLeft, tileTop, tileHeight, tileWidth)
                canvasCtx.translate(tileLeft + tileHeight / 2, tileTop + tileWidth / 2);
                canvasCtx.rotate(270 * Math.PI / 180.0);
                canvasCtx.translate(-tileLeft - tileWidth / 2, -tileTop - tileHeight / 2);
                canvasCtx.drawImage(img, tileLeft, tileTop, tileWidth, tileHeight);
                break
            case 'bottom':
                canvasCtx.clearRect(tileLeft, tileTop, tileWidth, tileHeight)
                canvasCtx.translate(tileLeft + tileWidth / 2, tileTop + tileHeight / 2);
                canvasCtx.rotate(180 * Math.PI / 180.0);
                canvasCtx.translate(-tileLeft - tileWidth / 2, -tileTop - tileHeight / 2);
                canvasCtx.drawImage(img, tileLeft, tileTop, tileWidth, tileHeight);
                break
        }
        canvasCtx.restore();

        canvasCtx.strokeStyle = "#00000050"
        canvasCtx.strokeRect(tileLeft, tileTop, blockSize, blockSize)

    }
    img.src = tileData.paths[0]


}


export function drawGhostHover({ X, Y, canvas, blockSize, tileCountX, tileCountY, isCtrlActive, isShiftActive, tileId, rotate }: IDrawGhost) {
    let canvasCtx = canvas.getContext("2d")
    if (!canvasCtx) return

    const blockData = BlocksList.find((element) => element.id == tileId)

    canvasCtx.clearRect(0, 0, tileCountX * blockSize, tileCountY * blockSize)
    if (isCtrlActive) {
        canvasCtx.fillStyle = '#dc262610'
        canvasCtx.fillRect(X * blockSize, Y * blockSize, blockSize, blockSize)
        canvasCtx.strokeStyle = '#dc2626'
        canvasCtx.strokeRect(X * blockSize, Y * blockSize, blockSize, blockSize)

    }else {
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