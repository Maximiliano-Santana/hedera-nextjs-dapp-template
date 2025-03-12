import ConnectWalletButton from "./ConnectWalletButton"
import NavbarItem from "./NavBarItem"

export default function NavBar(){

    return <nav className='flex z-50 fixed w-screen bg-black text-white h-24 items-center justify-between px-1 md:px-24'>
            <div className='h-14'>
                <img className='h-full' src="/hedera.svg" alt="Hedera" />
            </div>
            <ul className='flex w-8/12 justify-end items-center gap-4'>
                <NavbarItem path="/">
                    Home
                </NavbarItem>
                <ConnectWalletButton/>
            </ul>
        </nav>

}