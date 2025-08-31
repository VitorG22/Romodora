import { Outlet } from "react-router-dom";
import NavBarTop from "../../assets/navBar/navBarTop";

export default function Characters() {
    return (
        <main className='flex flex-col justify-start w-screen h-screen'>
            <NavBarTop />
            <Outlet />
        </main>

    )
}