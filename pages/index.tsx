import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useStore } from '../store'

import * as types from '../types'
import { getEvents } from '../actions'

const Home: NextPage<types.EventsPage> = (props) => {
  const { events }: types.State = useStore()
  const { dispatch }: types.Dispatch = useStore()

  useEffect(() => {
    if(props.error) {
      console.log(props.error);
    } else {
      console.log(props);
      dispatch({ type: 'GET_EVENTS', value: props.events })
    }
  }, [dispatch, props.error, props.events])
  
  return (
    <main>
      
    </main>
  )
}

export async function getServerSideProps() {
  const data = await getEvents()
  return { props: { data } }
  //return { props: { data: { events: [], error: null } }}
}

export default Home