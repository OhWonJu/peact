import { render } from "@core/peact";

import "./style.css";

import App from "./App";

const rootElement = <App />;
const container = document.getElementById("root");

container && render(rootElement, container);

// console.log(JSON.stringify(rootElement, null, 2));
