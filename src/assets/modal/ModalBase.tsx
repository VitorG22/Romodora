import { X } from "lucide-react"

interface IModal extends React.ComponentPropsWithoutRef<'main'> {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    modalTitle?: string
}

export default function ModalBase(props: IModal) {
    return (
        <main className="flex items-center justify-center w-full h-full absolute top-0 left-0 ">
            <div className="z-20 absolute top-0 left-0 h-full w-full bg-stone-900/40 backdrop-blur-[2px]" onClick={() => props.setIsModalOpen(false)} />
            <section className='flex flex-col z-30 bg-stone-300 rounded-sm p-3'>
                <article className='flex flex-row justify-between items-center w-full '>
                    <h4 className='league-spartan text-md '>{props.modalTitle}</h4>
                    <X strokeWidth={1} className='rounded-sm  self-end h-8 w-8 p-1 hover:bg-purple-500 hover:text-stone-300 hover:cursor-pointer' onClick={()=> props.setIsModalOpen(false)}/>
                </article>
                <hr className="w-full border-t my-1"/>
                <div>{props.children}</div>
            </section>
        </main>
    )
}