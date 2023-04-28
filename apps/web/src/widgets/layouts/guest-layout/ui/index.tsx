import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { Content } from "@/shared/ui";

import styles from "./styles.module.scss";

const GuestLayout = () => (
  <Layout className={styles.root}>
    <Content.Center className={styles.rootContent}>
      <Outlet />
    </Content.Center>
  </Layout>
);

export default GuestLayout;
