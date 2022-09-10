import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useStore } from '../../store'
import dayjs from 'dayjs'

import * as types from '../../types'
import { getSessions } from '../../actions'

const Sessions: NextPage<types.SessionsPage> = (props) => {
  const router = useRouter()
  const { slug } = router.query
  const { event, sessions }: types.State = useStore()
  const { dispatch }: types.Dispatch = useStore()
  

  useEffect(() => {
    if(props.error) {
      console.log(props.error);
    } else {
      dispatch({ type: 'GET_SESSIONS', value: {  event: props.event, sessions: props.sessions } })
    }
  }, [dispatch, props])

  if(!event) {
    return (
      <></>
    )
  }
  
  return (
    <>
      <header className="w-full h-40 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full">
              <h1 className="text-slate-700 text-3xl text-center">{event.title}</h1>
              <p className="text-base mt-4">Welcome! All available sessions are shown below.</p>
          </div>
      </header>
      <main className="flex flex-col flex-grow items-center pb-8 mx-4">
        <section className="w-full max-w-screen-sm">
          {sessions.map((session, i) => (
            <article key={i} className="flex flex-col bg-white rounded-xl mt-8">
              <div className="p-6">
                <span className="text-sm">Q&A - {dayjs(session.start_at).format('DD/MM/YYYY HH:mm')}</span>
                <p className="text-xl font-bold my-1">{session.title}</p>
                <span>{session.speaker}</span>
              </div>
              <Link href={`/${slug}/${session.slug}`} passHref>
                <a>
                  <div className="py-4 text-center bg-slate-800 rounded-b-xl text-white">Join this Q&A</div>
                </a>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const data = await getSessions(context.query.slug)
  return { props: { event: data.event, sessions: data.sessions, error: data.error } }
}

export default Sessions