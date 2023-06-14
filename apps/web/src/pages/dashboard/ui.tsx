import { ActionIcon, Flex, Title } from '@mantine/core';
import { IconPower } from '@tabler/icons-react';

import { APP_NAME } from '@mg-control/web/shared/config';
import { useTitle } from '@mg-control/web/shared/lib';
import { View } from '@mg-control/web/shared/types';

export function DashboardPage(): View {
  useTitle(`${APP_NAME} | Dashboard`);

  return (
    <Flex direction="column" align="center">
      <Title order={4} mb="sm">
        Light Control
      </Title>
      <LightButton />
    </Flex>
  );
}

function LightButton(): View {
  return (
    <ActionIcon color="blue" w={120} h={120} radius="50%">
      <IconPower size="3rem" />
    </ActionIcon>
  );
}
