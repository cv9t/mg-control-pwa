import { CheckAuth } from "@/entities/session";
import Routing from "@/pages";

import { withHocs } from "./hocs";

import "./index.scss";

const App = () => (
  <CheckAuth>
    <Routing />
  </CheckAuth>
);

export default withHocs(App);
