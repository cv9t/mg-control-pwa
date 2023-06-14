import { useEffect } from 'react';

import { useUnit } from 'effector-react';

import { Anchor, Box, Button, Card, CardSection, Space, Text, Title } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { Link } from 'atomic-router-react';

import { ActivationForm } from '@mg-control/web/features/auth/activation';
import { routes } from '@mg-control/web/shared/routing';
import { View } from '@mg-control/web/shared/types';

import { $$activationPageModel } from './model';

export function ActivationPage(): View {
  const { mounted, isActivationCompleted } = useUnit({
    mounted: $$activationPageModel.mounted,
    isActivationCompleted: $$activationPageModel.$isActivationCompleted,
  });

  useEffect(() => {
    mounted();
  }, [mounted]);

  if (isActivationCompleted) {
    return <SuccessView />;
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
      <ActivationForm $$model={$$activationPageModel.$$activationFormModel} />
    </Box>
  );
}

function SuccessView(): View {
  return (
    <Card withBorder shadow="md" w={280}>
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
        <IconCircleCheck size="3rem" />
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
