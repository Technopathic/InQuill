import { useLayoutEffect } from 'react'
import create from 'zustand'
import createContext from 'zustand/context'

import * as types from './types'

const actionTypes: Record<string, types.ActionType> = {
    GET_EVENTS: 'GET_EVENTS',
    GET_SESSIONS: 'GET_SESSIONS',
    GET_QUESTIONS: 'GET_QUESTIONS',
    STORE_QUESTION: 'STORE_QUESTION',
    STORE_QUESTION_VOTE: 'STORE_QUESTION_VOTE',
    SET_SNACK: 'SET_SNACK'
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
    votes: []
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
            console.log(action.value)
            return {
                ...state,
                session: action.value.session,
                questions: action.value.questions,
                votes: action.value.votes
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

            return {
                ...state,
                questions,
                votes
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
        
        default: {
            return state
        }
    }
}