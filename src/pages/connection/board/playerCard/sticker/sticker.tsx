import "./index.css"

export default function Sticker({playerId}:{playerId:string}) {
    return (
        <aside id='stickerContainer' className='flex h-full absolute right-full top-0 aspect-square stickerContainer'>
            <div id={`stickerElement_UserId_${playerId}`} className="stickerElement aspect-square h-max  object-fill overflow-hidden"></div>
        </aside>
    )
}