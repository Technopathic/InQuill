/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import * as types from '../../../../types'
import QRCode from "react-qr-code"
import { getSession, getEvent } from '../../../../actions'

const SessionQRCode: NextPage<types.QRPage> = (props) => {
    return (
        <main className="bg-white">
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`${process.env.APP_URL}/${props.event.slug}/sessions/${props.session.slug}`} 
            />
        </main>
    )
}

export async function getServerSideProps(context: any) {
    const { data, error } = await getSession(context.query.sessionSlug)
    const { data: eventData, error: eventError } = await getEvent(context.query.slug)
    return { props: { event: eventData, session: data, error: error || eventError } }
}

export default SessionQRCode