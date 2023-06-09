import { ReactNode } from 'react';

import { Layout } from 'antd';

import { View } from '@mg-control/web/shared/types';
import { Center } from '@mg-control/web/shared/ui';

type HomeLayoutProps = {
  children: ReactNode;
};

export function HomeLayout({ children }: HomeLayoutProps): View {
  return (
    <Layout className="site-layout">
      <Center style={{ minHeight: '100vh' }}>
        <>{children}</>
      </Center>
    </Layout>
  );
}
