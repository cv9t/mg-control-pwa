import { Button, Highlight, Image, Title } from '@mantine/core';
import { Link } from 'atomic-router-react';

import { APP_NAME } from '@mg-control/web/shared/config';
import { useTitle } from '@mg-control/web/shared/lib';
import { routes } from '@mg-control/web/shared/routing';
import { View } from '@mg-control/web/shared/types';

import heroUrl from './assets/hero.svg?url';

export function HomePage(): View {
  useTitle(`${APP_NAME} | Home`);

  return (
    <>
      <Title align="center">
        <Highlight
          highlight={['MicroGreen']}
          highlightStyles={(theme) => ({
            backgroundImage: theme.fn.linearGradient(
              45,
              theme.colors.cyan[5],
              theme.colors.indigo[5],
            ),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}
          component="span"
        >
          MicroGreen Control
        </Highlight>
      </Title>
      <Title order={5} c="dimmed" mt="xs">
        Keep your microgreens in comfort
      </Title>
      <Image src={heroUrl} />
      <Button mt="xl" component={Link} to={routes.auth.signIn}>
        Sign In
      </Button>
      <Button variant="white" mt="xs" component={Link} to={routes.auth.signIn}>
        Activate account
      </Button>
    </>
  );
}
