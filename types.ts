export type EventType = {
    id: number;
    title: string;
    slug: string;
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
    userId: string;
}

export type QuestionData = {
    sessionSlug: string;
    author: string;
    votes: number;
    content: string;
    userId: string;
}

export type Snack = {
    show: boolean;
    message: string | null;
}

export type State = {
    events: EventType[];
    event: EventType | null;
    sessions: SessionType[];
    session: SessionType | null;
    questions: QuestionType[];
    snack: Snack;
    votes: number[];
}

export type ActionType = 'GET_EVENTS' | 'GET_SESSIONS' | 'GET_QUESTIONS' | 'GET_QUESTION_VOTES' | 'STORE_QUESTION' | 'STORE_QUESTION_VOTE' | 'SET_SNACK';

export type Action = {
    type: ActionType;
    value: any;
}

export type Dispatch = {
    dispatch: (action: Action) => void;
}

export type EventsPage = {
    events: EventType[];
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
}