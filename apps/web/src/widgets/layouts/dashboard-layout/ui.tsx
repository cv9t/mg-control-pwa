import { ReactNode } from 'react';

import { Container, Group, Header as MantineHeader, Highlight } from '@mantine/core';

import { $$sessionModel } from '@mg-control/web/entities/session';
import { SignOutButton, signOutButtonFactory } from '@mg-control/web/features/auth/sign-out';
import { View } from '@mg-control/web/shared/types';

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps): View {
  return (
    <div>
      <DashboardHeader />
      <Container mt={100}>{children}</Container>
    </div>
  );
}

const $$signOutButtonModel = signOutButtonFactory.createModel({
  signOutFx: $$sessionModel.signOutFx,
});

export function DashboardHeader(): View {
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
        <Group>
          <SignOutButton $$model={$$signOutButtonModel} />
        </Group>
      </Container>
    </MantineHeader>
  );
}

function Logo(): View {
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
