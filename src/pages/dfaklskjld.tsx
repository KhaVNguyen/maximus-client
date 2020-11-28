import { Provider } from "react-redux"

import configureStore from "store/configureStore"

export const reduxStore = configureStore()
const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
