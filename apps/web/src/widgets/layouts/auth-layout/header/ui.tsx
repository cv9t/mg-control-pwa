import { GithubFilled } from "@ant-design/icons";
import { Button, Layout, Space, Typography } from "antd";

import { LogoutButton } from "@/features/auth";

const Header = () => (
  <Layout.Header style={{ display: "flex", backgroundColor: "transparent" }}>
    <div className="ant-layout-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography.Title level={4} style={{ marginBottom: 0 }}>
        MicroGreen | Control
      </Typography.Title>
      <Space size={32}>
        <Button type="text" size="large" icon={<GithubFilled />} />
        <LogoutButton />
      </Space>
    </div>
  </Layout.Header>
);

export default Header;
