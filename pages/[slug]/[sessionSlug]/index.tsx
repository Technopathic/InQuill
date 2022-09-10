import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useStore } from '../../../store'

import * as types from '../../../types'
import { getQuestions, storeQuestion, storeQuestionVote } from '../../../actions'

import { FiChevronUp } from "react-icons/fi";

const Questions: NextPage<types.QuestionsPage> = (props) => {
  const router = useRouter()
  const { sessionSlug } = router.query
  const { session, questions }: types.State = useStore()
  const { dispatch }: types.Dispatch = useStore()
  const questionRef = useRef<HTMLTextAreaElement>(null)
  

  useEffect(() => {
    if(props.error) {
      console.log(props.error);
    } else {
      dispatch({ type: 'GET_QUESTIONS', value: {  session: props.session, questions: props.questions } })
    }
  }, [dispatch, props])

  if(!session) {
    return (
      <></>
    )
  }

  const handleStoreQuestion = async() => {
    if(questionRef.current) {
      await storeQuestion(session.slug, questionRef.current.value, 'Anonymous')
    }
  }
  
  return (
    <>
      <header className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full py-8">
              <h1 className="text-slate-700 text-2xl text-center">{session.title}</h1>
              <div className="w-full max-w-screen-sm mt-4">
                <textarea className="w-full h-32 p-2 resize-none" ref={questionRef}></textarea>
                <div className="flex justify-end">
                  <div className="cursor-pointer bg-slate-800 py-2 px-10 rounded-xl text-white text-xl" onClick={handleStoreQuestion}>Ask</div>
                </div>
              </div>
          </div>
      </header>
      <div className="h-px w-full bg-slate-500 max-w-screen-md m-auto" />
      <main className="flex flex-col flex-grow items-center pb-8">
        <section className="w-full max-w-screen-sm">
          {questions.map((question, i) => (
            <article key={i} className="flex bg-white rounded-xl mt-8 p-4">
                <div className="flex flex-col items-center pr-4">
                    <div className="cursor-pointer">
                      <FiChevronUp size={32} />
                    </div>
                    <p className="text-2xl mb-2">{question.votes}</p>
                    <span>Votes</span>
                </div>
                <div>
                  <span className="text-sm">{question.author}</span>
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
  const data = await getQuestions(context.query.sessionSlug)
  return { props: { session: data.session, questions: data.questions, error: data.error } }
}

export default Questions