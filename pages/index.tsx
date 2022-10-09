/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { useStore } from '../store'

import * as types from '../types'
import { getEvents } from '../actions'

const Home: NextPage<types.EventsPage> = (props) => {
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
            <h1 className="siteTitle">{process.env.APP_SITE_NAME}</h1>
          </div>
      </header>
      <main className="flex flex-col flex-grow items-center mx-4">
      {events.currentEvents.length > 0 && (
          <div className="mb-12 w-full max-w-screen-sm">
          <h3 className="text-3xl">Current Events</h3>
            <section>
              {events.currentEvents.map((e, i) => (
                <Link href={e.slug} key={i} passHref>
                  <a>
                    <article className="md:h-20 h-16 bg-slate-700 rounded-xl mt-8 flex justify-between items-center px-4 pb-1">
                      <div className="text-white md:text-4xl text-2xl">
                        { e.title }
                      </div>
                    </article>
                  </a>
                </Link>
              ))}
            </section>
          </div>
        )}
        {events.upcomingEvents.length > 0 && (
          <div className="mb-12 w-full max-w-screen-sm">
          <h3 className="text-3xl">Upcoming Events</h3>
            <section>
              {events.upcomingEvents.map((e, i) => (
                <Link href={e.slug} key={i} passHref>
                  <a>
                    <article className="md:h-20 h-16 bg-slate-700 rounded-xl mt-8 flex justify-between items-center px-4 pb-1">
                      <div className="text-white md:text-4xl text-2xl">
                        { e.title }
                      </div>
                    </article>
                  </a>
                </Link>
              ))}
            </section>
          </div>
        )}
        {events.pastEvents.length > 0 && (
          <div className="mb-12 w-full max-w-screen-sm">
          <h3 className="text-3xl">Past Events</h3>
            <section>
              {events.pastEvents.map((e, i) => (
                <Link href={e.slug} key={i} passHref>
                  <a>
                    <article className="md:h-20 h-16 bg-slate-700 rounded-xl mt-8 flex justify-between items-center px-4 pb-1">
                      <div className="text-white md:text-4xl text-2xl">
                        { e.title }
                      </div>
                    </article>
                  </a>
                </Link>
              ))}
            </section>
          </div>
        )}
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const currentTime = new Date().getTime()
  const { data, error } = await getEvents()
  const events = {
    currentEvents: data.filter(event => currentTime > new Date(event.start_at).getTime() && currentTime < new Date(event.end_at).getTime() + 60 * 60 * 24 * 1000).sort((a, b) => b.id - a.id),
    upcomingEvents: data.filter(event => currentTime < new Date(event.start_at).getTime()).sort((a, b) => b.id - a.id),
    pastEvents: data.filter(event => currentTime > new Date(event.end_at).getTime() + 60 * 60 * 24 * 1000).sort((a, b) => b.id - a.id)
  }
  return { props: { events: events, error: error } }
}

export default Home