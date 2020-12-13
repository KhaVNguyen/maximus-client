import { Provider } from "react-redux"
import type { AppProps /*, AppContext */ } from "next/app"
import configureStore from "store/configureStore"
import WebSocketProvider from "api/websocket"
import "styles/ring.scss"
import "styles/modal.scss"

export const reduxStore = configureStore()
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={reduxStore}>
      <WebSocketProvider>
        <Component {...pageProps} />
      </WebSocketProvider>
    </Provider>
  )
}

export default MyApp
