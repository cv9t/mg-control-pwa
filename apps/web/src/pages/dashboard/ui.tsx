import { ReactNode, useEffect } from 'react';

import { useUnit } from 'effector-react';

import {
  Card,
  CardSection,
  Flex,
  Grid,
  Group,
  LoadingOverlay,
  SimpleGrid,
  Switch,
  Text,
  Title,
} from '@mantine/core';

import { APP_NAME } from '@mg-control/web/shared/config';
import { useTitle } from '@mg-control/web/shared/lib';
import { View } from '@mg-control/web/shared/types';

import { $$dashboardPageModel } from './model';

export function DashboardPage(): View {
  useTitle(`${APP_NAME} | Dashboard`);

  const {
    unmounted,
    isDeviceConnectionFailed,
    toggleLightClicked,
    deviceData,
    isLightStateLoading,
  } = useUnit({
    unmounted: $$dashboardPageModel.unmounted,
    isDeviceConnectionFailed: $$dashboardPageModel.$isDeviceConnectionFailed,
    toggleLightClicked: $$dashboardPageModel.toggleLightClicked,
    deviceData: $$dashboardPageModel.$deviceData,
    isLightStateLoading: $$dashboardPageModel.$isLightStateLoading,
  });

  useEffect(
    () => () => {
      unmounted();
    },
    [unmounted],
  );

  if (isDeviceConnectionFailed) {
    return <div>Error View</div>;
  }

  return (
    <Flex direction="column">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
        <Grid gutter="md">
          <Grid.Col span={6}>
            <DashboardCard title="Light">
              <Switch
                checked={deviceData?.isLightOn}
                size="xl"
                onLabel="ON"
                offLabel="OFF"
                onClick={toggleLightClicked}
              />
              <LoadingOverlay visible={isLightStateLoading} />
            </DashboardCard>
          </Grid.Col>

          <Grid.Col span={6}>
            <DashboardCard title="Air">
              <Group>
                <Text c="dimmed" weight={500}>
                  Temp:
                </Text>
                <Title c="blue" order={4}>
                  {deviceData?.air.temp}°
                </Title>
              </Group>
              <Group>
                <Text c="dimmed" weight={500}>
                  Humidity:
                </Text>
                <Title c="blue" order={4}>
                  {deviceData?.air.humidity}%
                </Title>
              </Group>
            </DashboardCard>
          </Grid.Col>

          <Grid.Col>
            <DashboardCard title="Soil">
              <Group>
                <Text c="dimmed" weight={500}>
                  Condition:
                </Text>
                <Title c="blue" order={4}>
                  {deviceData?.soil.isDry ? 'Wet' : 'Dry'}
                </Title>
              </Group>
            </DashboardCard>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Flex>
  );
}

type DashboardCardProps = {
  title: string;
  children: ReactNode;
};

function DashboardCard({ title, children }: DashboardCardProps): View {
  return (
    <Card pos="relative" shadow="xs">
      <CardSection withBorder inheritPadding py="xs">
        <Title align="center" order={4}>
          {title}
        </Title>
      </CardSection>
      <CardSection
        inheritPadding
        mt="sm"
        pb="md"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {children}
      </CardSection>
    </Card>
  );
}
