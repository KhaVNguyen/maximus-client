import { Provider } from "react-redux"
import WebSocketContext, { setupWebSocket } from "api/websocket"
import configureStore from "store/configureStore"
import "styles/ring.scss"

export const reduxStore = configureStore()
const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={reduxStore}>
      <WebSocketContext.Provider value={setupWebSocket()}>
        <Component {...pageProps} />
      </WebSocketContext.Provider>
    </Provider>
  )
}

export default MyApp
