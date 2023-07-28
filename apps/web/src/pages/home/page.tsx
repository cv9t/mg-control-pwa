import { Button, Highlight, Image, Text } from '@mantine/core';
import { Link } from 'atomic-router-react';

import { Nullable } from '@mg-control/shared/types';
import { env } from '@mg-control/web/shared/config';
import { dom } from '@mg-control/web/shared/lib';
import { routes } from '@mg-control/web/shared/routing';

import heroUrl from './assets/hero.svg?url';

export function HomePage(): Nullable<JSX.Element> {
  dom.useTitle(`${env.SHORT_APP_NAME} | Home`);

  return (
    <div>
      <Highlight
        align="center"
        highlight={[env.FULL_APP_NAME.split(' ')?.[0] ?? '']}
        highlightStyles={(theme) => ({
          backgroundImage: theme.fn.linearGradient(45, theme.colors.cyan[5], theme.colors.indigo[5]),
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        })}
        sx={(theme) => ({
          ...theme.headings.sizes.h1,
          fontWeight: 'bold',
        })}
      >
        {env.FULL_APP_NAME}
      </Highlight>
      <Text mt="xs" c="dimmed" align="center">
        Keep your microgreens in comfort
      </Text>
      <Image src={heroUrl} />
      <Button mt="xl" component={Link} to={routes.auth.signIn}>
        Sign In
      </Button>
      <Button mt="xs" variant="white" component={Link} to={routes.auth.activation}>
        Activate account
      </Button>
    </div>
  );
}
