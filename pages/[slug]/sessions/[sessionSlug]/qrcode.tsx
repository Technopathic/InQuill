import type { NextPage } from 'next'
import * as types from '../../../../types'
import QRCode from "react-qr-code"
import { getSession, getEvent } from '../../../../actions'
import dayjs from 'dayjs'

const SessionQRCode: NextPage<types.QRPage> = (props) => {
    return (
        <main className="flex flex-col justify-between h-screen blueBackground">
            <div className="flex pl-8 pt-8 pr-8 items-center">
                <div className="mr-8">
                    <img className="h-20" src="/IGDALogo.png" alt="IGDA LOGO" />
                </div>
                <div className="flex flex-col mt-2">
                    <h1 className="text-4xl font-bold pinkText">{props.event.title}</h1>
                    <p className="text-2xl text-white">Helsinki {dayjs(props.event.start_at).format('DD.MM.YYYY')}</p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-6xl font-bold mb-4 text-white">Q&A</h2>
                <div className="h-96 w-96 border-8 p-3 border-white">
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`/${props.event.slug}/sessions/${props.session.slug}`} 
                    />
                </div>
                <h3 className="mt-8 text-white text-3xl">{props.session.speaker}</h3>
            </div>
            <div></div>
        </main>
    )
}

export async function getServerSideProps(context: any) {
    const { data, error } = await getSession(context.query.sessionSlug)
    const { data: eventData, error: eventError } = await getEvent(context.query.slug)
    return { props: { event: eventData, session: data, error: error || eventError } }
}

export default SessionQRCode