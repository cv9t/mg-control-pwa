import { ComponentType } from "react";

import { CheckAuth } from "@/entities/session";

const withAuth = (WrappedComponent: ComponentType) => () =>
  (
    <CheckAuth>
      <WrappedComponent />
    </CheckAuth>
  );

export default withAuth;
