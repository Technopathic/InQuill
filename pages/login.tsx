import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { signIn, getUser } from '../actions'
import { FcGoogle } from "react-icons/fc";
import { SiTwitter } from "react-icons/si"
import { useEffect } from 'react';

const Login: NextPage = () => {
    const router = useRouter()

    useEffect(() => {
        const auth = getUser()
        if(auth) {
            router.push('/')
        }
    })

    const handleSignIn = async(provider: 'google' | 'twitter') => {
        await signIn(provider)
    }
    
    return (
        <div className="flex flex-col items-center mt-4 justify-center">
          <p className="mb-2 text-xl">Sign in</p>
          <div className="flex">
            <div onClick={() => handleSignIn('google')} className="mx-2 bg-slate-800 text-white uppercase px-6 py-2 rounded select-none cursor-pointer flex items-center"><FcGoogle size={22} className="mr-2"/> Google</div>
            <div onClick={() => handleSignIn('twitter')} className="mx-2 bg-slate-800 text-white uppercase px-6 py-2 rounded select-none cursor-pointer flex items-center"><SiTwitter size={22} className="mr-2" color="#1DA1F2"/> Twitter</div>
          </div>
        </div>
      )
}

export default Login