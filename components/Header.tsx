import { NextPage } from 'next'

const Header: NextPage = () => {
    return (
        <header className="w-full h-40 flex flex-col justify-center items-center">
            <div className="w-full h-24">
                <h1 className="text-slate-700 text-8xl text-center">InQuill</h1>
            </div>
        </header>
    )
}

export default Header