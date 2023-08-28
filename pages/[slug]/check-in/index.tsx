/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import { PiCheckCircleBold } from "react-icons/pi";
import { FiSearch, FiArrowRight } from 'react-icons/fi'
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { getEvent, storeCheckin, storeCheckinManual, updateSendInfo } from '../../../actions';
import * as types from '../../../types'
import { useStore } from '../../../store'

const Checkin: NextPage<types.EventPage> = (props) => {

  const router = useRouter()
  const { slug } = router.query
  const { dispatch }: types.Dispatch = useStore()
  const [view, setView] = useState('default') //default, process, confirm, signup
  const [showScan, setShowScan] = useState(false)
  const [sendInfo, setSendInfo] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState(null)
  const [counter, setCounter] = useState(10)
  let timer: NodeJS.Timer | null = null
  let html5QrcodeScanner: Html5QrcodeScanner | null = null;
  const firstNameInputRef = useRef<HTMLInputElement>(null)
  const lastNameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)


  const setupScan = () => {
    setShowScan(true)
    if(view === 'default') {
      html5QrcodeScanner = new Html5QrcodeScanner("reader", { 
        fps: 10, 
        qrbox: {width: 284, height: 284}, 
        aspectRatio:1,
        supportedScanTypes: [
          Html5QrcodeScanType.SCAN_TYPE_CAMERA
      ], 
      }, false)
      html5QrcodeScanner.render(qrCodeSuccess, qrCodeError)
    }
  }

  useEffect(() => {
    setupTimer();

    return () => clearTimer()
  }, [timer, counter, view])

  const setupTimer = () => {
    if(view !== 'confirm' || timer) {
      return;
    }

    timer = setInterval(() => {
      if(counter > 0) {
        setCounter(counter => counter - 1)
      } else {
        setEmail(null)
        setView('default')
        clearTimer()
        setCounter(10)
        setShowScan(false)
      }
    }, 1000)
  }

  const clearTimer = () => {
    if(timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const qrCodeSuccess = async(decodedText: string, decodedResult: any) => {
    if(!slug || Array.isArray(slug)) {
      return;
    }
    if(html5QrcodeScanner) {
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      })
    }

    setView('process')
    const response = await storeCheckin(slug, decodedText)
    if(response.error) {
      dispatch({ type: 'SET_SNACK', value: { show: true, message: response.error }})
      setView('default')
      clearTimer()
      setCounter(10)
      setShowScan(false)
    } else {
      setSendInfo(false)
      if(response.checkin.email) {
        setEmail(response.checkin.email)
      }
      setView('confirm')
    }
  }

  const checkinManual = async() => {
    if(!slug || Array.isArray(slug)) {
      return;
    }
    const firstName = firstNameInputRef.current?.value
    const lastName = lastNameInputRef.current?.value
    const email = emailInputRef.current?.value

    if(!firstName) {
      dispatch({ type: 'SET_SNACK', value: { show: true, message: 'Missing first name.' }})
      return;
    }

    if(!lastName) {
      dispatch({ type: 'SET_SNACK', value: { show: true, message: 'Missing last name.' }})
      return;
    }

    if(!email) {
      dispatch({ type: 'SET_SNACK', value: { show: true, message: 'Missing e-mail.' }})
      return;
    }

    setView('process')
    const response = await storeCheckinManual(slug, firstName, lastName, email)
    if(response.error) {
      dispatch({ type: 'SET_SNACK', value: { show: true, message: response.error }})
      setView('default')
      clearTimer()
      setCounter(10)
      setShowScan(false)
    } else {
      setSendInfo(false)
      if(response.checkin.email) {
        setEmail(response.checkin.email)
      }
      setView('confirm')
    }
  }

  const qrCodeError = () => {

  }

  const sendDone = async() => {
    if(sendInfo && email && slug && !Array.isArray(slug)) {
      await updateSendInfo(slug, email, sendInfo)
    }

    setEmail(null)
    setView('default')
    clearTimer();
    setCounter(10)
    setShowScan(false)
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen p-8">
      <section className="flex flex-col items-center justify-center">
        <section className={`text-7xl siteTitle`}>{props.event.title}</section>
        {view === 'default' && (
          <section className="flex flex-col w-full max-w-md items-center mt-4">
            <div className="w-full max-w-screen-sm my-8 flex">
              <div className="bg-white flex items-center justify-center rounded-l-xl pl-4 pr-2" onClick={() => searchInputRef.current?.focus()}><FiSearch size={28} color='#AAAAAA' /></div>
              <input className="w-full h-12 pr-4 pl-2" type="text" placeholder="Search for your name or email" ref={searchInputRef} />
              <div className="flex items-center justify-center rounded-r-xl px-3 bg-slate-700 transition-all hover:bg-slate-600" onClick={() => searchInputRef.current?.focus()}><FiArrowRight size={28} color='#EEEEEE' /></div>
            </div>
            <div className="mb-6 flex w-full justify-center items-center">
              <div className="w-full h-0.5 bg-slate-700" />
              <h4 className="text-4xl mx-6">OR</h4>
              <div className="w-full h-0.5 bg-slate-700" />
            </div>
            <div className={`w-96 rounded-xl overflow-hidden ${showScan ? 'h-96' : 'h-0'}`} id="reader"></div>

            {!showScan &&
              <div className="w-full mt-8 flex justify-center">
                <button className="bg-slate-700 rounded-xl px-8 py-4 text-white hover:bg-slate-600 transition-all" onClick={() => setupScan()}>Check-in with your Ticket's QR code</button>
              </div>
            }
            <div className="w-full mt-8 flex justify-center">
              <button className="bg-slate-700 rounded-xl px-8 py-4 text-white hover:bg-slate-600 transition-all" onClick={() => setView('signup')}>Check-in without a Ticket</button>
            </div>
          </section>
        )}

        {view === 'process' && (
          <section className="flex flex-col w-full max-w-md items-center mt-4">
            <div role="status">
              <svg aria-hidden="true" className="w-96 h-96 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="none"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </section>
        )}

        {view === 'confirm' && (
          <section className="flex flex-col items-center">
            <section className="flex flex-col w-full max-w-md items-center mt-4">
              <PiCheckCircleBold className="w-96 h-96" />
              <span className="sr-only">Confirmed</span>
            </section>
            <section className="flex flex-col items-center">
              <h2 className="text-4xl">Welcome</h2>
              <section className="mt-8 grid grid-cols-2 w-full gap-8">
                <button className="bg-slate-700 rounded-xl px-8 py-4 text-white hover:bg-slate-600 transition-all flex items-center" onClick={() => setSendInfo(!sendInfo)}>
                  {sendInfo ? <MdOutlineCheckBox className="mr-2" size={24} />
                  : <MdOutlineCheckBoxOutlineBlank className="mr-2" size={24} /> }
                  <span>Send me info on IGDA Finland</span>
                </button>
                <button className="bg-slate-700 rounded-xl px-8 py-4 text-white hover:bg-slate-600 transition-all" onClick={() => sendDone()}>Done {counter}</button>
              </section>
            </section>
          </section>
        )}

        {view === 'signup' && (
          <section className="flex flex-col items-center w-full max-w-md">
            <p className="mt-6 text-slate-700 text-xl">Check-in without a Ticket</p>
            <article className="mt-12 w-full">
              <label className="text-slate-700 text-xl ml-2">First Name</label>
              <input type="text" className="w-full h-12 px-2 text-2xl rounded-xl" placeholder="First Name" ref={firstNameInputRef} />
            </article>
            <article className="mt-8 w-full">
              <label className="text-slate-700 text-xl ml-2">Last Name</label>
              <input type="text" className="w-full h-12 px-2 text-2xl rounded-xl" placeholder="Last Name" ref={lastNameInputRef} />
            </article>
            <article className="mt-8 w-full">
              <label className="text-slate-700 text-xl ml-2">E-mail</label>
              <input type="text" className="w-full h-12 px-2 text-2xl rounded-xl" placeholder="E-mail" ref={emailInputRef} />
            </article>

            <button className="bg-slate-700 rounded-xl px-8 py-4 text-white hover:bg-slate-600 transition-all w-full mt-8" onClick={checkinManual}>Confirm</button>
          </section>
        )}
      </section>
    </main>
  )
}

export async function getServerSideProps(context: any) {
  const { data: event, error } = await getEvent(context.query.slug)
  return { props: { event, error }}
}

export default Checkin