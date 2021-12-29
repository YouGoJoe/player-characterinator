import "@styles/globals.css";
import AppContext, { contextValue } from "../context/AppContext";

function Application({ Component, pageProps }) {
  return (
    <AppContext.Provider value={contextValue}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default Application;
