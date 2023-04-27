import { Card } from "antd";

import { Progress } from "../..";

import styles from "./styles.module.scss";

export type MainIndicator = Progress.RoundProps;

export type Indicator = Progress.LinearProps;

type DashboardProps = {
  title: string;
  mainIndicator: MainIndicator;
  indicators: Indicator[];
};

const Dashboard = ({ title, mainIndicator, indicators }: DashboardProps) => (
  <Card className={styles.root} title={title} bordered={false}>
    <div className={styles.rootContent}>
      <Progress.Round {...mainIndicator} />
      <div className={styles.rootCol}>
        {indicators.map((indicator, index) => (
          <Progress.Linear key={index} {...indicator} />
        ))}
      </div>
    </div>
  </Card>
);

export default Dashboard;
