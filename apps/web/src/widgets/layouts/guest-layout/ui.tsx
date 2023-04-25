import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { GuestGuard } from "@/entities/session";
import { Content } from "@/shared/ui";

const GuestLayout = () => (
  <GuestGuard>
    <Layout>
      <Content.Center style={{ minHeight: "100vh" }}>
        <Outlet />
      </Content.Center>
    </Layout>
  </GuestGuard>
);

export default GuestLayout;
