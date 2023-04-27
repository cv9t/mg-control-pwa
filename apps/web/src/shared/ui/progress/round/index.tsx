import { Progress, Typography } from "antd";

export type RoundProps = {
  value: number;
  format?: (value: number) => string;
  maxValue?: number;
};

const Round = ({ value, maxValue = 100, format }: RoundProps) => (
  <Progress
    strokeLinecap="butt"
    type="dashboard"
    percent={(value / maxValue) * 100}
    strokeColor="var(--color-primary)"
    format={() => (
      <Typography.Title level={3} style={{ margin: 0 }}>
        {format?.(value) ?? value}
      </Typography.Title>
    )}
  />
);

export default Round;
