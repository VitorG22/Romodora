interface ITile {
    position: {
        X: number,
        Y: number
    }
    paths: string[]
    tileId: number
    variant: number
    size: {
        X: number
        Y: number
    }
    rotate: 'top' | 'right' | 'bottom' | 'left'
    type: 'solid' | 'void'
    group?: Array<{ X: number, Y: number }>
}


interface IDrawGhost {
    MouseX: number,
    MouseY: number,
    canvas: HTMLCanvasElement,
    blockSize: number,
    tileCountX: number,
    tileCountY: number,
    rotate: 'top' | 'right' | 'left' | 'bottom'
}


export class Tile {
    position; paths; tileId; variant; size; rotate; type; group
    imageElement = new Image();

    constructor(data: ITile) {
        this.paths = data.paths
        this.tileId = data.tileId
        this.variant = data.variant
        this.size = data.size
        this.rotate = data.rotate
        this.type = data.type
        this.group = data.group
        this.position = data.position
        this.imageElement.src = this.paths[this.variant]
    }

    rotateRight() {
        let rotateArray: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left']
        let rotateIndex: number = rotateArray.findIndex(element => element == this.rotate)
        if (rotateIndex >= 3) {
            this.rotate = 'top'
        } else {
            this.rotate = rotateArray[rotateIndex + 1]
        }
    }
    rotateLeft() {
        let rotateArray: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left']
        let rotateIndex: number = rotateArray.findIndex(element => element == this.rotate)
        if (rotateIndex <= 0) {
            this.rotate = 'left'
        } else {
            this.rotate = rotateArray[rotateIndex - 1]
        }
    }

    drawGhost({ MouseX, MouseY, canvas, blockSize, tileCountX, tileCountY }: IDrawGhost) {
        let canvasCtx = canvas.getContext("2d")
        if (!canvasCtx) return

        canvasCtx.clearRect(0, 0, tileCountX * blockSize, tileCountY * blockSize)

        let ghostBlockWidth = this.size.X * blockSize
        let ghostBlockHeight = this.size.X * blockSize


        if (this.rotate == "top" || this.rotate == 'bottom') {
            canvasCtx.fillStyle = '#00d67d10'
            canvasCtx.fillRect(MouseX * blockSize, MouseY * blockSize, ghostBlockWidth, ghostBlockHeight)
            canvasCtx.strokeStyle = '#00d67d'
            canvasCtx.strokeRect(MouseX * blockSize, MouseY * blockSize, ghostBlockWidth, ghostBlockHeight)

        } else if (this.rotate == "left" || this.rotate == 'right') {
            canvasCtx.fillStyle = '#00d67d10'
            canvasCtx.fillRect(MouseX * blockSize, MouseY * blockSize, ghostBlockHeight, ghostBlockWidth)
            canvasCtx.strokeStyle = '#00d67d'
            canvasCtx.strokeRect(MouseX * blockSize, MouseY * blockSize, ghostBlockHeight, ghostBlockWidth)
        }
    }

    eraseTile({ canvas, blockSize, tileCountX, tileCountY }: { canvas: HTMLCanvasElement, blockSize: number, tileCountX: number, tileCountY: number }) {
        let canvasCtx = canvas.getContext("2d")
        if (!canvasCtx) return

        if (this.rotate == 'top' || this.rotate == 'bottom') {
            canvasCtx.clearRect(this.position.X * blockSize, this.position.Y * blockSize, tileCountX * blockSize, tileCountY * blockSize)
        } else {
            canvasCtx.clearRect(this.position.X * blockSize, this.position.Y * blockSize, tileCountY * blockSize, tileCountX * blockSize)
        }

    }

    renderTile({ canvas, blockSize }: { canvas: HTMLCanvasElement, blockSize: number, tileCountX: number, tileCountY: number }) {

        let canvasCtx = canvas.getContext('2d')
        if (!canvasCtx) return

        let tileWidth = blockSize * this.size.X
        let tileHeight = blockSize * this.size.Y
        let tileLeft = this.position.X * blockSize
        let tileTop = this.position.Y * blockSize

        canvasCtx.save();
        switch (this.rotate) {
            case 'top':
                canvasCtx.clearRect(tileLeft, tileTop, tileWidth, tileHeight)
                canvasCtx.translate(tileLeft + tileWidth / 2, tileTop + tileHeight / 2);
                canvasCtx.rotate(0 * Math.PI / 180.0);
                canvasCtx.translate(-tileLeft - tileWidth / 2, -tileTop - tileHeight / 2);
                canvasCtx.drawImage(this.imageElement, tileLeft, tileTop, tileWidth, tileHeight);
                break
            case 'right':
                canvasCtx.clearRect(tileLeft, tileTop, tileHeight, tileWidth)
                canvasCtx.translate(tileLeft + tileHeight / 2, tileTop + tileWidth / 2);
                canvasCtx.rotate(90 * Math.PI / 180.0);
                canvasCtx.translate(-tileLeft - tileWidth / 2, -tileTop - tileHeight / 2);
                canvasCtx.drawImage(this.imageElement, tileLeft, tileTop, tileWidth, tileHeight);
                break
            case 'left':
                canvasCtx.clearRect(tileLeft, tileTop, tileHeight, tileWidth)
                canvasCtx.translate(tileLeft + tileHeight / 2, tileTop + tileWidth / 2);
                canvasCtx.rotate(270 * Math.PI / 180.0);
                canvasCtx.translate(-tileLeft - tileWidth / 2, -tileTop - tileHeight / 2);
                canvasCtx.drawImage(this.imageElement, tileLeft, tileTop, tileWidth, tileHeight);
                break
            case 'bottom':
                canvasCtx.clearRect(tileLeft, tileTop, tileWidth, tileHeight)
                canvasCtx.translate(tileLeft + tileWidth / 2, tileTop + tileHeight / 2);
                canvasCtx.rotate(180 * Math.PI / 180.0);
                canvasCtx.translate(-tileLeft - tileWidth / 2, -tileTop - tileHeight / 2);
                canvasCtx.drawImage(this.imageElement, tileLeft, tileTop, tileWidth, tileHeight);
                break
        }
        console.log('renderTile')
        canvasCtx.restore();
        canvasCtx.strokeStyle = "#00000050"
        canvasCtx.strokeRect(tileLeft, tileTop, blockSize, blockSize)
    }
}


