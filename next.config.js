/** @type {import('next').NextConfig} */

const env = {
  "APP_LOCALE": "en",
  "APP_APPLE_TOUCH_ICON": "/favicon128.png",
  "APP_FAVICON_16x16": "/favicon32.png",
  "APP_FAVICON_32x32": "/favicon16.png",

  "APP_TITLE": "IGDA - Live event question & answers",
  "APP_DESCRIPTION": "IGDA Q&A is a web app for live Q&A events and speaker sessions.",
  "APP_TYPE": "website",
  "APP_URL": "https://qanda.igda.fi",
  "APP_IMAGE": "https://qanda.igda.fi/og-image.png",
  "APP_IMAGE_TYPE": "image/png",
  "APP_IMAGE_WIDTH": "1200",
  "APP_IMAGE_HEIGHT": "630",
  "APP_SITE_NAME": "IGDA Q&A",
  "API_URL": "https://qanda.igda.fi/api",
}

const nextConfig = {
  env,
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig
