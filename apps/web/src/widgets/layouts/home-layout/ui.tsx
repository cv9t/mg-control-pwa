import { ReactNode } from 'react';

import { Container } from '@mantine/core';

import { Nullable } from '@mg-control/shared/types';

type HomeLayoutProps = {
  children: ReactNode;
};

export function HomeLayout({ children }: HomeLayoutProps): Nullable<JSX.Element> {
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
