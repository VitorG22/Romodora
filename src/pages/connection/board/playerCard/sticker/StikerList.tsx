import { Sticker, X } from "lucide-react"
import { useContext, useState } from "react"
import { AppContext } from "../../../../../AppContext"
import { BoardContext } from "../../boardContext"

export function StickerList() {
    const [isStickerContainerOpen, setIsStickerContainerOpen] = useState<boolean>(false)
    const {socket, partyData, mainUser} = useContext(AppContext)
    const {stickersList} = useContext(BoardContext)

    const sendSticker = (url:string) =>{
        setIsStickerContainerOpen(false)
        socket?.emit('sendSticker', {
            partyCode: partyData?.partyCode,
            data:{
                playerId:mainUser.id,
                stickerUrl: url
            }
        })
    }
    


    return (
        <main className='h-full self-start flex flex-row-reverse items-start pt-1'>
            {!isStickerContainerOpen &&
                <button onClick={(e) => {e.stopPropagation();setIsStickerContainerOpen(true)}} className='self-start'>
                    <Sticker size={15} strokeWidth={1} />
                </button>
            }
            {isStickerContainerOpen &&
                <section className="absolute flex flex-row-reverse gap-2 p-2 border border-romo-400 backdrop-blur-[3px] rounded-sm bg-romo-500/90">
                    <button onClick={(e) => {e.stopPropagation();setIsStickerContainerOpen(false)}} className='self-start'>
                        <X size={15} strokeWidth={1} />
                    </button>
                    <ul className='flex flex-row justify-end gap-1 w-96  flex-wrap'>
                        {stickersList.map((url) =>
                            <li onClick={(e)=>{e.stopPropagation(); sendSticker(url)}} 
                            className='hover:cursor-pointer h-14 aspect-square object-cover overflow-hidden'>
                                <img src={url} />
                            </li>
                        )}
                    </ul>
                </section>
            }

        </main>
    )
}
