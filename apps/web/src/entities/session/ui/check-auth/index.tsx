import { ReactNode, useEffect, useState } from "react";

import { sessionModel } from "@/entities/session";
import { helpers } from "@/shared/lib";
import { Loader } from "@/shared/ui";

type CheckAuthProps = {
  children: ReactNode;
};

const useAuthCheck = () => {
  const [authChecked, setAuthChecked] = useState(() => !helpers.getAccessToken());

  useEffect(() => {
    if (!authChecked) {
      sessionModel.checkAuthFx().finally(() => setAuthChecked(true));
    }
  }, []);

  return { authChecked } as const;
};

const CheckAuth = ({ children }: CheckAuthProps) => {
  const { authChecked } = useAuthCheck();

  if (!authChecked) {
    return <Loader.Spin className="overlay" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
