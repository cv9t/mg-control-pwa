import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { dom } from "@/shared/lib";

const HomePage = lazy(() => import("./home"));
const LoginPage = lazy(() => import("./auth/login"));

const Routing = () => {
  dom.scrollToTop();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Routing;
