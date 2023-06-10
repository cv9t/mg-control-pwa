import { useUnit } from 'effector-react';

import { Button, Highlight, Image, Title } from '@mantine/core';

import { useTitle } from '@mg-control/web/shared/lib';
import { View } from '@mg-control/web/shared/types';

import { $$homePageModel } from '../model';

import heroUrl from './assets/hero.svg?url';

export function HomePage(): View {
  useTitle('MG Control | Home');

  const { goActivationPressed, goSignInPressed } = useUnit($$homePageModel);

  return (
    <>
      <Title order={1} align="center" mb="sm">
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
      <Title order={5} color="gray.6">
        Keep your microgreens in comfort
      </Title>
      <Image src={heroUrl} mb={48} />
      <Button mb="xs" onClick={goSignInPressed}>
        Sign In
      </Button>
      <Button variant="white" onClick={goActivationPressed}>
        Activate Device
      </Button>
    </>
  );
}
