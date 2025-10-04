/* eslint-disable @next/next/no-img-element */
import QRCode from "react-qr-code"

const QRCodeLDMixer25 = () => {
    return (
        <main className="flex flex-col justify-between h-screen bg-white">
            <div className="flex pl-8 pt-8 pr-8 items-center">
                <div className="flex flex-col mt-2">
                    <h1 className="text-4xl font-bold text-black">Leadership Day Mixer 2025</h1>
                    <p className="text-2xl text-black">Sofiankatu 4C 06.10.2025</p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-6xl font-bold mb-4 text-black">Event Registration</h2>
                <div className="h-96 w-96 p-3">
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value="https://luma.com/nyn8jrue" 
                    />
                </div>
                <h3 className="mt-8 text-black text-3xl px-8">Scan this if you do not have a ticket</h3>
            </div>
            <div></div>
        </main>
    )
}

export default QRCodeLDMixer25