import { useUnit } from 'effector-react';

import { Button, Space, Typography } from 'antd';

import { useTitle } from '@mg-control/web/shared/lib';
import { View } from '@mg-control/web/shared/types';

import { $$homePageModel } from './model';

export function HomePage(): View {
  useTitle('MG Control | Home');

  const { goActivationPressed, goSignInPressed } = useUnit($$homePageModel);

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
        <Button type="primary" onClick={goActivationPressed}>
          Activate device
        </Button>
        <Button onClick={goSignInPressed}>Sign In</Button>
      </Space>
    </div>
  );
}
