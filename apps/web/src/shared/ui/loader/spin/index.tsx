import { Spin as AntdSpin, SpinProps } from "antd";

const Spin = (props: SpinProps) => <AntdSpin delay={300} size="large" {...props} />;

export default Spin;
