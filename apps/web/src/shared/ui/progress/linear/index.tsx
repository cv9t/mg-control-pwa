import { Progress, Typography } from "antd";

export type LinearProps = {
  value: number;
  label: string;
  format?: (value: number) => string;
  maxValue?: number;
};

const Linear = ({ value, label, format, maxValue = 100 }: LinearProps) => (
  <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
    <Progress
      percent={(value / maxValue) * 100}
      strokeLinecap="butt"
      showInfo={false}
      strokeColor="var(--color-primary)"
      style={{ margin: 0 }}
    />
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Typography.Text>{label}</Typography.Text>
      <Typography.Text>{format?.(value) ?? value}</Typography.Text>
    </div>
  </div>
);

export default Linear;
