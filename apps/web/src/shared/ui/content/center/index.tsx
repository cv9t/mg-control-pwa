import { ReactNode } from "react";

import { Layout } from "antd";
import clsx from "clsx";

import styles from "./styles.module.scss";

type CenterProps = {
  className?: string;
  children: ReactNode;
};

export const Center = ({ className, children }: CenterProps): JSX.Element | null => (
  <Layout.Content className={clsx(styles.root, className)}>{children}</Layout.Content>
);
