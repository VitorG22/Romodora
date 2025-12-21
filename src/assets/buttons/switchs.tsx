import { Check } from "lucide-react"
import { useEffect, useState } from "react"

interface ISwitch extends React.ComponentPropsWithoutRef<'input'> {
    name: string
    id: string
    label: string
    onChangeFunction?: (value:boolean)=>void
}

export function Primary(props: ISwitch) {
    const [currentCheckBoxValue, setCurrentCheckBoxValue] = useState<boolean>(false)

    return (
        <div {...props} className='flex flex-row item-center justify-between' onClick={()=> setCurrentCheckBoxValue(value => !value)}>
            <label htmlFor={props.id}>{props.label}</label>
            <div className='relative group'>
                <input checked={currentCheckBoxValue} value={currentCheckBoxValue.toString()} name={props.name} id={props.id} type="checkbox"
                    className='w-0 h-0 absolute top-0 left-0 opacity-0 z-10'
                />
                <div className='flex flex-row items-center justify-center w-14 p-[2px] rounded-full ring ring-transparent group-has-checked:ring-stone-900 bg-stone-900 group-has-checked:bg-stone-300 duration-300 ease-in '>
                    <div className='h-5.5 w-5.5 rounded-full bg-stone-200 duration-300
                    group-has-checked:translate-x-3.5 group-has-not-checked:-translate-x-3.5 group-has-checked:bg-stone-900'/>
                </div>
            </div>
        </div>
    )
}

export function Secondary(props: ISwitch) {
    const [currentCheckBoxValue, setCurrentCheckBoxValue] = useState<boolean>(!!props.defaultChecked!)
    
    useEffect(()=>{
        props.onChangeFunction?.(currentCheckBoxValue)
    },[currentCheckBoxValue])
    
    return (
        <div {...props} className='h-fit w-full flex flex-row item-center justify-between' onClick={()=> setCurrentCheckBoxValue(value => !value)}>
            <label htmlFor={props.id}>{props.label}</label>
            <div className='relative group flex flex-row items-center'>
                {
                    props.onChangeFunction != undefined ? (
                        <input checked={currentCheckBoxValue} type="checkbox"
                            className='w-0 h-0 absolute top-0 left-0 opacity-0 z-10'
                        />
                    ):(
                        <input checked={currentCheckBoxValue} value={currentCheckBoxValue.toString()} name={props.name} id={props.id} type="checkbox"
                            className='w-0 h-0 absolute top-0 left-0 opacity-0 z-10'
                        />
                    )
                }
                <div className='flex flex-row items-center justify-center size-5  p-[2px] ring ring-stone-900 group-has-checked:ring-purple-500 group-has-checked:bg-purple-500 duration-300 ease-in '>
                    {currentCheckBoxValue && <Check  className='text-white h-full w-full'/>}
                </div>
            </div>
        </div>
    )
}