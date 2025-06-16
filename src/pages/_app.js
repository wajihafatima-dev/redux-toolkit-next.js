import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}
