import './StyleLoader.css'


export default function Loader() {
    return (
        <section className='w-screen h-screen flex justify-center items-center'>
            <div className="flex justify-center item-center h-12 w-12 rounded-full p-[1px] animate-pulse  bg-romo-100">
                <div className='w-full h-full bg-romo-500 rounded-full' />
            </div>
        </section>
    )
}

export function TransparentLoader() {
    return (
            // From Uiverse.io by satyamchaudharydev 
        <section className='absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-romo-200/10 backdrop-blur-[2px] z-50'>
            <div className="spinner">
                <svg viewBox="25 25 50 50" className="circular">
                    <circle stroke-miterlimit="10" stroke-width="1" fill="none" r="20" cy="50" cx="50" className="path"></circle>
                </svg>
            </div>
        </section>
    )
}