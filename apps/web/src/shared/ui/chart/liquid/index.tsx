import LiquidFillGauge from "react-liquid-gauge";

type LiquidProps = {
  percent: number;
  width: number;
  height: number;
};

const config = {
  percent: "%",
  riseAnimation: true,
  waveAnimation: true,
  waveFrequency: 2,
  waveAmplitude: 2,
  innerRadius: 0.95,
  outerRadius: 1,
  circleStyle: {
    fill: "var(--color-primary)",
  },
  waveStyle: {
    fill: "#108ee9",
  },
  style: {
    margin: "0 auto",
  },
};

const Liquid = ({ percent, width, height }: LiquidProps) => <LiquidFillGauge {...config} value={percent} width={width} height={height} />;

export default Liquid;
