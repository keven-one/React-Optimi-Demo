// import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";


// import App from "./App1";
// import App from "./App2";
// import App from "./App3";
// import App from "./App4";
// import App from "./App5";
import App from "./App6";


const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(rootElement);

root.render(<App />);
