import { X } from "lucide-react";
import { ReactNode } from "react";


export function Container(
    { title, children, setIsModalOpen }:
        {
            title?: string
            children?: ReactNode,
            setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
        }) {

    return (
        <main
            className="fixed flex justify-center items-center top-0 left-0 h-screen w-screen z-50">
            <div
                onClick={() => (setIsModalOpen(false))}
                className="absolute top-0 left-0 h-screen w-screen bg-black/20 backdrop-blur-[1px]"
            />
            <section className="flex flex-col  p-4 z-20 rounded-sm bg-romo-950">
                <div className='flex flex-row gap-8 justify-between items-center text-romo-600'>
                    <h1 className='font-semibold text-romo-100'>
                        {title}
                    </h1>
                    <Close setIsModalOpen={setIsModalOpen} />
                </div>

                {children}
            </section>
        </main>
    )
}

function Close({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

    return (
        <button
            onClick={() => setIsModalOpen(false)}
            className="place-self-end text-romo-100  p-1 rounded-sm flex hover:bg-lagun-200/40"
        >
            <X size={15} strokeWidth={1} />
        </button>

    )
}