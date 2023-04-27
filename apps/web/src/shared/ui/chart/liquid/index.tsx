import LiquidFillGauge from "react-liquid-gauge";

type LiquidProps = {
  percent: number;
};

const Liquid = ({ percent }: LiquidProps) => (
  <LiquidFillGauge
    width={240}
    height={240}
    value={percent}
    percent="%"
    riseAnimation
    waveAnimation
    waveFrequency={2}
    waveAmplitude={1}
    innerRadius={0.97}
    outerRadius={1}
    circleStyle={{
      fill: "#108ee9",
    }}
    waveStyle={{
      fill: "#108ee9",
    }}
    style={{ margin: "0 auto" }}
  />
);

export default Liquid;
