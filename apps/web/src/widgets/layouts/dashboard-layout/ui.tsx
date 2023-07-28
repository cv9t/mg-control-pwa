import { ReactNode } from 'react';

import { Container, Header as MantineHeader, Highlight } from '@mantine/core';

import { Nullable } from '@mg-control/shared/types';
import { SignOut } from '@mg-control/web/features/auth/sign-out';

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps): Nullable<JSX.Element> {
  return (
    <div>
      <Header />
      <Container mt={100}>{children}</Container>
    </div>
  );
}

function Header(): Nullable<JSX.Element> {
  return (
    <MantineHeader height={60} fixed>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Logo />
        <SignOut.Button />
      </Container>
    </MantineHeader>
  );
}

function Logo(): Nullable<JSX.Element> {
  return (
    <Highlight
      highlight={['MG | Control']}
      highlightStyles={(theme) => ({
        backgroundImage: theme.fn.linearGradient(45, theme.colors.cyan[5], theme.colors.indigo[5]),
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      })}
      sx={(theme) => ({
        ...theme.headings.sizes.h3,
        fontWeight: 'bold',
      })}
    >
      MG | Control
    </Highlight>
  );
}
