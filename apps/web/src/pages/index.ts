import { createRoutesView } from "atomic-router-react";

import { HomeRoute } from "./home";

export const Pages = createRoutesView({
  routes: [HomeRoute],
});
