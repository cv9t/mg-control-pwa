import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";

import * as logoutButtonModel from "./model";

const LogoutButton = () => {
  const { isLoading, logout } = logoutButtonModel.useLogoutButton();

  return <Button size="large" type="primary" icon={<LogoutOutlined />} loading={isLoading} onClick={logout} />;
};

export default LogoutButton;
