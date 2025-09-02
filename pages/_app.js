import { Provider } from "react-redux";
import { store } from "../store";

import { ToastContainer } from "react-toastify";

import 'vazir-font/dist/font-face.css';
import '../styles/globals.css';


function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} rtl={true} />
    </Provider>
  );
}

export default App;
