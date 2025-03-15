import React, { useContext, useEffect, useState } from "react"
import { BlocksList, IBlock } from "../../BlocksList"
import { BrickWall, DoorOpen, Ghost, Grid2X2, ScanIcon } from "lucide-react";
import SquareButton from "../../../../components/buttons";
import { saveMapsInLocalStorage } from "../../../../scripts/localStorage/localStorage";
import { MapsContext } from "../..";
import { useParams } from "react-router-dom";
import { IMapMatrix } from "../../../../interfaces";
import DynamicBlockImage from "./DynamicBlockImage";

interface ILateralTileMenu {
    selectedTile: { tileId: string, variant: number }
    setSelectedTileId: React.Dispatch<React.SetStateAction<{
        tileId: string;
        variant: number;
        statusCount: number
    }>>
    mapMatrix: IMapMatrix | null
    mapSize: {
        X: number,
        Y: number
    }
}

export default function LateralTileMenu({ selectedTile, setSelectedTileId, mapMatrix, mapSize }: ILateralTileMenu) {
    const [selectedBlockId, setSelectedBlockId] = useState<string>('')
    const [selectedBlockData, setSelectedBlockData] = useState<IBlock | undefined>(undefined)
    const [blocksListToRender, setBlocksListToRender] = useState<IBlock[]>(BlocksList)

    useEffect(() => {
        const Block = BlocksList.find(element => element.id == selectedBlockId)
        if (!Block) return
        setSelectedBlockData(Block)
        setSelectedTileId({
            tileId: selectedBlockId,
            variant: 0,
            statusCount: Block.statusCount
        })
    }, [selectedBlockId])

    const setVariant = (variantIndex: number) => {
        if (!selectedBlockData) { return }
        setSelectedTileId({
            tileId: selectedBlockId,
            variant: variantIndex,
            statusCount: selectedBlockData.statusCount
        })
    }

    return (
        <main className='flex flex-row h-screen z-10'>
            {selectedBlockData &&
                <section>
                    <ul className='flex flex-col gap-2 p-4 bg-romo-950 border-l border-romo-400  h-full overflow-y-scroll'>
                        {selectedBlockData.variant.map((variantData, variantIndex) => <li key={`Block_${variantData.name}_${variantIndex}`}>
                            {variantIndex == selectedTile.variant ? (
                                selectedBlockData.isDynamicTile ?
                                    <DynamicBlockImage img={variantData.path[0]} className='w-16 aspect-square border border-romo-200' />
                                    :
                                    <img src={variantData.path[0]} className='w-16 aspect-square border border-lagun-500 rounded-md'
                                    />
                            ) : (
                                selectedBlockData.isDynamicTile ?
                                    <DynamicBlockImage img={variantData.path[0]} className='w-16 aspect-square border border-romo-200' />
                                    :
                                    <img src={variantData.path[0]} className='w-16 aspect-square border border-transparent hover:border-lagun-500 rounded-md'
                                        onClick={() => setVariant(variantIndex)}
                                    />
                            )
                            }
                        </li>)}
                    </ul>
                </section>
            }
            <section className='text-white w-72 bg-romo-500 p-2 h-full flex flex-col justify-between gap-2'>
                <Filter setBlocksListToRender={setBlocksListToRender} />
                <ul className='max-h-full h-full py-2 flex flex-row justify-center items-start gap-2 flex-wrap w-full overflow-y-scroll'>
                    {blocksListToRender.map((BlockData) => <li key={`Block_${BlockData.id}`} className='w-20 h-20'>
                        {BlockData.id == selectedBlockId ? (
                            BlockData.isDynamicTile ?
                                <DynamicBlockImage img={BlockData.variant[0].path[0]} className='w-20 aspect-square border border-romo-200' />
                                :
                                <img src={BlockData.variant[0].path[0]}
                                    className='w-20 aspect-square border border-romo-200'
                                />
                        ) : (
                            BlockData.isDynamicTile ?
                                <DynamicBlockImage img={BlockData.variant[0].path[0]} onClick={() => setSelectedBlockId(BlockData.id)} className='w-20 aspect-square border border-transparent hover:border-romo-200' />
                                :
                                <img src={BlockData.variant[0].path[0]} onClick={() => setSelectedBlockId(BlockData.id)}
                                    className='w-20 aspect-square border border-transparent hover:border-romo-200'
                                />)
                        }
                    </li>)}
                </ul>
                <div className='flex flex-row gap-2 justify-end'>
                    <SquareButton size="lg" variant="ghost" onClick={() => history.back()}>
                        Cancel
                    </SquareButton>
                    <SaveMapButton mapMatrix={mapMatrix} mapSize={mapSize} />

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
            <FilterButton isSelectedFilter={selectedFilter == 'border'} onClick={() => setSelectedFilter('border')}><ScanIcon size={15} strokeWidth={1} />Border</FilterButton>
            <FilterButton isSelectedFilter={selectedFilter == 'floor'} onClick={() => setSelectedFilter('floor')}><Grid2X2 size={15} strokeWidth={1} />Floor</FilterButton>
            <FilterButton isSelectedFilter={selectedFilter == 'wall'} onClick={() => setSelectedFilter('wall')}><BrickWall size={15} strokeWidth={1} />Wall</FilterButton>
            <FilterButton isSelectedFilter={selectedFilter == 'door'} onClick={() => setSelectedFilter('door')}><DoorOpen size={15} strokeWidth={1} />Door</FilterButton>
            <FilterButton isSelectedFilter={selectedFilter == 'mob'} onClick={() => setSelectedFilter('mob')}><Ghost size={15} strokeWidth={1} />Mob</FilterButton>
        </ul>
    )
}

interface IFilterButton extends React.ComponentProps<'li'> {
    isSelectedFilter: Boolean
}
function FilterButton(props: IFilterButton) {
    return (
        props.isSelectedFilter ? (
            <li {...props} className='flex flex-row gap-2 justify-center items-center text-romo-500 px-3 py-1 bg-romo-100' >
                {props.children}
            </li >
        ) : (
            <li {...props} className='flex flex-row gap-2 justify-center items-center text-romo-100 px-3 py-1 hover:bg-romo-950' >
                {props.children}
            </li >
        )
    )
}

function SaveMapButton({ mapMatrix, mapSize }: { mapMatrix: IMapMatrix | null, mapSize: { X: number, Y: number } }) {
    const { mapId } = useParams()
    const { mapList, setMapList } = useContext(MapsContext)

    const saveMap = () => {
        if (!mapMatrix) return
        let mapIndex = mapList.findIndex(mapData => mapData.id == mapId)
        let newMapList = [...mapList]
        if (mapIndex == -1 || !setMapList) return



        newMapList[mapIndex] = {
            ...newMapList[mapIndex],
            mapMatrix: mapMatrix,
            sizeX: mapSize.X,
            sizeY: mapSize.Y
        }

        saveMapsInLocalStorage({
            data: newMapList
        })
        setMapList(newMapList)
        history.back()
    }

    return (
        <SquareButton disabled={!mapMatrix} size="lg" variant="secondary" onClick={saveMap}>
            Save
        </SquareButton>
    )
}