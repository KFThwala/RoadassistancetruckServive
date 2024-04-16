

import Link from "next/link"


function Header() {
    
    return (
        <nav className="flex justify-end items-center h-14 bg-black text-white">
            <Link className="ml-8 active:text-red-400 focus:text-red-400" href="/">Home</Link>
            <Link className="ml-8 active:text-red-400 focus:text-red-400" href="/request">Request</Link>
            <Link className="mx-8 active:text-red-400 focus:text-red-400" href="/login">Login</Link>
        </nav>  
    )
}

export default Header
