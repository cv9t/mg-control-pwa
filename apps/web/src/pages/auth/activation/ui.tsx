import { useEffect } from 'react';

import { useUnit } from 'effector-react';

import { Anchor, Box, Button, Card, CardSection, Flex, Space, Text, Title } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { Link } from 'atomic-router-react';

import { ActivationForm } from '@mg-control/web/features/auth/activation-form';
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
      <Text c="dimmed" size="sm" align="center" mt="xs">
        Already have an activated account?{' '}
        <Anchor size="sm" component={Link} to={routes.auth.signIn}>
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
    <Card withBorder shadow="md" radius="md" w={280}>
      <CardSection>
        <Flex c="white" bg="green" h={120} align="center" justify="center" direction="column">
          <IconCircleCheck size="3.5rem" />
          <Title order={5}>Success!</Title>
        </Flex>
      </CardSection>
      <Text c="dimmed" size="sm" mt="md">
        Congratulations, your account has been successfully activated.
      </Text>
      <Button variant="light" mt="md" component={Link} to={routes.auth.signIn}>
        Sign In
      </Button>
    </Card>
  );
}
