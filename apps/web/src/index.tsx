import ReactDOM from "react-dom/client";

import { init } from "./shared/config";
import { App } from "./app";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

init.appStarted();
root.render(<App />);
