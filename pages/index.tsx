/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'
import { useStore } from '../store'

import * as types from '../types'
import { getEvents, getUser } from '../actions'

const Home: NextPage<types.EventsPage> = (props) => {
  const router = useRouter()
  const { events }: types.State = useStore()
  const { dispatch }: types.Dispatch = useStore()

  useEffect(() => {
    if(props.error) {
      dispatch({ type: 'SET_SNACK', value: { show: true, message: props.error }})
    } else {
      dispatch({ type: 'GET_EVENTS', value: props.events })
    }
  }, [dispatch, props])

  return (
    <>
      <header className="w-full h-40 flex flex-col justify-center items-center">
          <div className="flex justify-center px-4">
            <h1 className="siteTitle">IGDA Q&A</h1>
          </div>
      </header>
      <main className="flex flex-col flex-grow items-center mx-4">
        <section className="w-full max-w-screen-sm">
          {events.map((e, i) => (
            <Link href={e.slug} key={i} passHref>
              <a>
                <article className="md:h-20 h-16 bg-slate-700 rounded-xl mt-8 flex justify-between items-center px-4 pb-1">
                  <div className="text-white md:text-4xl text-2xl">
                    { e.title}
                  </div>
                </article>
              </a>
            </Link>
          ))}
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const data = await getEvents()
  return { props: { events: data.events, error: data.error } }
}

export default Home