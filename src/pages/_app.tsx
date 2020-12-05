import { Provider } from "react-redux"
import configureStore from "store/configureStore"
import "styles/ring.scss"

export const reduxStore = configureStore()
const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
