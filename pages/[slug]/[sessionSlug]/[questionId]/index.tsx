import type { NextPage } from 'next'
import { getQuestion } from '../../../../actions'

import * as types from '../../../../types'

const Full: NextPage<types.FullPage> = (props) => {
    return (
        <>
        <header>

        </header>
        <main className="w-full max-w-screen-sm">
            <article>

            </article>
        </main>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const { data, error } = await getQuestion(context.query.questionId)
    return { props: { question: data, error }}
}

export default Full