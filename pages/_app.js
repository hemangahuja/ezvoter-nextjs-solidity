import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<>
    <link
    rel="stylesheet"
    href="https://cdn.rawgit.com/kimeiga/bahunya/css/bahunya-0.1.3.css"
  />
  <Component {...pageProps} />
  </>
  )
}

export default MyApp
