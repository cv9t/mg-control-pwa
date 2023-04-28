import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { deviceModel } from "@/entities/device";

import Header from "./header";

import styles from "./styles.module.scss";

const AuthLayout = () => {
  deviceModel.useDeviceConnect();

  return (
    <Layout className={styles.root}>
      <Header />
      <Layout.Content className={styles.rootContent}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default AuthLayout;
