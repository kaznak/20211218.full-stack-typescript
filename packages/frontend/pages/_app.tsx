import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
