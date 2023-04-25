import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { AuthGuard } from "@/entities/session";

import Header from "./header";

const AuthLayout = () => (
  <AuthGuard>
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout.Content style={{ display: "flex", flex: 1, paddingTop: 16 }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  </AuthGuard>
);

export default AuthLayout;
