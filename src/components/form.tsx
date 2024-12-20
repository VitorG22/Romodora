import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { ReactNode, useState } from "react"

interface IForm extends React.ComponentPropsWithoutRef<'form'> {
    children?: ReactNode
}
interface IinputText extends React.ComponentPropsWithoutRef<'input'> {
    type: 'text' | 'email' | 'password'
    label: string
    placeholder?: string
}

interface ISelect extends React.ComponentPropsWithoutRef<'select'> {
    label: string
}

export function getFormData(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
    const formValues = Object.fromEntries(formData)
    return formValues
}

export function Container(props: IForm) {
    return (
        <form {...props} className={`${props.className} bg-lagun-900 p-4 flex flex-col gap-2`}>
            <input type="submit" hidden />
            {props.children}
        </form>
    )
}

export function Title({ children }: { children: ReactNode }) {
    return (
        <h1 className='flex justify-center text-lagun-500 w-full'>{children}</h1>
    )
}

export function InputText(props: IinputText) {
    return (
        <div className="flex flex-col">
            <label
                htmlFor={props.label}
                className="text-lagun-500 font-thin text-xs "
            >{props.label}</label>
            <input {...props} id={props.label}
                className='bg-transparent border border-lagun-600 px-2 py-1 rounded-sm outline-none text-lagun-600 
            focus:text-lagun-500 focus:border-lagun-500 placeholder:text-lagun-600' />
        </div>

    )
}

export function InputSelect(props: ISelect) {
    return (
        <div className=" group flex flex-col">
            <label
                htmlFor={props.label}
                className="text-lagun-500 font-thin text-xs "
            >{props.label}</label>
            <select {...props}
                className=' bg-transparent border border-lagun-600 px-2 py-1 rounded-sm outline-none text-lagun-600 
            focus:text-lagun-500 focus:border-lagun-500 placeholder:text-lagun-600  disabled:opacity-20'>
                {props.children}
            </select>
        </div>
    )
}

export function SelectOption({name,OptionKey}:{name:string,OptionKey:string}){
    return(
        <option value={OptionKey}
        className=' appearance-none bg-lagun-950 border border-lagun-600 px-2 py-1 outline-none text-lagun-600 
            hover:text-lagun-500 hover:border-lagun-500 hover:bg-lagun-950'
        >{name}
        </option>
    )
}