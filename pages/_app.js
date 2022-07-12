import '../styles/globals.css'
import '../styles/bootstrap.min.css'
import { createContext, useState } from "react";

export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
    const [image, setImage] = useState('');

    return (
        <AppContext.Provider value={{image, setImage}}>
            <Component {...pageProps} />
        </AppContext.Provider>
    )
}

export default MyApp
