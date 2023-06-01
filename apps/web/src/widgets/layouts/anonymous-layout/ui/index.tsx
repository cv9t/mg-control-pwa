import { ReactNode } from "react";

import { Layout } from "antd";

import { Content } from "@/shared/ui";

import styles from "./styles.module.scss";

type AnonymousLayoutProps = {
  children: ReactNode;
};

export const AnonymousLayout = ({ children }: AnonymousLayoutProps): JSX.Element | null => (
  <Layout className={styles.root}>
    <Content.Center className={styles.rootContent}>{children}</Content.Center>
  </Layout>
);
