import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { sessionModel } from "@/entities/session";
import { routes } from "@/shared/config";

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();

  const { isAuth } = sessionModel.useSessionStore();

  if (isAuth) {
    return <>{children}</>;
  }

  return <Navigate to={routes.LOGIN} state={{ from: location }} replace />;
};

export default AuthGuard;
