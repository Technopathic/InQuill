import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
    render() {
        return (
            <Html lang={process.env.APP_LOCALE}>
                <Head>
                    <meta name="description" content={process.env.APP_DESCRIPTION} />

                    <link rel="apple-touch-icon" sizes="180x180" href={process.env.APP_APPLE_TOUCH_ICON} />
                    <link rel="icon" type="image/png" sizes="16x16" href={process.env.APP_FAVICON_16x16} />
                    <link rel="icon" type="image/png" sizes="32x32" href={process.env.APP_FAVICON_32x32} />

                    <meta name="og:title" property="og:title" content={process.env.APP_TITLE} />
                    <meta name="og:site_name" property="og:site_name" content={process.env.APP_SITE_NAME} />
                    <meta name="og:locale" property="og:locale" content={process.env.APP_LOCALE} />
                    <meta name="og:type" property="og:type" content={process.env.APP_TYPE} />
                    <meta name="og:description" property="og:description" content={process.env.APP_DESCRIPTION} />
                    <meta name="og:url" property="og:url" content={process.env.APP_URL} />

                    <meta name="og:image:type" property="og:image:type" content={process.env.APP_IMAGE_TYPE} />
                    <meta name="og:image:width" property="og:image:width" content={process.env.APP_IMAGE_WIDTH} />
                    <meta name="og:image:height" property="og:image:height" content={process.env.APP_IMAGE_HEIGHT} />

                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=League+Gothic&display=swap" as="style" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=League+Gothic&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument