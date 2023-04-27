import { Progress, ProgressProps, Typography } from "antd";

import styles from "./styles.module.scss";

export type RoundProps = {
  value: number;
  format?: (value: number) => string;
  maxValue?: number;
};

const config: Partial<ProgressProps> = {
  type: "dashboard",
  strokeLinecap: "butt",
  strokeColor: "var(--color-primary)",
};

const Round = ({ value, maxValue = 100, format }: RoundProps) => (
  <Progress
    {...config}
    percent={(value / maxValue) * 100}
    format={() => (
      <Typography.Title className={styles.title} level={3}>
        {format?.(value) ?? value}
      </Typography.Title>
    )}
  />
);

export default Round;
