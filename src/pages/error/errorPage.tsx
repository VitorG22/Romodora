export default function ErrorPage(){
    const ErrorList = [
        'Dungeon Not Found!',
        "It's better not to go alone",
        "Something moved forward in the dark",
        "Was there supposed to be a dungeon here?",
        "Are you lost traveler?",
        "Silence, don't wake the dragon",
        "This place is cold and dark"
    ]

    let randomErrorNumber = Math.floor(Math.random() * (ErrorList.length)) 
    
    return(
        <section className='flex flex-col gap-1 h-screen w-screen justify-center items-center'>
            <h1 className='text-5xl font-semibold text-romo-200'>404</h1>
            <h1 className='text-xs font-thin italic text-romo-200/50'>Page Not Found</h1>
            <p className='text-3xl text-romo-200'>{ErrorList[randomErrorNumber]}</p>
        </section>
    )
} 