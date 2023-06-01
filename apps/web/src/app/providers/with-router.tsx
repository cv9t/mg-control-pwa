import { ComponentType } from "react";

import { RouterProvider } from "atomic-router-react";

import { router } from "@/shared/routing";

export const withRouter = (WrappedComponent: ComponentType) => () =>
  (
    <RouterProvider router={router}>
      <WrappedComponent />
    </RouterProvider>
  );
