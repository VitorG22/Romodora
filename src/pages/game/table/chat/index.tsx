import { useContext, useEffect, useRef } from "react"
import { GameContext } from "../../../../scripts/socket"
import * as Input from '../../../../assets/inputs/inputs'
import * as Button from '../../../../assets/buttons/buttons'
import { Send } from "lucide-react"
import getFormValues from "../../../../assets/forms/getFormValues"
import type { IMessage } from "../../gameObject"




export function Chat() {
    const game = useContext(GameContext)
    const chatRef = useRef<HTMLUListElement>(null)

    useEffect(()=>{
        chatRef.current?.scrollTo({top: 100 * chatRef.current.scrollHeight})
    },[game?.chat])
    
    const sendMessage = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        let {chatMessage} = getFormValues(e)
        chatMessage = chatMessage.toString().trim()
        if(!chatMessage) return

        const [input] = e.currentTarget.getElementsByTagName('input')
        input.value = ''
        game?.socket?.emit('sendMessage',{gameId:game.lobbyId,message:chatMessage} )
    }

    return (
        <section className="flex flex-col gap-2 justify-end bg-stone-900 py-1 border-t border-r border-stone-400/40 col-start-1 col-end-3 row-start-4 row-end-6 z-20">
            <ul ref={chatRef} className="flex flex-col gap-1  h-full overflow-x-scroll">
                {game?.chat.map(messageData => <MessageComponent messageData={messageData} />)}
            </ul>
            <form onSubmit={(e)=>sendMessage(e)} className="flex flex-row gap-1 p-1 w-full">
                <Input.Container color="white">
                    <Input.TextInput id="ChatMessageInput" name="chatMessage" type="text"/>
                </Input.Container>
                <div className="w-fit">
                    <Button.Primary color="white" type="submit">
                        <Send strokeWidth={1} />
                    </Button.Primary>
                </div>
            </form>
        </section>
    )
}

function MessageComponent({ messageData }: { messageData: IMessage }) {
    const game = useContext(GameContext)
    let userCharacter = game?.tableControl.players.find(playerData=> playerData.id == messageData.ownerData.id)?.character || null
    let ownerColor  = game?.users.find(user=> user.id == messageData.ownerData.id)?.color || ''
    
    switch (messageData.type) {
        case "message":
            return (
                <li className='text-stone-300 px-1'>
                    <span style={{ color:ownerColor}}>{messageData.ownerData.name} {userCharacter != null && `(${userCharacter.name})`} </span> :
                    <span className="italic"> {messageData.message}</span>
                </li>
            )
        case "system":
            return (
                // <li style={{ background: `${messageData.ownerData.color}30` }} className='text-stone-300 flex w-full justify-center items-center text-center'>
                <li className='text-stone-300 flex w-full justify-center items-center text-center'>
                    {/* <span style={{ color: `${messageData.ownerData.color}` }}>{messageData.message} </span> */}
                    <span className='w-full' style={{ color:ownerColor, backgroundColor:ownerColor + '20'}}>{messageData.message} </span>
                </li>
            )
    }
}