import { QuizContextProvider } from "./components/QuizContext";
import { wrapper } from "./store/store";
import "/styles/globals.css";
import { Provider } from "react-redux";
export default function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <QuizContextProvider>
        <Component {...pageProps} />
      </QuizContextProvider >
    </Provider>
  );
}
