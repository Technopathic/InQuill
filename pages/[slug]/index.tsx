import type { NextPage } from 'next'
import Link from 'next/link'

import * as types from '../../types'
import { getEvent } from '../../actions'

const Event: NextPage<types.EventPage> = (props) => {
  return (
    <main className="flex flex-col min-h-screen items-center p-8 justify-center">
      <section>
        <h1 className={`text-8xl siteTitle`}>{props.event.title}</h1>
      </section>
      <section className="grid grid-cols-1 gap-8 w-full max-w-md mt-4">
        {/*<Link href={`${props.event.slug}/check-in`} passHref>
          <a className="bg-slate-700 text-white text-2xl text-center rounded-lg py-2">
            Check-In
          </a>
        </Link>*/}
        <Link href={`${props.event.slug}/sessions`} passHref>
          <a className="bg-slate-700 text-white text-2xl text-center rounded-lg py-2">
            Q & A
          </a>
        </Link>
      </section>
    </main>
  )
}

export async function getServerSideProps(context: any) {
  const { data: event, error } = await getEvent(context.query.slug)
  return { props: { event, error }}
}

export default Event