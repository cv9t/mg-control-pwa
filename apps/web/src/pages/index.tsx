import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthGuard, GuestGuard } from "@/entities/session";
import { routes } from "@/shared/config";
import { dom } from "@/shared/lib";

const HomePage = lazy(() => import("./home"));
const LoginPage = lazy(() => import("./auth/login"));
const ActivatePage = lazy(() => import("./auth/activate"));
const DashboardPage = lazy(() => import("./dashboard"));

const Routing = () => {
  dom.scrollToTop();

  return (
    <Routes>
      <Route path={routes.HOME} element={<GuestGuard />}>
        <Route index element={<HomePage />} />
        <Route path={routes.LOGIN} element={<LoginPage />} />
        <Route path={routes.ACTIVATE} element={<ActivatePage />} />
      </Route>

      <Route path={routes.DASHBOARD} element={<AuthGuard />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
