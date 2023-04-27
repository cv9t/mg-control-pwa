import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { GuestGuard } from "@/entities/session";
import { Content } from "@/shared/ui";

import styles from "./styles.module.scss";

const GuestLayout = () => (
  <GuestGuard>
    <Layout className={styles.root}>
      <Content.Center className={styles.rootContent}>
        <Outlet />
      </Content.Center>
    </Layout>
  </GuestGuard>
);

export default GuestLayout;
