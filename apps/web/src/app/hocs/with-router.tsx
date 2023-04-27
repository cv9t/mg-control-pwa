import { ReactNode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { Loader } from "@/shared/ui";

const withRouter = (WrapperComponent: () => ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Loader.Spin className="overlay" />}>{WrapperComponent()}</Suspense>
    </BrowserRouter>
  );

export default withRouter;
