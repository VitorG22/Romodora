import React, { ReactNode } from "react";

interface Ibutton extends React.ComponentPropsWithoutRef<'button'> {
    variant: 'default' | 'secondary' | 'ghost'
    size: 'sm'| 'md'|'lg'
    children?: ReactNode
    unable?:boolean
}


export default function SquareButton(props: Ibutton) {

    switch (props.variant) {
        case "default":
            switch(props.size){
                case "sm":
                    return (
                        <button {...props} 
                        style={{opacity:`${props.unable?'35%': '100%'}`}}
                        className='w-fit flex flex-row gap-2 justify-center items-center bg-romo-500 px-2 py-2 text-romo-100 h-fit  hover:brightness-125'
                        disabled={props.unable}>
                            {props.children}
                        </button>
                        )
                case "md":
                    return (
                        <button {...props} 
                        style={{opacity:`${props.unable?'35%': '100%'}`}}
                        className='w-fit flex flex-row gap-2 justify-center items-center bg-romo-500 px-4 py-2 text-romo-100 h-fit  hover:brightness-125'
                        disabled={props.unable}>
                            {props.children}
                        </button>
                        )
                case "lg":
                    return (
                        <button {...props} 
                        style={{opacity:`${props.unable?'20%': '100%'}`}}
                        // className='w-fit flex flex-row gap-2 justify-center items-center bg-romo-500 px-8 py-3 text-romo-100 h-fit  hover:brightness-125'
                        className='w-fit flex flex-row gap-2 justify-center items-center bg-romo-500 px-8 py-3 text-romo-100 h-fit  hover:bg-gradient-to-br from-romo-500 via-romo-400 to-romo-500'
                        disabled={props.unable}>
                            {props.children}
                        </button>
                        )
            }
        case "ghost":
            switch(props.size){
                case "sm":
                    return (
                        <button {...props} 
                        style={{opacity:`${props.unable?'35%': '100%'}`}}
                        className='w-fit flex flex-row gap-2 justify-center items-center px-2 py-2 text-romo-100 border border-romo-100 h-fit  hover:brightness-125'
                        disabled={props.unable}>
                            {props.children}
                        </button>
                    )
                case "md":
                    return (
                        <button {...props} 
                        style={{opacity:`${props.unable?'35%': '100%'}`}}
                        className='w-fit flex flex-row gap-2 justify-center items-center px-4 py-2 text-romo-100 border border-romo-100 h-fit  hover:brightness-125'
                        disabled={props.unable}>
                            {props.children}
                        </button>
                    )
                case "lg":
                    return (
                        <button {...props} 
                        style={{opacity:`${props.unable?'35%': '100%'}`}}
                        className='w-fit flex flex-row gap-2 justify-center items-center px-8 py-3 text-romo-100 border border-romo-100 h-fit  hover:brightness-125'
                        disabled={props.unable}>
                            {props.children}
                        </button>
                    )
            }
            
        case "secondary":
            switch(props.size){
                case "sm":
                    return (
                <button {...props} 
                style={{opacity:`${props.unable?'35%': '100%'}`}}
                className='w-fit flex flex-row gap-2 justify-center items-center bg-romo-100 px-2 py-2 text-romo-500 h-fit  hover:brightness-125'
                disabled={props.unable}>
                    {props.children}
                </button>
            )
                case "md":
                    return (
                <button {...props} 
                style={{opacity:`${props.unable?'35%': '100%'}`}}
                className='w-fit flex flex-row gap-2 justify-center items-center bg-romo-100 px-4 py-2 text-romo-500 h-fit  hover:brightness-125'
                disabled={props.unable}>
                    {props.children}
                </button>
            )
                case "lg":
                    return (
                <button {...props} 
                style={{opacity:`${props.unable?'35%': '100%'}`}}
                className='w-fit flex flex-row gap-2 justify-center items-center bg-romo-100 px-8 py-3 text-romo-500 950 h-fit  hover:brightness-125'
                disabled={props.unable}>
                    {props.children}
                </button>
            )
            }
    }

}
