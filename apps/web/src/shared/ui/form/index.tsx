import { FormEvent, ReactNode } from 'react';

import { Container, Paper } from '@mantine/core';

import { View } from '@mg-control/web/shared/types';

type FormProps = {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function Form({ children, onSubmit }: FormProps): View {
  return (
    <Container size="xs" p={0}>
      <Paper p={30} component="form" onSubmit={onSubmit}>
        {children}
      </Paper>
    </Container>
  );
}
