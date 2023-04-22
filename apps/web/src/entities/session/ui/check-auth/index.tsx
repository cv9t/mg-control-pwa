import { ReactNode, useEffect, useState } from "react";
import { Spin } from "antd";

import { MG_CONTROL_ACCESS_TOKEN } from "@/shared/config";

import { sessionModel } from "../..";

type CheckAuthProps = {
  children: ReactNode;
};

const CheckAuth = ({ children }: CheckAuthProps) => {
  const [authChecked, setAuthChecked] = useState(() => !localStorage.getItem(MG_CONTROL_ACCESS_TOKEN));

  useEffect(() => {
    if (!authChecked) {
      sessionModel.checkAuthFx().finally(() => setAuthChecked(true));
    }
  }, []);

  if (!authChecked) {
    return <Spin delay={300} className="overlay" size="large" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
