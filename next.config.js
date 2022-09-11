/** @type {import('next').NextConfig} */

const env = {
  "APP_LOCALE": "en",
  "APP_APPLE_TOUCH_ICON": "/favicon128.png",
  "APP_FAVICON_16x16": "/favicon32.png",
  "APP_FAVICON_32x32": "/favicon16.png",

  "APP_TITLE": "InQuill - Live event question & answers",
  "APP_DESCRIPTION": "InQuill is a web app for live QA events and speaker sessions.",
  "APP_TYPE": "website",
  "APP_URL": "https://inquill.live",
  "APP_IMAGE": "https://inquill.tv/og-image.png",
  "APP_IMAGE_TYPE": "image/png",
  "APP_IMAGE_WIDTH": "1200",
  "APP_IMAGE_HEIGHT": "630",
  "APP_SITE_NAME": "InQuill Live",
  "API_URL": "https://inquill.vercel.app/api"
}

const nextConfig = {
  env,
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
