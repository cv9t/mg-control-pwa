import { CSSProperties } from 'react';

import { Layout } from 'antd';

import { Children, View } from '@mg-control/web/shared/types';

type CenterProps = {
  children: Children;
  style?: CSSProperties;
};

export function Center({ children, style }: CenterProps): View {
  return (
    <Layout.Content
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
    >
      {children}
    </Layout.Content>
  );
}
