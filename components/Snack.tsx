import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useStore } from '../store'

import * as types from '../types'

const Snack: NextPage = () => {
    const { snack }: types.State = useStore()
    const { dispatch }: types.Dispatch = useStore()

    useEffect(() => {
        if(snack.show) {
            setTimeout(() => {
                dispatch({ type: 'SET_SNACK', value: { show: false, message: null }})
            }, 2000)
        }
    }, [dispatch, snack.show])

    return (
        <div className={`fixed bg-slate-800 bottom-0 w-full h-16 flex flex-col justify-center items-center transition-all ${snack.show ? 'translate-y-0' : 'translate-y-16'}`}>
            <p className="text-center text-white">{snack.message}</p>
        </div>
    )
}

export default Snack