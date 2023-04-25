import { Layout } from "antd";

import { LogoutButton } from "@/features/auth";

const Header = () => (
  <Layout.Header style={{ backgroundColor: "#1890FF" }}>
    <div className="ant-layout-content">
      <LogoutButton />
    </div>
  </Layout.Header>
);

export default Header;
