// components/head.js
import { PropsWithChildren, Fragment } from "react"
import NextHead from "next/head"
import GoogleFonts from "next-google-fonts"

type HeadProps = PropsWithChildren<{
  title: string
}>

function Head({ title, children }: HeadProps) {
  return (
    <Fragment>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" />
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        <title>{title}</title>

        {children}
      </NextHead>
    </Fragment>
  )
}

export default Head
