import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Presentation() {
    let navigate = useNavigate()

    return (
        <main className="flex flex-col items-center w-screen min-h-screen bg-stone-300 gap-12">
            <nav className='flex flex-row w-full bg-stone-900 items-center gap-2 p-1 text-stone-400 fixed top-0 z-30'>
                <img src="/Rub_Icon.png" className="aspect-square w-12 " />
                <div className='absolute right-2 flex flex-row gap-2 max-w-1/5 w-full'>
                    <button onClick={() => navigate("/register")} className='rounded-sm ring ring-stone-300 text-stone-300 h-full w-full py-1'>Register</button>
                    <button onClick={() => navigate("/login")} className='rounded-sm bg-stone-300 text-stone-900 h-full w-full py-1'>Login</button>
                </div>
            </nav>
            <section className="flex flex-col items-center relative w-full aspect-[8.5/3.5] overflow-hidden mt-12">
                <article className='flex flex-col justify-center items-end z-10 h-full self-end-safe mr-24'>
                    <h1 className='league-spartan text-end text-stone-300 font-bold text-6xl'>START <br/>YOUR <br/> ADVENTURE</h1>
                    <p className='league-spartan text-2xl text-end font-thin text-stone-300'>Enter the world of fantasy with Romodora.</p>
                    <button onClick={() => navigate("/login")} className='rounded-sm bg-stone-300 text-stone-900 h-fit mt-4 w-fit py-2 px-6 hover:cursor-pointer hover:bg-purple-500 hover:text-stone-300'>Get started for free</button>
                </article>
                <ChevronDown strokeWidth={1} className="animate-bounce z-20 h-18 w-10 text-stone-300 "/>
                <img src="/rpg_banner_01.jpg" className='w-full object-cover absolute top-0 left-0' />
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-black to-transparent" />
            </section>
            <section className="flex flex-row justify-between items-center aspect-[7/3] w-3/4">
                <article className='flex flex-col gap-2'>
                    <h2 className="font-bold text-6xl">PLAY<br /> WITH<br /> YOUR<br /><span className='text-purple-500'>FRIENDS</span></h2>
                    <p className="font-thin">Participate in online <span className='text-purple-500 font-bold'>RPG</span> sessions and play with your<br /> friends from <span className='text-purple-500 font-bold'>anywhere</span> in the world.</p>
                </article>
                <div className="aspect-square w-1/2 flex justify-end shadow-xl/70 shadow-stone-900">
                    <img src="/rpg_group.jpg" className="min-w-full min-h-full rounded-sm" />
                </div>
            </section>
            <section className="flex flex-col item-center aspect-7/4 w-3/4 gap-8">
                <h2 className=" text-center font-bold text-6xl"><span className='text-purple-500'>JOIN</span> THE<br />COMMUNITY</h2>
                <div className="aspect-[9/3] flex justify-end w-full overflow-hidden shadow-xl/70 shadow-stone-900">
                    <img src="/community_01.jpg" className="min-w-full min-h-full object-cover rounded-sm" />
                </div>
                <p className='text-center font-thin'>Explore the <span className='text-purple-500 font-bold'>community</span> and discover creations<br /> by other <span className='text-purple-500 font-bold'>travelers</span>.</p>
            </section>
            <section className="flex flex-row justify-between items-center aspect-[7/3] w-3/4 ">
                <div className="aspect-square w-1/2 flex justify-end  shadow-xl/70 shadow-stone-900 "> 
                    <img src="/map_02.jpg" className="min-w-full min-h-full rounded-sm object-cover" />
                </div>
                <article className='flex flex-col gap-2'>
                    <h2 className="font-bold text-6xl text-end">IMAGINE<br /> AND <span className='text-purple-500'>CREATE</span></h2>
                    
                    <p className="font-thin text-end">Romodora offers a variety of creation <br/> options, from <span className='text-purple-500 font-bold'>maps</span> to <span className='text-purple-500 font-bold'>items</span> and <br/><span className='text-purple-500 font-bold'>characters</span>.
</p>
                </article>
                
            </section>
            <footer className='flex flex-row w-full h-fit justify-between bg-stone-900 py-2 px-4 text-stone-300 mt-12'>
                <h4>Romodora</h4>
                <h4>By Vitor Lima</h4>
            </footer>
        </main>
    )
}