import Routing from "@/pages";
import { env } from "@/shared/config";

import { withHocs } from "./hocs";

import "./index.scss";

const App = () => {
  console.log(env.BACKEND_URL);

  return <Routing />;
};

export default withHocs(App);
