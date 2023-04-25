import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { sessionModel } from "@/entities/session";
import { routes } from "@/shared/config";

type GuestGuardProps = {
  children: ReactNode;
};

const GuestGuard = ({ children }: GuestGuardProps) => {
  const location = useLocation();

  const { isAuth } = sessionModel.useSession();

  if (isAuth) {
    return <Navigate to={routes.DASHBOARD} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default GuestGuard;
