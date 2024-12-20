import { toast } from "react-toastify";

export function Secondary({message}:{message:string} ){
    return toast(message,{
        className:'bg-transparent text-lagun-300 backdrop-blur-2xl border border-lagun-300 ',
        progressClassName:'bg-lagun-300'
    })
}

export function Error({message}:{message:string} ){
    return toast(message,{
        className:'bg-transparent text-red-600 backdrop-blur-2xl border border-red-600',
        progressClassName:'bg-red-600',
    })
}

export function Default({message}:{message:string} ){
    return toast(message,{
        className:'bg-transparent text-lagun-500 backdrop-blur-2xl border border-lagun-500',
        progressClassName:'bg-lagun-500',
    })
}

export function Alert({message}:{message:string} ){
    return toast(message,{
        className:'bg-transparent text-amber-500 backdrop-blur-2xl border border-amber-500',
        progressClassName:'bg-amber-500',
    })
}