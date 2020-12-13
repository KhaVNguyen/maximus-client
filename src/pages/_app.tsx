import { Provider } from "react-redux"
import configureStore from "store/configureStore"
import WebSocketProvider from "api/websocket"
import "styles/ring.scss"
import "styles/modal.scss"

export const reduxStore = configureStore()
const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={reduxStore}>
      <WebSocketProvider>
        <Component {...pageProps} />
      </WebSocketProvider>
    </Provider>
  )
}

export default MyApp
