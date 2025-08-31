import type { ReactNode } from "react"

export function Loader() {
    return (
        <div
            className="w-10 h-10 border-2 border-t-stone-400 border-stone-950 rounded-full animate-spin"
        ></div>

    )
}

export function LoaderContainer({ children }: { children: ReactNode }) {
    return (
        <div className='flex absolute justify-center items-center top-0 left-0 h-full w-full bg-stone-950/80 z-50'>
            {children}
        </div>
    )
}