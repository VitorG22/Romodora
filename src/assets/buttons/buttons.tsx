interface IButton extends React.ComponentPropsWithoutRef<"button"> {
    color: "white" | "black"
}

export function Primary(props: IButton) {
    return (
        <button {...props}
            className={`w-full h-fit py-2 px-4 font-semibold rounded-sm hover:cursor-pointer active:brightness-90
        ${props.className}
        ${props.color == "white" ? "bg-stone-300 text-stone-900" : "bg-stone-900 text-stone-300"}
        `}>
            {props.children}
        </button>
    )
}

export function Secondary(props: IButton) {
    return (
        <button {...props}
            className={`w-full h-fit py-2 px-4 font-semibold rounded-sm hover:cursor-pointer active:brightness-90 bg-transparent border
                ${props.color == "white" ? "border-stone-300 text-stone-300" : "border-stone-900 text-stone-900"}
                ${props.className}
        `}>
            {props.children}
        </button>
    )
}

export function BigSquareButton(props: IButton){
    return(
        <button {...props} 
        className='border border-stone-500 w-60 h-full flex flex-col justify-center items-center gap-4 relative overflow-hidden duration-150
            bg-linear-45 
            hover:from-purple-700 hover:via-purple-600/50 hover:to-purple-500/50 hover:border-purple-500 hover:text-white
            hover:-translate-x-1 hover:-translate-y-1 hover:cursor-pointer
            '
        >
            <div className="absolute left-0 bottom-0 blur-2xl">
            </div>
            {props.children}
        </button>
    )
}