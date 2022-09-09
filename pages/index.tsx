import type { NextPage } from 'next'
import { useStore } from '../store'

import * as types from '../types'

const Home: NextPage<types.State> = () => {
  const { events }: types.State = useStore()
  const { dispatch }: types.Dispatch = useStore()

  
  
  return (
    <main>
      
    </main>
  )
}

export default Home