import { Spin as AntdSpin, SpinProps } from "antd";

const config: Partial<SpinProps> = {
  delay: 300,
  size: "large",
};

const Spin = (props: SpinProps) => <AntdSpin {...config} {...props} />;

export default Spin;
