import { useContext, useEffect, useState } from "react"
import { BlocksList, IBlock } from "../BlocksList"
import { BrickWall, DoorOpen, Ghost, Grid2X2, ScanIcon } from "lucide-react";
import SquareButton from "../../../../components/buttons";
import { saveMapsInLocalStorage } from "../../../../scripts/localStorage/localStorage";
import { MapsContext } from "../..";
import { ITileData } from "../updateMapMatrix";
import { useParams } from "react-router-dom";

interface ILateralTileMenu {
    selectedTile: { tileId: number, variant: number }
    setSelectedTileId: React.Dispatch<React.SetStateAction<{
        tileId: number;
        variant: number;
    }>>
    mapMatrix: ITileData[][]
}

export default function LateralTileMenu({ selectedTile, setSelectedTileId , mapMatrix }: ILateralTileMenu) {
    const [selectedBlockId, setSelectedBlockId] = useState<number>(0)
    const [selectedBlockData, setSelectedBlockData] = useState<IBlock | undefined>(undefined)
    const [blocksListToRender, setBlocksListToRender] = useState<IBlock[]>(BlocksList)

    useEffect(() => {
        const Block = BlocksList.find(element => element.id == selectedBlockId)
        if (!Block) return
        setSelectedBlockData(Block)
        setSelectedTileId({
            tileId: selectedBlockId,
            variant: 0
        })
    }, [selectedBlockId])

    const setVariant = (variantIndex: number) => {
        setSelectedTileId({
            tileId: selectedBlockId,
            variant: variantIndex
        })
    }

    return (
        <main className='flex flex-row h-screen z-10'>
            {selectedBlockData &&
                <section>
                    <ul className='flex flex-col gap-2 p-4 bg-lagun-900/80  h-full overflow-y-scroll'>
                        {selectedBlockData.variant.map((variantData, variantIndex) => <li key={variantData.name}>
                            {variantIndex == selectedTile.variant ?
                                <img src={variantData.path[0]} className='w-16 aspect-square border border-lagun-500 rounded-md'
                                /> :
                                <img src={variantData.path[0]} className='w-16 aspect-square border border-transparent hover:border-lagun-500 rounded-md'
                                    onClick={() => setVariant(variantIndex)}
                                />
                            }
                        </li>)}
                    </ul>
                </section>
            }
            <section className='text-white w-72 bg-lagun-900 p-2 h-full flex flex-col justify-between gap-2'>
                <Filter setBlocksListToRender={setBlocksListToRender} />
                <ul className='max-h-full h-full py-2 flex flex-row justify-center items-start gap-2 flex-wrap w-full overflow-y-scroll'>
                    {blocksListToRender.map((BlockData) => <li key={`Block_${BlockData.id}`}>
                        {BlockData.id == selectedBlockId ?
                            <img src={BlockData.variant[0].path[0]}
                                className='w-20 aspect-square border border-lagun-500 rounded-md'
                            /> :
                            <img src={BlockData.variant[0].path[0]} onClick={() => setSelectedBlockId(BlockData.id)}
                                className='w-20 aspect-square border border-transparent hover:border-lagun-500 rounded-md'
                            />
                        }
                    </li>)}
                </ul>
                <div className='flex flex-row gap-2 justify-end'>
                    <SquareButton size="lg" variant="ghost" onClick={() => history.back()}>
                        Cancel
                    </SquareButton>
                    <SaveMapButton mapMatrix={mapMatrix}/>

                </div>
            </section>
        </main>
    )
}

function Filter({ setBlocksListToRender }: { setBlocksListToRender: React.Dispatch<React.SetStateAction<IBlock[]>> }) {
    const [selectedFilter, setSelectedFilter] = useState<string>('floor')

    useEffect(() => {
        (() => {

            let newListToRender = BlocksList.filter(element => {
                if (element.filter == selectedFilter) return element
            })
            setBlocksListToRender(newListToRender)
        })()

    }, [selectedFilter])

    return (
        <ul className=' flex flex-row flex-wrap gap-2 justify-center'>
            <FilterButton onClick={() => setSelectedFilter('border')}><ScanIcon size={15} strokeWidth={1} />Border</FilterButton>
            <FilterButton onClick={() => setSelectedFilter('floor')}><Grid2X2 size={15} strokeWidth={1} />Floor</FilterButton>
            <FilterButton onClick={() => setSelectedFilter('wall')}><BrickWall size={15} strokeWidth={1} />Wall</FilterButton>
            <FilterButton onClick={() => setSelectedFilter('door')}><DoorOpen size={15} strokeWidth={1} />Door</FilterButton>
            <FilterButton onClick={() => setSelectedFilter('mob')}><Ghost size={15} strokeWidth={1} />Mob</FilterButton>
        </ul>
    )
}

function FilterButton(props: React.ComponentProps<'li'>) {
    return (
        <li {...props} className='flex flex-row gap-2 justify-center items-center text-lagun-500 px-2 py-1 hover:bg-lagun-200/40'>
            {props.children}
        </li>
    )
}

function SaveMapButton({mapMatrix}:{mapMatrix: ITileData[][]}) {
    const {mapId} = useParams()
    const {mapList, setMapList} = useContext(MapsContext)
    
    const saveMap = ()=>{
        let mapIndex = mapList.findIndex(mapData => mapData.id == mapId)
        let newMapList = [...mapList]
        if(mapIndex == -1 || !setMapList)return


        const mapSizeX = mapMatrix[0].length
        const mapSizeY = mapMatrix.length
        newMapList[mapIndex] = {
            ...newMapList[mapIndex],
            mapStructureData: mapMatrix,
            sizeX: mapSizeX,
            sizeY: mapSizeY
        }
        
        saveMapsInLocalStorage({
            data: newMapList
        })
        setMapList(newMapList)
        history.back()
    }
    
    return (
        <SquareButton size="lg" variant="secondary" onClick={saveMap}>
            Save
        </SquareButton>
    )
}