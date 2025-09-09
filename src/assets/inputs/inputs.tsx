import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Eye, EyeClosed } from "lucide-react"
import React, { useState } from "react"

interface IContainer extends React.ComponentPropsWithoutRef<'div'> {
    color: "white" | "black"
}

interface ITextInput extends React.ComponentPropsWithoutRef<'input'> {
    id: string,
    type: "text" | "email"
    name: string
}
interface INumberInput extends React.ComponentPropsWithoutRef<'input'> {
    id: string,
    name: string
    currentValue: number
    setValueFunction: (value:number)=>void
    min?: number
    max?: number
}


export function Container(props: IContainer) {
    return (
        <div {...props}
            className={`flex flex-col justify-start w-full
        ${props.color == "white" ? ("text-stone-300") : ("text-stone-900")}
        ${props.className}
        `}>
            {props.children}
        </div>
    )
}

export function TextInput(props: ITextInput) {
    return (
        <input {...props} name={props.name} type={props.type} id={props.id}
            className="w-full ring ring-current rounded-sm py-2 px-2 outline-0"
        />
    )
}

export function PasswordInput({ id, name, className, required }: { id: string, name: string, className?: string, required?: boolean }) {
    const [isToShowPassword, setIsToShowPassword] = useState<boolean>(false)

    return (
        <div className='flex flex-row w-full border border-current rounded-sm px-2'>
            <input name={name} type={isToShowPassword ? "text" : "password"} id={id} required={required == undefined ? (true) : (required)}
                className={`w-full py-2 outline-0 ${className}`}
            />
            <button onClick={() => setIsToShowPassword(!isToShowPassword)} type="button" className="hover:cursor-pointer">
                {isToShowPassword ?
                    <Eye strokeWidth={1} /> :
                    <EyeClosed strokeWidth={1} />
                }
            </button>
        </div>
    )
}

export function Label({ inputId, children, className }: { inputId: string, children: React.ReactNode, className?: string }) {
    return (
        <label
            htmlFor={inputId}
            className={`text-current ${className}`}>
            {children}
        </label>
    )
}

export function Image({ children, setImageFunction }: { children: React.ReactNode, setImageFunction: React.Dispatch<React.SetStateAction<string>>| ((value:string)=>void) }) {

    const convertImage = async (file: FileList | null) => {
        if (!file) return
        try {
            var reader = new FileReader()
            reader.onload = function (e) {
                if (e.target?.result) {
                    setImageFunction?.(e.target.result as string)
                }
            }
            reader.readAsDataURL(file[0])
        } catch (error) {
            console.log(error)
        }

    }

    return (

        <section className='text-white relative'>
            {children}
            <input className='absolute top-0 left-0 w-full h-full opacity-0 hover:cursor-pointer' type='file' multiple={false} accept="image/*" onChange={(e) => convertImage(e.currentTarget.files)} />
        </section>
    )
}

export function DropMenu({ valuesList, value, inputId, setInputValueFunction }: { valuesList: string[], value: string, inputId: string, name: string, setInputValueFunction: React.Dispatch<React.SetStateAction<string>> | ((value:string)=>void) }) {
    const [isDropMenuOpen, setIsDropMenuOpen] = useState<boolean>(false)

    return (
        <div className="relative flex flex-row items-center">
            <div onClick={() => setIsDropMenuOpen(!isDropMenuOpen)} id={inputId} className=" w-full h-10.5 border border-current rounded-sm py-2 px-2 outline-0" >{value}</div>
            {isDropMenuOpen ? <ChevronUp className='absolute right-2' strokeWidth={1} onClick={() => setIsDropMenuOpen(!isDropMenuOpen)} /> : <ChevronDown className='absolute right-2' strokeWidth={1} onClick={() => setIsDropMenuOpen(!isDropMenuOpen)} />}
            {isDropMenuOpen && <ul className="border bg-stone-300 w-full absolute top-[94%] left-0  gap-1 z-20 max-h-60 overflow-scroll">
                {valuesList.map(optionValue =>
                    <li onClick={() => { setIsDropMenuOpen(false); setInputValueFunction(optionValue) }} className="hover:bg-stone-400/20 p-.5 pl-2 hover:cursor-pointer">
                        {optionValue}
                    </li>
                )
                }
            </ul>}
        </div>
    )
}

export function Number(props: INumberInput) {

    const currentValueMinus = () => {
        if (props.min == props.currentValue) { return }
        props.setValueFunction?.(props.currentValue -1)
    }
    const currentValuePlus = () => {
        if (props.max == props.currentValue ) { return }
        props.setValueFunction?.(props.currentValue + 1)
    }


    return (
        
        <div className='flex flex-row gap-2 justify-between items-center w-full border-b border-current rounded-sm py-2 px-2'>
            <p>{props.id}</p>
            <div className="flex flex-row items-center gap-1">
                <button type='button' className='hover:bg-current/20 rounded-sm duration-150' onClick={currentValueMinus}><ChevronLeft strokeWidth={1} size={15} /></button>
                <p>{props.currentValue}</p>
                <button type='button' className='hover:bg-current/20 rounded-sm duration-150' onClick={currentValuePlus}><ChevronRight strokeWidth={1} size={15} /></button>
            </div>
        </div>
    )
}