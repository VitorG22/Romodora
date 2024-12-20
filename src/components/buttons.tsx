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
                        className={props.unable?(
                            'w-fit flex flex-row gap-2 justify-center items-center bg-lagun-900 px-2 py-2 text-lagun-200 h-fit rounded-md opacity-35'):
                            ('w-fit flex flex-row gap-2 justify-center items-center bg-lagun-900 px-2 py-2 text-lagun-200 h-fit rounded-md hover:brightness-125')}
                        disabled={props.unable}>
                            {props.children}
                        </button>
                        )
                case "md":
                    return (
                        <button {...props} 
                        className={props.unable?(
                            'w-fit flex flex-row gap-2 justify-center items-center bg-lagun-900 px-4 py-2 text-lagun-200 h-fit rounded-md opacity-35'):
                            ('w-fit flex flex-row gap-2 justify-center items-center bg-lagun-900 px-4 py-2 text-lagun-200 h-fit rounded-md hover:brightness-125')}
                        disabled={props.unable}>
                            {props.children}
                        </button>
                        )
                case "lg":
                    return (
                        <button {...props} 
                        className={props.unable?(
                            'w-fit flex flex-row gap-2 justify-center items-center bg-lagun-900 px-8 py-3 text-lagun-200 h-fit rounded-md opacity-35'):
                            ('w-fit flex flex-row gap-2 justify-center items-center bg-lagun-900 px-8 py-3 text-lagun-200 h-fit rounded-md hover:brightness-125')}
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
                        className={props.unable?(
                            'w-fit flex flex-row gap-2 justify-center items-center px-2 py-2 text-lagun-500 border border-lagun-500 h-fit rounded-md opacity-35'):
                            ('w-fit flex flex-row gap-2 justify-center items-center px-2 py-2 text-lagun-500 border border-lagun-500 h-fit rounded-md hover:brightness-125')}
                        disabled={props.unable}>
                            {props.children}
                        </button>
                    )
                case "md":
                    return (
                        <button {...props} 
                        className={props.unable?(
                            'w-fit flex flex-row gap-2 justify-center items-center px-4 py-2 text-lagun-500 border border-lagun-500 h-fit rounded-md opacity-35'):
                            ('w-fit flex flex-row gap-2 justify-center items-center px-4 py-2 text-lagun-500 border border-lagun-500 h-fit rounded-md hover:brightness-125')}
                        disabled={props.unable}>
                            {props.children}
                        </button>
                    )
                case "lg":
                    return (
                        <button {...props} 
                        className={props.unable?(
                            'w-fit flex flex-row gap-2 justify-center items-center px-8 py-3 text-lagun-500 border border-lagun-500 h-fit rounded-md opacity-35'):
                            ('w-fit flex flex-row gap-2 justify-center items-center px-8 py-3 text-lagun-500 border border-lagun-500 h-fit rounded-md hover:brightness-125')}
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
                className={props.unable?(
                    'w-fit flex flex-row gap-2 justify-center items-center bg-lagun-500 px-2 py-2 text-lagun-950 h-fit rounded-md opacity-35'):
                    ('w-fit flex flex-row gap-2 justify-center items-center bg-lagun-500 px-2 py-2 text-lagun-950 h-fit rounded-md hover:brightness-125')}
                disabled={props.unable}>
                    {props.children}
                </button>
            )
                case "md":
                    return (
                <button {...props} 
                className={props.unable?(
                    'w-fit flex flex-row gap-2 justify-center items-center bg-lagun-500 px-4 py-2 text-lagun-950 h-fit rounded-md opacity-35'):
                    ('w-fit flex flex-row gap-2 justify-center items-center bg-lagun-500 px-4 py-2 text-lagun-950 h-fit rounded-md hover:brightness-125')}
                disabled={props.unable}>
                    {props.children}
                </button>
            )
                case "lg":
                    return (
                <button {...props} 
                className={props.unable?(
                    'w-fit flex flex-row gap-2 justify-center items-center bg-lagun-500 px-8 py-3 text-lagun-950 h-fit rounded-md opacity-35'):
                    ('w-fit flex flex-row gap-2 justify-center items-center bg-lagun-500 px-8 py-3 text-lagun-950 h-fit rounded-md hover:brightness-125')}
                disabled={props.unable}>
                    {props.children}
                </button>
            )
            }
    }

}
