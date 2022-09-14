import { NextPage } from 'next'
import Link from 'next/link'

const Footer: NextPage = () => {
    return (
        <footer className="w-full h-10 bg-slate-800 flex justify-center">
            <div className="w-full max-w-screen-sm text-white px-2 justify-between items-center flex">
                <span className="text-sm">Built with ❤️ by 
                    <a className="ml-1" href="https://github.com/Technopathic/InQuill">Technopathic</a>
                </span>
                <span className="text-sm">
                    <Link href="/tos" passHref><a className="ml-2">Terms of Service</a></Link>
                    <Link href="/privacy" passHref><a className="ml-2">Privacy Policy</a></Link>
                </span>
            </div>
        </footer>
    )
}

export default Footer