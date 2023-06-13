import { ReactNode } from 'react';

import { Container, Flex } from '@mantine/core';

import { View } from '@mg-control/web/shared/types';

export type HomeLayoutProps = {
  children: ReactNode;
};

export function HomeLayout({ children }: HomeLayoutProps): View {
  return (
    <Container size="xs" h="100svh">
      <Flex h="100%" direction="column" align="center" justify="center">
        {children}
      </Flex>
    </Container>
  );
}
