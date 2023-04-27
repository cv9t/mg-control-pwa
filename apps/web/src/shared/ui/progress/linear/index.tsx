import { Progress, ProgressProps, Typography } from "antd";

import styles from "./styles.module.scss";

export type LinearProps = {
  value: number;
  label: string;
  format?: (value: number) => string;
  maxValue?: number;
};

const config: Partial<ProgressProps> = {
  strokeLinecap: "butt",
  showInfo: false,
  strokeColor: "var(--color-primary)",
};

const Linear = ({ value, label, format, maxValue = 100 }: LinearProps) => (
  <div className={styles.root}>
    <Progress {...config} className={styles.progress} percent={(value / maxValue) * 100} />
    <div className={styles.rootContent}>
      <Typography.Text>{label}</Typography.Text>
      <Typography.Text>{format?.(value) ?? value}</Typography.Text>
    </div>
  </div>
);

export default Linear;
