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
        <form {...props} className={`${props.className} p-4 flex gap-2`}>
            <input type="submit" hidden />
            {props.children}
        </form>
    )
}

export function Title({ children }: { children: ReactNode }) {
    return (
        <h1 className='flex justify-center text-romo-200 w-full'>{children}</h1>
    )
}

export function InputText(props: IinputText) {
    return (
        <div className="flex flex-col">
            <label
                htmlFor={props.label}
                className="text-romo-200 font-thin text-xs "
            >{props.label}</label>
            <input {...props} id={props.label}
                className='border-t border-transparent focus:border-romo-200 bg-romo-500 px-2 py-1 outline-none text-romo-200' />
        </div>

    )
}

export function InputSelect(props: ISelect) {
    return (
        <div className="group flex flex-col">
            <label
                htmlFor={props.label}
                className="text-romo-200 font-thin text-xs "
            >{props.label}</label>
            <select {...props}
                className='border-t border-transparent focus:border-romo-200 bg-romo-500 px-2 py-1 outline-none text-romo-200 disabled:opacity-35'>
                {props.children}
            </select>
        </div>
    )
}

export function SelectOption({name,OptionKey}:{name:string,OptionKey:string}){
    return(
        <option value={OptionKey}className=' appearance-none bg-romo-900 px-2 py-1 outline-none text-romo-600'>
            {name}
        </option>
    )
}