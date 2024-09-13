import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../store'
import dayjs from 'dayjs'
import QRCode from "react-qr-code"

import * as types from '../../../types'
import { getSessions, getEvent } from '../../../actions'

import { FiSearch } from 'react-icons/fi'

const Sessions: NextPage<types.SessionsPage> = (props) => {
  const router = useRouter()
  const { slug } = router.query
  const { event, sessions }: types.State = useStore()
  const { dispatch }: types.Dispatch = useStore()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchResults, setSearchResults] = useState<types.SessionType[]>([])
  
  useEffect(() => {
    if(props.error) {
      dispatch({ type: 'SET_SNACK', value: { show: true, message: props.error }})
    } else {
      dispatch({ type: 'GET_SESSIONS', value: {  event: props.event, sessions: props.sessions } })
    }
  }, [dispatch, props])

  if(!event) {
    return (
      <></>
    )
  }

  const handleSearchInput = () => {
    const searchResults: types.SessionType[] = []
    if(searchInputRef.current?.value)  {
      for (const session of sessions) {
        if (
          session.title.toLowerCase().includes(searchInputRef.current.value.toLocaleLowerCase()) ||
          session.speaker?.toLowerCase().includes(searchInputRef.current.value.toLocaleLowerCase())
        ) {
          searchResults.push(session)
        }
      }     
    }

    setSearchResults(searchResults)
  }
  
  return (
    <>
      <header className="w-full mt-8 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full">
              <h1 className="text-slate-700 text-4xl text-center font-bold">{event.title}</h1>
              <p className="text-base mt-4 mx-3">Welcome! All available sessions are shown below.</p>
          </div>
          <div className="w-full max-w-screen-sm mt-8 flex">
            <div className="bg-white flex items-center justify-center rounded-l-xl pl-4 pr-2" onClick={() => searchInputRef.current?.focus()}><FiSearch size={28} color='#AAAAAA' /></div>
            <input className="w-full h-14 rounded-r-xl pr-4 pl-2" type="text" placeholder="Search for a session or speaker" ref={searchInputRef} onChange={handleSearchInput}/>
          </div>
      </header>
      <main className="flex flex-col flex-grow items-center pb-8 mx-4">
        <section className="w-full max-w-screen-sm">
          {searchResults.length > 0 && searchResults.map((session, i) => (
            <article key={i} className="flex flex-col bg-white rounded-xl mt-8 text-slate-700">
              <div className="p-6 flex flex-col">
                <div className="flex justify-between">
                  <div>
                    <span className="text-sm">Q&A - {dayjs(session.start_at).format('DD/MM/YYYY')}</span>
                    <p className="text-xl font-bold my-1">{session.title}</p>
                  </div>
                  <Link href={`/${slug}/sessions/${session.slug}/qrcode`}>
                    <a className="absolute right-2 top-2 border border-solid border-slate-700 h-10 w-10 rounded-md p-1">
                      <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`${process.env.APP_URL}/${slug}/sessions/${session.slug}`} 
                      />
                    </a>
                  </Link>
                </div>
                <span>{session.speaker}</span>
              </div>
              <Link href={`/${slug}/sessions/${session.slug}`} passHref>
                <a>
                  <div className="py-4 text-center bg-slate-800 rounded-b-xl text-white">Join this Q&A</div>
                </a>
              </Link>
            </article>
          ))}
        </section>
        <section className="w-full max-w-screen-sm">
          {searchResults.length === 0 && sessions.map((session, i) => (
            <article key={i} className="flex flex-col bg-white rounded-xl mt-8 text-slate-700 relative">
              <div className="p-6 flex flex-col">
                <div className="flex justify-between">
                  <div>
                    <span className="text-sm">Q&A - {dayjs(session.start_at).format('DD/MM/YYYY')}</span>
                    <p className="text-xl font-bold my-1">{session.title}</p>
                  </div>
                  <Link href={`/${slug}/sessions/${session.slug}/qrcode`}>
                    <a className="absolute right-2 top-2 border border-solid border-slate-700 h-10 w-10 rounded-md p-1">
                      <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`${process.env.APP_URL}/${slug}/sessions/${session.slug}`} 
                      />
                    </a>
                  </Link>
                </div>
                <span>{session.speaker}</span>
              </div>
              <Link href={`/${slug}/sessions/${session.slug}`} passHref>
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
  const { data, error } = await getSessions(context.query.slug)
  const { data: eventData, error: eventError } = await getEvent(context.query.slug)
  return { props: { event: eventData, sessions: data || [], error: error || eventError } }
}

export default Sessions