import { ReactNode } from 'react';

import { Layout } from 'antd';

import { View } from '@mg-control/web/shared/types';
import { Content } from '@mg-control/web/shared/ui';

type HomeLayoutViewProps = {
  children: ReactNode;
};

export function HomeLayoutView({ children }: HomeLayoutViewProps): View {
  return (
    <Layout className="site-layout">
      <Content.Center style={{ minHeight: '100vh' }}>
        <>{children}</>
      </Content.Center>
    </Layout>
  );
}
