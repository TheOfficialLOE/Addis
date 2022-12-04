import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store/store";
import { SocketContext, socket } from "../util/SocketContext";

function MyApp({ Component, pageProps }: AppProps) {
  return <SocketContext.Provider value={socket}>
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
  </SocketContext.Provider>

}

export default MyApp
