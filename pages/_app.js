import { Footer } from "../src/components/commons/Footer";
import { GlobalStyle } from "../src/theme/GlobalStyle";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
