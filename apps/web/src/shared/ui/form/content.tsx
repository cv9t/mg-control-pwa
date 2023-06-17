import { ReactNode } from 'react';

import { Container, Paper } from '@mantine/core';

import { Nullable } from '@mg-control/shared/types';

type FormContentProps = {
  children: ReactNode;
};

export function FormContent({ children }: FormContentProps): Nullable<JSX.Element> {
  return (
    <Container p={0}>
      <Paper p={30}>{children}</Paper>
    </Container>
  );
}
