import { Navigate, Outlet, useLocation } from "react-router-dom";

import { sessionModel } from "@/entities/session";
import { routes } from "@/shared/config";

const GuestGuard = () => {
  const location = useLocation();

  const { isAuth } = sessionModel.useSession();

  if (isAuth) {
    return <Navigate to={routes.DASHBOARD} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default GuestGuard;
