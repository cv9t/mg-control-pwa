import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { AuthGuard } from "@/entities/session";

import Header from "./header";

const AuthLayout = () => (
  <AuthGuard>
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout.Content style={{ position: "relative", paddingTop: 16, paddingBottom: 16 }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  </AuthGuard>
);

export default AuthLayout;
