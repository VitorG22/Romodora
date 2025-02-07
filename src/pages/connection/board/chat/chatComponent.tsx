import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "../../../../AppContext"
import { IPlayerData } from "../../../../interfaces"
import { ChevronDown, ChevronUp, Send, Sticker } from "lucide-react"


interface IChat {
    message: string,
    ownerData: IPlayerData,
    type: 'userMessage' | 'systemMessage'
}


export function LeftChat() {
    const { socket, partyData } = useContext(AppContext)
    const chatInputRef = useRef<HTMLInputElement | null>(null)
    const chatTextBoxRef = useRef<HTMLDivElement | null>(null)
    const [chatData, setChatData] = useState<IChat[]>([])
    const [ischatOpen, setIschatOpen] = useState<boolean>(true)

    socket?.off(`chatMessage_${partyData?.partyCode}`)
    socket?.on(`chatMessage_${partyData?.partyCode}`, body => {

        let newChatData = [...chatData]
        // switch (body.type) {
        //     case 'systemMessage':
        //         newChatData.push({
        //             message: body.message,
        //             type: "systemMessage",
        //             ownerData: undefined
        //         })
        //         break

        //     case 'userMessage':
        //         newChatData.push({
        //             message: body.message,
        //             type: 'userMessage',
        //             ownerData: partyData?.players.find(playerData => playerData.id == body.ownerId)
        //         })
        //         break
        // }

        let ownerData = partyData?.players.find(playerData => playerData.id == body.ownerId)
        if(!ownerData)return
        newChatData.push({
            message: body.message,
            type: body.type,
            ownerData: ownerData 
        })
        setChatData(newChatData)
    })
    useEffect(() => {
        chatTextBoxRef?.current?.scrollTo({ top: chatTextBoxRef?.current.scrollHeight })
    }, [chatData, ischatOpen])



    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!chatInputRef.current) return
        let message = chatInputRef.current.value.trim()

        if (message == '') return
        socket?.emit('chatMessage', {
            partyCode: partyData?.partyCode,
            message: message
        })

        chatInputRef.current.value = ''
    }

    return (
        <section
            className='max-h-full self-end z-40 bg-romo-950/80 m-2 flex flex-col gap-2 justify-end border border-lagun-500 p-2 rounded-md row-start-4 row-end-6 col-start-1 col-end-4 overflow-hidden'>
            <div ref={chatTextBoxRef}
                style={{ height: ischatOpen ? ('100%') : ('21px') }}
                className="flex flex-row h-full w-full overflow-scroll hiddenScroll relative">

                <ul className='flex flex-col h-full w-full  justify-end'>
                    {chatData.map(messagedata =>
                        messagedata.type == "systemMessage" ? (
                            <li className="flex justify-center italic text-sm py-[2px]"
                                style={{ color: messagedata.ownerData.color , backgroundColor: messagedata.ownerData.color + 30 }}
                            >
                                {messagedata.message}
                            </li>
                        ) : (
                            <li className='flex flex-row gap-2 items-center'>
                                <h1 className='text-romo-100 italic text-sm'
                                    style={{ color: messagedata.ownerData?.color }}
                                >{messagedata.ownerData?.name} ({messagedata.ownerData?.characterData?.name || 'Dungeon Master'}) :
                                    <span className='text-romo-100 not-italic'> {messagedata.message}</span>
                                </h1>
                            </li>
                        )
                    )
                    }
                </ul >
                <button onClick={() => setIschatOpen(!ischatOpen)}
                    className="text-lagun-200 p-[3px] hover:bg-lagun-200/20 sticky top-0 right-0 w-fit h-fit rounded-sm "
                >
                    {ischatOpen ? (<ChevronDown size={15} strokeWidth={1} />) : (<ChevronUp size={15} strokeWidth={1} />)}
                </button>
            </div>
            <form onSubmit={(e) => handleSendMessage(e)} className='flex flex-row h-8 items-center w-full gap-2'>
                <input ref={chatInputRef} type="text"
                    className="w-full h-full p-2 bg-transparent border border-lagun-500 rounded-md"
                />
                <button type="submit" className='aspect-square flex justify-center items-center h-full bg-lagun-500 rounded-md text-lagun-950'>
                    <Send size={15} strokeWidth={1} />
                </button>
            </form>
        </section >
    )
}