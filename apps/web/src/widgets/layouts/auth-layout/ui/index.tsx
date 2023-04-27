import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { AuthGuard } from "@/entities/session";

import Header from "./header";

import styles from "./styles.module.scss";

const AuthLayout = () => (
  <AuthGuard>
    <Layout className={styles.root}>
      <Header />
      <Layout.Content className={styles.rootContent}>
        <Outlet />
      </Layout.Content>
    </Layout>
  </AuthGuard>
);

export default AuthLayout;
