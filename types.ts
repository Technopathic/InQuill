export type EventType = {
    id: number;
    title: string;
    slug: string;
    start_at: string;
    end_at: string;
}

export type EventsCollection = {
    currentEvents: EventType[];
    upcomingEvents: EventType[];
    pastEvents: EventType[];
}

export type SessionType = {
    id: number;
    eventSlug: string;
    title: string;
    slug: string;
    description?: string;
    speaker?: string;
    start_at?: string;
    end_at?: string;
}

export type QuestionType = {
    id: number;
    sessionSlug: string;
    author: string;
    votes: number;
    content: string;
    created_at: string;
    userId: string | null;
    answered: boolean;
}

export type QuestionData = {
    sessionSlug: string;
    author: string;
    votes: number;
    content: string;
    userId: string | null;
}

export type Snack = {
    show: boolean;
    message: string | null;
}

export type State = {
    events: EventsCollection;
    event: EventType | null;
    sessions: SessionType[];
    session: SessionType | null;
    questions: QuestionType[];
    snack: Snack;
    votes: number[] | null;
    isAdmin: boolean;
    sortQuestions: 'latest' | 'top';
}

export type ActionType = 
    'GET_EVENTS' | 
    'GET_SESSIONS' | 
    'GET_QUESTIONS' | 
    'GET_QUESTION_VOTES' | 
    'STORE_QUESTION' | 
    'STORE_QUESTION_VOTE' | 
    'UPDATE_QUESTION' |
    'DELETE_QUESTION' | 
    'ANSWER_QUESTION' | 
    'SET_SNACK' |
    'SET_ADMIN' |
    'SET_SORT_QUESTIONS';

export type Action = {
    type: ActionType;
    value: any;
}

export type Dispatch = {
    dispatch: (action: Action) => void;
}

export type EventsPage = {
    events: EventsCollection;
    error: string;
}

export type SessionsPage = {
    event: EventType;
    sessions: SessionType[];
    error: string;
}

export type QuestionsPage = {
    session: SessionType;
    questions: QuestionType[];
    error: string;
    requireAuth: boolean;
}