import { Spin as AntdSpin, SpinProps } from 'antd';

import { View } from '@mg-control/web/shared/types';

const config: Partial<SpinProps> = {
  delay: 300,
  size: 'large',
};

export function Spin(props: SpinProps): View {
  return <AntdSpin {...Object.assign(config, props)} />;
}
