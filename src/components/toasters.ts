import { toast } from "react-toastify";

export function Secondary({message}:{message:string} ){
    return toast(message,{
        className:'bg-romo-100 text-romo-500  border border-romo-500 ',
        progressClassName:'bg-romo-500'
    })
}

export function Error({message}:{message:string} ){
    return toast(message,{
        className:'bg-romo-950 text-red-600 border border-red-600',
        progressClassName:'bg-red-600',
    })
}

export function Default({message}:{message:string} ){
    return toast(message,{
        className:'bg-romo-950 text-romo-100 border border-romo-400',
        progressClassName:'bg-romo-100',
    })
}

export function Alert({message}:{message:string} ){
    return toast(message,{
        className:'bg-romo-950 text-amber-500 border border-amber-500',
        progressClassName:'bg-amber-500',
    })
}