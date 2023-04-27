import { ComponentType, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { Loader } from "@/shared/ui";

const withRouter = (WrappedComponent: ComponentType) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Loader.Spin className="overlay" />}>
        <WrappedComponent />
      </Suspense>
    </BrowserRouter>
  );

export default withRouter;
