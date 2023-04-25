import { CSSProperties } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";

import * as logoutButtonModel from "./model";

type LogoutButtonProps = {
  style?: CSSProperties;
};

const LogoutButton = ({ style }: LogoutButtonProps) => {
  const { isLoading, logout } = logoutButtonModel.useLogoutButton();

  return <Button size="large" type="primary" icon={<LogoutOutlined />} style={style} loading={isLoading} onClick={logout} />;
};

export default LogoutButton;
