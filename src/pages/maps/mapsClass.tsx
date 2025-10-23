import { Component  } from "react"
import { DefaultCanvasElement, DefaultGridElement, drawInCanvas } from "./canvas"
import * as HUD from './hud'
import { RandomString } from "../../scripts/random"

export type TLayerMatrix = {
    x: number
    y: number
    type: 'void' | 'floor' | "wall"
    direction: string
    spriteData: string | null
}[][]

export type TLayer = {
    id: string;
    matrix: TLayerMatrix;
    name: string;
    show: boolean;
}
export interface ITableMap {
    name: string,
    lastModify?: Date
    sizeX: number
    sizeY: number
    layers?: TLayer[]

}

interface IState {
    sizeX: number
    sizeY: number
    layers: TLayer[]
    selectedLayer: string
}

export class TableMap extends Component<ITableMap, IState> {
    name; lastModify; state: IState;


    constructor(data: ITableMap) {
        super(data);
        this.name = data.name
        this.lastModify = data.lastModify || new Date()
        this.state = {
            sizeX: data.sizeX,
            sizeY: data.sizeY,
            layers: data.layers || [this.createDefaultLayers(data.sizeX, data.sizeY)],
            selectedLayer: '',
        }

    }

    componentDidMount(): void {
        this.setState({ selectedLayer: this.state.layers[0].id })
        console.log('teste')
    }

    setMapSize = ({ x, y }: { x: number, y: number }) => {
        this.setState({ sizeX: x, sizeY: y })
    }

    private createDefaultLayers = (sizeX?: number, sizeY?: number): TLayer => {
        return {
            name: "Default Layer",
            show: true,
            id: RandomString(20),
            matrix: Array.from({ length: sizeY || this.state.sizeY }, (i, y) => (Array.from({ length: sizeX || this.state.sizeX }, (j, x) => {
                i = i //only to fix vercel error
                j = j //only to fix vercel error
                return ({
                    x: x,
                    y: y,
                    direction: '',
                    type: "void",
                    spriteData: null
                })
            })))
        }
    }

    private addGridColumn = () => {
        let newLayersData = [...this.state.layers]
        newLayersData.map(layerData => {
            layerData.matrix.map((row, Y) => row[row.length] = {
                x: row.length,
                y: Y,
                type: "void",
                direction: '',
                spriteData: null
            })
        })
        this.setState({ sizeX: this.state.sizeX + 1, layers: newLayersData })
    }
    private deleteGridColumn = () => {
        if (this.state.sizeX <= 1) return
        let newLayersData = [...this.state.layers]
        newLayersData.map(layerData => layerData.matrix.map(row => row.pop()))

        this.setState({ sizeX: this.state.sizeX - 1, layers: newLayersData })
    }
    private addGridRow = () => {
        let newLayersData = [...this.state.layers]
        newLayersData.map(layerData => {
            layerData.matrix[layerData.matrix.length] = Array.from({ length: this.state.sizeX }, (i, x) => {
                i = i //only to fix vercel error
                return ({
                    x: x,
                    y: layerData.matrix.length,
                    type: "void",
                    direction: '',
                    spriteData: null
                })
            })
        })

        this.setState({ sizeY: this.state.sizeY + 1, layers: newLayersData })
    }
    private deleteGridRow = () => {
        if (this.state.sizeY <= 1) return

        let newLayersData = [...this.state.layers]
        newLayersData.map(layerData => layerData.matrix.pop())

        this.setState({ sizeY: this.state.sizeY - 1 })
    }

    private AddTileInMatrix = (x: number, y: number) => {

        let newLayersData = structuredClone(this.state.layers)
        let newLayerIndex = newLayersData.findIndex((layerData) => layerData.id == this.state.selectedLayer)

        newLayersData[newLayerIndex] = calcMapTileReorganization({ layerData: newLayersData[newLayerIndex], tilePosition: { x: x, y: y }, type: 'add' })

        this.setState({ layers: newLayersData })

        for (let rowIndex = y - 1; rowIndex <= y + 1; rowIndex++) {
            for (let columnIndex = x - 1; columnIndex <= x + 1; columnIndex++) {
                if (newLayersData[newLayerIndex].matrix[rowIndex]?.[columnIndex]) {

                    newLayersData[newLayerIndex].matrix[rowIndex]?.[columnIndex]
                    drawInCanvas({
                        canvasId: this.state.selectedLayer,
                        tileData: newLayersData[newLayerIndex].matrix[rowIndex]?.[columnIndex]
                    })
                }
            }
        }

    }

    private deleteTileFromMatrix = (x: number, y: number) => {
        let newLayersData = structuredClone(this.state.layers)
        let newLayerIndex = newLayersData.findIndex((layerData) => layerData.id == this.state.selectedLayer)

        newLayersData[newLayerIndex] = calcMapTileReorganization({ layerData: newLayersData[newLayerIndex], tilePosition: { x: x, y: y }, type: 'delete' })

        this.setState({ layers: newLayersData })

        for (let rowIndex = y - 1; rowIndex <= y + 1; rowIndex++) {
            for (let columnIndex = x - 1; columnIndex <= x + 1; columnIndex++) {
                if (newLayersData[newLayerIndex].matrix[rowIndex]?.[columnIndex]) {

                    drawInCanvas({
                        canvasId: this.state.selectedLayer,
                        tileData: newLayersData[newLayerIndex].matrix[rowIndex]?.[columnIndex]
                    })
                }
            }
        }

    }

    private draw = () => {

    }

    private setLayer = (layerData: TLayer) => {
        console.log(layerData)
        let newLayersData = [...this.state.layers]

        let newLayerIndex = newLayersData.findIndex((layer) => layer.id == layerData.id)

        newLayersData[newLayerIndex] = layerData
        this.setState({ layers: newLayersData })
    }

    private addLayer = () => {
        let newLayersData = this.state.layers
        newLayersData.push(this.createDefaultLayers())

        this.setState({ layers: newLayersData })
    }

    private deleteLayer = (layerId: string) => {
        let newLayersData = this.state.layers
        let layerIndex = newLayersData.findIndex(layerData => layerData.id == layerId)
        if (layerIndex == -1) return

        newLayersData.splice(layerIndex, 1)
        this.setState({ layers: newLayersData })
    }



    render() {

        return (
            <>
                <HUD.Container>
                    <HUD.Controls />
                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                        <HUD.GridOptions sizeX={this.state.sizeX} sizeY={this.state.sizeY} addGridRow={this.addGridRow} deleteGridRow={this.deleteGridRow} addGridColumn={this.addGridColumn} deleteGridColumn={this.deleteGridColumn} />
                    </div>
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 items-end">
                        <HUD.LayerOptions selectedLayer={this.state.selectedLayer} setSelectedLayer={(layerId: string) => { this.setState({ selectedLayer: layerId }) }} deleteLayer={this.deleteLayer} addLayer={this.addLayer} layerList={this.state.layers} setLayer={this.setLayer} />
                    </div>
                </HUD.Container>
                <DefaultGridElement z={this.state.layers.length + 1} rightClickFunction={this.deleteTileFromMatrix} leftClickFunction={this.AddTileInMatrix} sizeX={this.state.sizeX} sizeY={this.state.sizeY} style={{ aspectRatio: this.state.sizeX / this.state.sizeY }} className='relative border border-stone-950 rounded-md h-full overflow-hidden place-self-center'>
                    {this.state.layers.map(layerData => <DefaultCanvasElement tileMatrix={layerData.matrix} key={`default_canvas_element_${layerData.id}`} id={layerData.id} sizeX={this.state.sizeX} sizeY={this.state.sizeY} />)}
                </DefaultGridElement>
            </>

        )
    }

}



function calcMapTileReorganization({ layerData, tilePosition, type }: { layerData: TLayer, tilePosition: { x: number, y: number }, type: "add" | "delete" }): TLayer {

    let layerDataCopy = { ...layerData }

    const calcType = (x: number, y: number) => {
        switch (layerDataCopy.matrix[y]?.[x]?.type) {
            case "void":
                for (let rowIndex = y - 1; rowIndex <= y + 1; rowIndex++) {
                    for (let columnIndex = x - 1; columnIndex <= x + 1; columnIndex++) {
                        if (rowIndex != y || columnIndex != x) { //é pulado caso o tile atual seja o central
                            if (layerDataCopy.matrix[rowIndex]?.[columnIndex]?.type == 'floor') {
                                layerDataCopy.matrix[y][x].type = "wall"
                                layerDataCopy.matrix[y][x].direction = ""
                            }
                        }
                    }
                }
                break
            case "wall":
                layerDataCopy.matrix[y][x].type = "void"
                for (let rowIndex = y - 1; rowIndex <= y + 1; rowIndex++) {
                    for (let columnIndex = x - 1; columnIndex <= x + 1; columnIndex++) {
                        if (rowIndex != y || columnIndex != x) {//é pulado caso o tile atual seja o central
                            if (layerDataCopy.matrix[rowIndex]?.[columnIndex]?.type == 'floor') {
                                layerDataCopy.matrix[y][x].type = "wall"
                                layerDataCopy.matrix[y][x].direction = ""
                            }
                        }
                    }
                }
                break
        }
    }

    const calcDirection = (x: number, y: number) => {
        
        let MainTileType = layerDataCopy.matrix[y]?.[x]?.type
        if(MainTileType == null || MainTileType == 'void')return
        let directionDefaultString = ''
        if (layerDataCopy.matrix[y - 1]?.[x]?.type == MainTileType) { directionDefaultString = directionDefaultString + 'top_' }   //top Tile
        if (layerDataCopy.matrix[y]?.[x + 1]?.type == MainTileType) { directionDefaultString = directionDefaultString + 'right_' }     //right Tile
        if (layerDataCopy.matrix[y + 1]?.[x]?.type == MainTileType) { directionDefaultString = directionDefaultString + 'bottom_' }      //bottom Tile
        if (layerDataCopy.matrix[y]?.[x - 1]?.type == MainTileType) { directionDefaultString = directionDefaultString + 'left_' }       //left Tile
        if (directionDefaultString == '') { directionDefaultString = 'full_' }
        directionDefaultString = directionDefaultString.slice(0, -1)
        layerDataCopy.matrix[y][x].direction = directionDefaultString
    }

    switch (type) {
        case "add":
            layerDataCopy.matrix[tilePosition.y][tilePosition.x].type = "floor"
            calcType(tilePosition.x, tilePosition.y)
            break
        case "delete":
            layerDataCopy.matrix[tilePosition.y][tilePosition.x].type = "void"
            calcType(tilePosition.x, tilePosition.y)
            break
    }



    // a junção dos loop for percorre todos os tiles em torno a tilePosition 
    for (let rowIndex = tilePosition.y - 1; rowIndex <= tilePosition.y + 1; rowIndex++) {
        for (let columnIndex = tilePosition.x - 1; columnIndex <= tilePosition.x + 1; columnIndex++) {
            if (rowIndex != tilePosition.y || columnIndex != tilePosition.x) {
                calcType(columnIndex, rowIndex)
            }
        }
    }

    for (let rowIndex = tilePosition.y - 1; rowIndex <= tilePosition.y + 1; rowIndex++) {
        for (let columnIndex = tilePosition.x - 1; columnIndex <= tilePosition.x + 1; columnIndex++) {
            calcDirection(columnIndex, rowIndex)
        }
    }




    return (layerDataCopy)
}