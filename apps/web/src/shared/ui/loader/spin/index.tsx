import { Spin as AntdSpin, SpinProps } from "antd";

const config: Partial<SpinProps> = {
  delay: 300,
  size: "large",
};

export const Spin = (props: SpinProps): JSX.Element | null => <AntdSpin {...config} {...props} />;
