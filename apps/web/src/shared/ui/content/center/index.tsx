import { ReactNode } from "react";
import { Layout } from "antd";
import clsx from "clsx";

import styles from "./styles.module.scss";

type CenterProps = {
  className?: string;
  children: ReactNode;
};

const Center = ({ className, children }: CenterProps) => (
  <Layout.Content className={clsx(styles.root, className)}>{children}</Layout.Content>
);

export default Center;
