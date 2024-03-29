/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../../store'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { RealtimeClient } from '@supabase/realtime-js'
import { User } from '@supabase/supabase-js';

import * as types from '../../../../types'
import { getQuestions, storeQuestion, storeQuestionVote, signIn, getUser, getIsAdmin, getQuestionVotes, deleteQuestion, answerQuestion, supabase, getSession } from '../../../../actions'

import { FiChevronUp, FiTrash, FiCheck } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { SiTwitter } from "react-icons/si"

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Helsinki');

const REALTIME_URL = 'wss://qepbbrribkrkypytwssf.supabase.co/realtime/v1'
const socket = new RealtimeClient(REALTIME_URL,  { params: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '' }})

let channel = null

const Questions: NextPage<types.QuestionsPage> = (props) => {
  const { session, questions, votes, isAdmin, sortQuestions }: types.State = useStore()
  const { dispatch }: types.Dispatch = useStore()
  const questionRef = useRef<HTMLTextAreaElement>(null)
  const authorRef = useRef<HTMLInputElement>(null)
  const [requireAuth, setRequireAuth] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getVotes() {
      const questionVotes = await getQuestionVotes()
      dispatch({ type: 'GET_QUESTION_VOTES', value: questionVotes.votes })
    }
    

    async function getSession() {
      const supabaseUser = await getUser()
      if(supabaseUser) {
        setUser(supabaseUser)
        const admin = await getIsAdmin()
        if(admin) {
          dispatch({ type: 'SET_ADMIN', value: admin.success })
        }
      }
    }

    getSession()
    getVotes()
  
    if(props.error) {
      dispatch({ type: 'SET_SNACK', value: { show: true, message: props.error }})
    } else {
      dispatch({ type: 'GET_QUESTIONS', value: {  session: props.session, questions: props.questions } })
      setRequireAuth(props.requireAuth)
    }

    createSubscription()
    socket.connect()

    return(() => {
      async() => {
        await supabase.removeAllChannels()
        await socket.disconnect()
      }
    })
  }, [])

  const createSubscription = () => {
    channel = socket.channel('realtime:public:questions')
    channel.on('postgres_changes', { event: 'INSERT', schema: 'public'}, (e: any) => dispatch({ type: 'STORE_QUESTION', value: {
      id: e.new.id,
      sessionSlug: e.new.sessionSlug,
      author: e.new.author,
      content: e.new.content,
      created_at: e.new.created_at,
      userId: e.new.userId,
      answered: e.new.answered,
      votes: e.new.votes
    }}))
    channel.on('postgres_changes', { event: 'UPDATE', schema: 'public'}, (e: any) => dispatch({ type: 'UPDATE_QUESTION', value: e.new }))
    channel
    .subscribe(status => {
      if (status === 'SUBSCRIBED') {
          console.log('Connected')
      } else {
          console.log('Connecting...')
      }
    });
  }

  if(!session) {
    return (
      <></>
    )
  }

  const handleStoreQuestion = async() => {
    if(questionRef.current) {
      const response = await storeQuestion(session.slug, questionRef.current.value, authorRef.current?.value || '')
      if(response.error) {
        dispatch({ type: 'SET_SNACK', value: { show: true, message: response.error }})
      } else {
        questionRef.current.value = ''
      }
    }
  }

  const handleStoreQuestionVote = async(id: number) => {
    if(votes && votes.includes(id)) {
      dispatch({ type: 'SET_SNACK', value: { show: true, message: 'You have already voted.' }})
      return
    }

    const response = await storeQuestionVote(id)
    if(response.error) {
      dispatch({ type: 'SET_SNACK', value: { show: true, message: response.error }})
    } else {
      dispatch({ type: 'STORE_QUESTION_VOTE', value: response.question[0] })
    }
  }

  const handleDeleteQuestion = async(id: number) => {
    const response = await deleteQuestion(id);
    if(response.error) {
      dispatch({ type: 'SET_SNACK', value: { show: true, message: response.error }})
    } else {
      dispatch({ type: 'DELETE_QUESTION', value: id })
    }
  }

  const handleAnswerQuestion = async(id: number) => {
    const response = await answerQuestion(id);
    if(response.error) {
      dispatch({ type: 'SET_SNACK', value: { show: true, message: response.error }})
    } else {
      dispatch({ type: 'ANSWER_QUESTION', value: id })
    }
  }

  const handleSignIn = async(provider: 'google' | 'twitter') => {
    await signIn(provider)
  }

  const renderInput = () => {
    if(!session.start_at || !session.end_at) {
      return <></>
    }

    const currentTime = new Date().getTime()
    const startTime = new Date(session.start_at).getTime()
    const endTime = new Date(session.end_at).getTime()

    if(startTime > currentTime) {
      return (
        <div className="w-full mt-4 text-center">
          <h2 className="text-2xl">Q&A Starts</h2>
          <p className="text-3xl">{dayjs(session.start_at).format('DD/MM/YYYY')}</p>
        </div>
      )
    } else if (currentTime > endTime) {
      return (
        <div className="w-full mt-4 text-center">
          <h2 className="text-2xl">Q&A has ended</h2>
        </div>
      )
    } else {
      if(user || !requireAuth) {
        return (
          <div className="w-full mt-4 px-2">
            <textarea className="w-full h-32 p-2 resize-none rounded-xl text-slate-800" ref={questionRef} placeholder="Ask your question here"></textarea>
            <div className="flex justify-between mt-1">
              <input className="flex rounded-xl w-1/2 px-3 text-slate-800" placeholder="Your name (optional)" ref={authorRef} />
              <div className="cursor-pointer bg-slate-800 py-2 px-10 rounded-xl text-white text-xl select-none" onClick={handleStoreQuestion}>Ask</div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="flex flex-col items-center mt-4 justify-center">
            <p className="mb-2 text-xl">Sign in to ask questions</p>
            <div className="flex">
              <div onClick={() => handleSignIn('google')} className="mx-2 bg-slate-800 text-white uppercase px-6 py-2 rounded select-none cursor-pointer flex items-center"><FcGoogle size={22} className="mr-2"/> Google</div>
              <div onClick={() => handleSignIn('twitter')} className="mx-2 bg-slate-800 text-white uppercase px-6 py-2 rounded select-none cursor-pointer flex items-center"><SiTwitter size={22} className="mr-2" color="#1DA1F2"/> Twitter</div>
            </div>
          </div>
        )
      }
    }
  }
  
  return (
    <>
      <header className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center max-w-screen-sm items-center w-full pt-8 pb-6">
              <h1 className="text-slate-700 text-2xl text-center">{session.title}</h1>
              <div className="flex justify-center w-full px-2 text-slate-700 text-center">
                {session.speaker}
                {/*<span>Ends: {dayjs(session.end_at).format('DD/MM/YYYY')}</span>*/}
              </div>
              {renderInput()}
          </div>
      </header>
      <div className="h-px w-full bg-slate-500 max-w-screen-md m-auto" />
      <main className="flex flex-col flex-grow items-center pb-8">
        <div className="w-full max-w-screen-sm mt-2 px-2 flex justify-end text-slate-700">
          <select value={sortQuestions} onChange={(e) => dispatch({ type: 'SET_SORT_QUESTIONS', value: e.target.value })}>
            <option value="latest">Latest</option>
            <option value="top">Most Votes</option>
          </select>
        </div>
        <section className="w-full max-w-screen-sm">
          {questions.map((question, i) => (
            <article key={i} className="flex bg-white rounded-xl mt-8 p-4 text-slate-700 mx-2">
                <div className="flex flex-col items-center pr-6">
                    {((user && votes) || (!requireAuth && votes)) && 
                      <div className={`cursor-pointer ${votes.includes(question.id) ? 'text-orange-400' : 'text-slate-800'}`} onClick={() => handleStoreQuestionVote(question.id)}>
                        <FiChevronUp size={32} />
                      </div>
                    }
                    <p className="text-2xl mb-2">{question.votes}</p>
                    <span className="text-sm">Votes</span>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between w-full">
                    <span className="text-sm">{question.author}</span>
                    {isAdmin ? (
                      <div className="flex items-center">
                        {question.answered ? (
                          <div className="text-sm">
                            {question.answered && 'Answered'}
                          </div>
                        ) :
                        (
                          <div className="cursor-pointer" onClick={() => handleAnswerQuestion(question.id)}>
                            <FiCheck />
                          </div>
                        )}
                        <div className="ml-2 cursor-pointer" onClick={() => handleDeleteQuestion(question.id)}>
                          <FiTrash />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center text-sm">
                        {question.answered && 'Answered'}
                      </div>
                    )}
                  </div>
                  <p className="text-xl my-1">{question.content}</p>
                </div>
            </article>
          ))}
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { data, error } = await getQuestions(context.query.sessionSlug)
  const { data: sessionData, error: sessionError } = await getSession(context.query.sessionSlug)
  return { props: { session: sessionData, questions: data || [], error: error || sessionError } }
}

export default Questions