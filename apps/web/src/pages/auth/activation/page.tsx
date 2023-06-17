import { useEffect } from 'react';

import { useUnit } from 'effector-react';

import { Anchor, Box, Button, Card, CardSection, Space, Text, Title } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { Link } from 'atomic-router-react';

import { Nullable } from '@mg-control/shared/types';
import { Activation } from '@mg-control/web/features/auth/activation';
import { routes } from '@mg-control/web/shared/routing';

import * as model from './model';

export function ActivationPage(): Nullable<JSX.Element> {
  const { mounted, isActivationCompleted } = useUnit({
    mounted: model.mounted,
    isActivationCompleted: model.$isActivationCompleted,
  });

  useEffect(() => {
    mounted();
  }, [mounted]);

  if (isActivationCompleted) {
    return <SuccessCard />;
  }

  return (
    <Box w="100%">
      <Title align="center">Activation</Title>
      <Text mt="xs" c="dimmed" align="center">
        Already have an activated account?{' '}
        <Anchor component={Link} to={routes.auth.signIn}>
          Sign In
        </Anchor>
      </Text>
      <Space h={30} />
      <Activation.Form model={model.activationFormModel} />
    </Box>
  );
}

function SuccessCard(): Nullable<JSX.Element> {
  return (
    <Card withBorder shadow="md" w={300}>
      <CardSection
        sx={{
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
          backgroundColor: 'green',
        }}
      >
        <IconCircleCheck size="3.25rem" />
        <Title order={5}>Success!</Title>
      </CardSection>
      <Text mt="md" c="dimmed">
        Congratulations, your account has been successfully activated.
      </Text>
      <Button mt="md" variant="light" component={Link} to={routes.auth.signIn}>
        Sign In
      </Button>
    </Card>
  );
}
