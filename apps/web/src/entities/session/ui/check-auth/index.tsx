import { ReactNode } from "react";

import { Loader } from "@/shared/ui";

import { sessionModel } from "../..";

type CheckAuthProps = {
  children: ReactNode;
};

const CheckAuth = ({ children }: CheckAuthProps) => {
  const { authChecked } = sessionModel.useAuthCheck();

  if (!authChecked) {
    return <Loader className="overlay" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
