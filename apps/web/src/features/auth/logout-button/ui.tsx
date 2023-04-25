import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import { routes } from "@/shared/config";

import * as logoutButtonModel from "./model";

const LogoutButton = () => {
  const navigate = useNavigate();

  const { isLoading } = logoutButtonModel.useLogoutButton();

  return (
    <Button loading={isLoading} onClick={() => logoutButtonModel.logoutFx().then(() => navigate(routes.LOGIN))}>
      Выйти
    </Button>
  );
};

export default LogoutButton;
