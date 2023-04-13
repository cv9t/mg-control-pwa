import { ReactNode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Spin } from "antd";

const withRouter = (WrapperComponent: () => ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Spin delay={300} className="overlay" size="large" />}>{WrapperComponent()}</Suspense>
    </BrowserRouter>
  );

export default withRouter;
