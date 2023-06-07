import { Button, Space, Typography } from 'antd';

import { dom } from '@mg-control/web/shared/lib';
import { View } from '@mg-control/web/shared/types';

export function HomePageView(): View {
  dom.useTitle('MG Control | Home');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <Typography.Title level={4}>Easily grow microgreens at home 🌱</Typography.Title>
      <Typography.Text
        style={{
          display: 'block',
          marginBottom: 8,
        }}
      >
        The <b>MicroGreen Box</b> is an automated device that allows you to quickly grow any kind of
        microgreen!
      </Typography.Text>
      <Space>
        <Button type="primary">Activate device</Button>
        <Button>Sign In</Button>
      </Space>
    </div>
  );
}
