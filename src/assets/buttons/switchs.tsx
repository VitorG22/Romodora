import { useState } from "react"

interface ISwitch extends React.ComponentPropsWithoutRef<'input'> {
    name: string
    id: string
    label: string
}

export function Primary(props: ISwitch) {

    return (
        <div {...props} className='flex flex-row item-center justify-between'>
            <label htmlFor={props.id}>{props.label}</label>
            <div className='relative group'>
                <input name={props.name} id={props.id} type="checkbox" 
                className='w-full h-full absolute top-0 left-0 opacity-0 z-10'
                />
                <div className='flex flex-row items-center justify-center w-14 p-[2px] rounded-full ring ring-transparent group-has-checked:ring-stone-900 bg-stone-900 group-has-checked:bg-stone-300 duration-300 ease-in '>
                    <div  className='h-5.5 w-5.5 rounded-full bg-stone-200 duration-300
                    group-has-checked:translate-x-3.5 group-has-not-checked:-translate-x-3.5 group-has-checked:bg-stone-900'/>
                </div>
            </div>
        </div>
    )
}