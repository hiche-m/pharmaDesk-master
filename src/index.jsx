import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Views/App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './Redux/store.jsx';
import { ContextProvider } from './Context/ContextProvider.jsx';
import { AuthProvider } from './Context/AuthProvider.jsx';
import { pdfjs } from 'react-pdf';
import "leaflet/dist/leaflet.css" // Essential Leaflet CSS
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css" // For default marker icons
import "leaflet-defaulticon-compatibility" // For default marker icons

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();


const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <ContextProvider>
            <AuthProvider>
                <App />
            </AuthProvider>




        </ContextProvider>

    </Provider>
);