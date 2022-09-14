![InQuill Logo](https://inquill.live/inquill-full-white.png)

## What is InQuill?

InQuill is an open-source solution to Live Q&A events and audience engagement. It allows for your audience to ask questions anonymously and non-anonmyously and for these questions to be answered by the speaker or production team. InQuill allows for real-time communication between the audience and the speaker through questions. Moreover, for reach event, you can create multiple Q&A rooms for different speakers concurrently or at different times.

### Features
* Real-time communication
* Multple Q&A Rooms
* Locked Q&A outside of Speaker date / time
* Voting system
* Admin System (Delete / Answered / Ban)
* Single Sign On using Google and Twitter
* Anonymous questions

## Getting Started

InQuill was built using NextJS and utilizes a number of web services which are easily accessible. In order to run InQuill, you will need Github, Vercel, and Supabase. 

You may fork this repo for ease of setting up. Then you must deploy your fork via Vercel. Vercel makes deployment easy and InQuill makes use of Vercel's serverless functions. You may also add your own custom domain name to Vercel if you plan on hosting this Q&A publically. 

Supabase is used as both a database and for handling authentication. You will need to spin up a new Supabase project and create the necessary tables. You may import these tables via the SQL file (`db-setup.sql`) included. Be sure to also add your Supabase project URL, Public, and Private keys to your Vercel Environment variables as `SUPABASE_URL`, `SUPABASE_PUBLIC_KEY`, `SUPABASE_KEY`, respectively. 

Finally, if you wish to setup Google and Twitter authentication, I highly recommend following the Supabase guides here:

* [Google Auth Setup](https://supabase.com/docs/guides/auth/auth-google)
* [Twitter Auth Setup](https://supabase.com/docs/guides/auth/auth-twitter)

## License
MIT