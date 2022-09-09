import { NextPage } from 'next'

const Header: NextPage = () => {
    return (
        <header className="w-full h-40 bg-gray-500 flex flex-col justify-center items-center">
            <div className="w-full h-24 bg-red-400">LOGO</div>
        </header>
    )
}

export default Header