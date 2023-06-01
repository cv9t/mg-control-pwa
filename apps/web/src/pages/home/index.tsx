import { createRouteView } from "atomic-router-react";

import { Loader } from "@/shared/ui";
import { AnonymousLayout } from "@/widgets/layouts";

import { currentRoute } from "./model";
import { HomePage } from "./ui";

export const HomeRoute = {
  view: createRouteView({ route: currentRoute, view: HomePage, otherwise: () => <Loader.Spin className="overlay" /> }),
  route: currentRoute,
  layout: AnonymousLayout,
};
