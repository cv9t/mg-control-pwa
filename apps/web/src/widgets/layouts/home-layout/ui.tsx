import { ReactNode } from 'react';

import { Container } from '@mantine/core';

import { View } from '@mg-control/web/shared/types';

export type HomeLayoutProps = {
  children: ReactNode;
};

export function HomeLayout({ children }: HomeLayoutProps): View {
  return (
    <Container
      h="100svh"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Container>
  );
}
