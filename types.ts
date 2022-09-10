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
}

export type QuestionType = {
    id: number;
    sessionSlug: string;
    author: string;
    votes: number;
    content: string;
    created_at: string;
    userId?: number;
}

export type QuestionData = {
    sessionSlug: string;
    author: string;
    votes: number;
    content: string;
    userId?: number;
}

export type State = {
    events: EventType[];
    event: EventType | null;
    sessions: SessionType[];
    session: SessionType | null;
    questions: QuestionType[];
    error: string;
}

export type ActionType = 'GET_EVENTS' | 'GET_SESSIONS' | 'GET_QUESTIONS' | 'STORE_QUESTION' | 'STORE_QUESTION_VOTE';

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