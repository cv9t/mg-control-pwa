import { GithubFilled } from "@ant-design/icons";
import { Button, Layout, Space, Typography } from "antd";
import clsx from "clsx";

import { LogoutButton } from "@/features/auth";

import styles from "./styles.module.scss";

const Header = () => (
  <Layout.Header className={styles.root}>
    <div className={clsx("ant-layout-content", styles.rootContent)}>
      <Typography.Title className={styles.title} level={4}>
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
