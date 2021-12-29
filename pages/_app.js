import "@styles/globals.css";
import AppContext from "../context/AppContext";
import useAppContext from "../context/useAppContext";

function Application({ Component, pageProps }) {
  const [state, actions] = useAppContext();
  return (
    <AppContext.Provider value={{ ...state, actions }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default Application;
