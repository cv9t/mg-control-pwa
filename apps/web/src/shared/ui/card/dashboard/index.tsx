import { Card } from "antd";

import { Progress } from "../..";

export type MainIndicator = Progress.RoundProps;

export type Indicator = Progress.LinearProps;

type DashboardProps = {
  title: string;
  mainIndicator: MainIndicator;
  indicators: Indicator[];
};

const Dashboard = ({ title, mainIndicator, indicators }: DashboardProps) => (
  <Card title={title} bordered={false}>
    <div style={{ display: "flex", gap: 32 }}>
      <Progress.Round {...mainIndicator} />
      <div style={{ flex: 1 }}>
        {indicators.map((indicator, index) => (
          <Progress.Linear key={index} {...indicator} />
        ))}
      </div>
    </div>
  </Card>
);

export default Dashboard;
