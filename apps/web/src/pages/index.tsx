import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { dom } from "@/shared/lib";

const HomePage = lazy(() => import("./home"));
const LoginPage = lazy(() => import("./login"));
const ActivatePage = lazy(() => import("./activate"));

const Routing = () => {
  dom.scrollToTop();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/activate" element={<ActivatePage />} />
    </Routes>
  );
};

export default Routing;
