import { useLayoutEffect } from 'react'
import create from 'zustand'
import createContext from 'zustand/context'

import * as types from './types'

const actionTypes: Record<string, types.ActionType> = {
    GET_EVENTS: 'GET_EVENTS',
    GET_SESSIONS: 'GET_SESSIONS',
    GET_QUESTIONS: 'GET_QUESTIONS',
    GET_QUESTION_VOTES: 'GET_QUESTION_VOTES',
    STORE_QUESTION: 'STORE_QUESTION',
    STORE_QUESTION_VOTE: 'STORE_QUESTION_VOTE',
    UPDATE_QUESTION: 'UPDATE_QUESTION',
    DELETE_QUESTION: 'DELETE_QUESTION',
    ANSWER_QUESTION: 'ANSWER_QUESTION',
    SET_SNACK: 'SET_SNACK',
    SET_ADMIN: 'SET_ADMIN',
    SET_SORT_QUESTIONS: 'SET_SORT_QUESTIONS'
}

let store: any

const initialState: types.State  = {
    events: [],
    event: null,
    sessions: [],
    session: null,
    questions: [],
    snack: {
        show: false,
        message: null
    },
    votes: [],
    isAdmin: false,
    sortQuestions: 'latest'
}

const context = createContext()
export const Provider: any = context.Provider
export const useStore: any = context.useStore

export const initializeStore = (preloadState = {}) => create<types.State>(set => ({
    ...initialState,
    ...preloadState,
    dispatch: (action: types.Action) => set(state => reducer(state, action))
}))

export const useCreateStore = (initialState: types.State) => {
    if (typeof window === 'undefined') {
        return () => initializeStore(initialState)
    }

    store = store ?? initializeStore(initialState)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
        if (initialState && store) {
            store.setState({
                ...store.getState(),
                ...initialState
            })
        }
    }, [initialState])

    return () => store
}

const reducer = (state: types.State, action: types.Action): types.State => {
    switch (action.type) {

        case actionTypes.GET_EVENTS: {
            return {
                ...state,
                events: action.value
            }
        }

        case actionTypes.GET_SESSIONS: {
            return {
                ...state,
                event: action.value.event,
                sessions: action.value.sessions,
                votes: action.value.votes
            }
        }

        case actionTypes.GET_QUESTIONS: {
            const questions: types.QuestionType[] = action.value.questions
            const sortQuestions = state.sortQuestions

            switch(sortQuestions) {
                case 'latest':
                    questions.sort((a, b) => b.id - a.id)
                    break

                case 'top':
                    questions.sort((a, b) => b.votes - a.votes)
                    break
            }

            return {
                ...state,
                session: action.value.session,
                questions
            }
        }

        case actionTypes.GET_QUESTION_VOTES: {
            return {
                ...state,
                votes: action.value
            }
        }

        case actionTypes.STORE_QUESTION: {            
            const questions = state.questions
            questions.unshift(action.value)

            return {
                ...state,
                questions
            }
        }

        case actionTypes.STORE_QUESTION_VOTE: {
            const questions = state.questions
            const votes = state.votes
            const voteQuestion = questions.find(question => question.id === action.value.id)
            if(voteQuestion) {
                voteQuestion.votes = action.value.votes
                votes.push(voteQuestion.id)
            }

            localStorage.setItem('questionVotes', JSON.stringify(votes))
            
            return {
                ...state,
                questions,
                votes
            }
        }

        case actionTypes.UPDATE_QUESTION: {
            const questions = state.questions
            for (let i = 0; i < questions.length; i++) {
                if(questions[i].id === action.value.id) {
                    questions[i].votes = action.value.votes
                    questions[i].answered = action.value.answered

                    if(action.value.archived) {
                        questions.splice(i, 1)
                    }
                }
            }

            return {
                ...state,
                questions
            }
        }

        case actionTypes.DELETE_QUESTION: {
            const questions = state.questions
            for (let i = 0; i < questions.length; i++) {
                if(questions[i].id === action.value) {
                    questions.splice(i, 1)
                }
            }

            return {
                ...state,
                questions
            }
        }

        case actionTypes.ANSWER_QUESTION: {
            const questions = state.questions
            for (let i = 0; i < questions.length; i++) {
                if(questions[i].id === action.value) {
                    questions[i].answered = true
                }
            }

            return {
                ...state,
                questions
            }
        }

        case actionTypes.SET_SNACK: {
            const snack = state.snack
            snack.show = action.value.show
            snack.message = action.value.message

            return {
                ...state,
                snack
            }
        }

        case actionTypes.SET_ADMIN: {
            return {
                ...state,
                isAdmin: action.value
            }
        }

        case actionTypes.SET_SORT_QUESTIONS: {
            const questions = state.questions
            
            switch(action.value) {
                case 'latest':
                    questions.sort((a, b) => b.id - a.id)
                    break

                case 'top':
                    questions.sort((a, b) => b.votes - a.votes)
                    break
            }

            return {
                ...state,
                questions,
                sortQuestions: action.value
            }
        }
        
        default: {
            return state
        }
    }
}