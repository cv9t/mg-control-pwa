import { Spin, SpinProps } from "antd";

type LoaderProps = SpinProps;

const Loader = (props: LoaderProps) => <Spin delay={300} size="large" {...props} />;

export default Loader;
