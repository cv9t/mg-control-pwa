import { CSSProperties, ReactNode } from "react";
import { Layout } from "antd";
import clsx from "clsx";

import styles from "./styles.module.scss";

type CenterProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const Center = ({ className, style, children }: CenterProps) => (
  <Layout.Content className={clsx(styles.root, className)} style={style}>
    {children}
  </Layout.Content>
);

export default Center;
