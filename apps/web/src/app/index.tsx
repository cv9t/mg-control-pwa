import { Pages } from "@/pages";

import { withProviders } from "./providers";

import "./index.scss";

export const App = withProviders(() => <Pages />);
