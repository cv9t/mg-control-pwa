import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { routes } from "@/shared/config";

import * as logoutButtonModel from "./model";

export const useLogoutButton = () => {
  const store = logoutButtonModel.useStore();

  const navigate = useNavigate();

  const logout = useCallback(() => logoutButtonModel.logoutFx().then(() => navigate(routes.LOGIN)), []);

  return { ...store, logout };
};

const LogoutButton = () => {
  const { isLoading, logout } = useLogoutButton();

  return <Button size="large" type="primary" icon={<LogoutOutlined />} loading={isLoading} onClick={logout} />;
};

export default LogoutButton;
