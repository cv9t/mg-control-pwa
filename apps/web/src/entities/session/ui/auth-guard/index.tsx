import { Navigate, Outlet, useLocation } from "react-router-dom";

import { sessionModel } from "@/entities/session";
import { routes } from "@/shared/config";

const AuthGuard = () => {
  const location = useLocation();

  const { isAuth } = sessionModel.useSession();

  if (isAuth) {
    return <Outlet />;
  }

  return <Navigate to={routes.LOGIN} state={{ from: location }} replace />;
};

export default AuthGuard;
