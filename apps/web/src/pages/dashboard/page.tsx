import { ReactNode, useEffect } from 'react';

import { useUnit } from 'effector-react';

import { Card, CardSection, Flex, Grid, Group, LoadingOverlay, SimpleGrid, Skeleton, Switch, Text, Title } from '@mantine/core';

import { Nullable } from '@mg-control/shared/types';
import { env } from '@mg-control/web/shared/config';
import { dom } from '@mg-control/web/shared/lib';

import * as model from './model';

export function DashboardPage(): Nullable<JSX.Element> {
  dom.useTitle(`${env.SHORT_APP_NAME} | Dashboard`);

  const { unmounted, toggleLightClicked, isDeviceConnectionFailed, isLightOnPending, isLightOn, airData, soilData } = useUnit({
    unmounted: model.unmounted,
    toggleLightClicked: model.toggleLightClicked,
    isDeviceConnectionFailed: model.$isDeviceConnectionFailed,
    isLightOnPending: model.$isLightOnPending,
    isLightOn: model.$isLightOn,
    airData: model.$airData,
    soilData: model.$soilData,
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
      <SimpleGrid spacing="md">
        <Grid gutter="md">
          <Grid.Col sm={6} xs={12}>
            <DashboardCard title="Light">
              <Switch checked={isLightOn} size="xl" onLabel="ON" offLabel="OFF" onClick={toggleLightClicked} />
              <LoadingOverlay visible={isLightOnPending} />
            </DashboardCard>
          </Grid.Col>
          <Grid.Col sm={6} xs={12}>
            <DashboardCard title="Air" isLoading={!airData}>
              <Group>
                <Text c="dimmed">Temp:</Text>
                <Text c="blue">{`${airData?.temp}°`}</Text>
              </Group>
              <Group>
                <Text c="dimmed">Humidity:</Text>
                <Text c="blue">{`${airData?.humidity}%`}</Text>
              </Group>
            </DashboardCard>
          </Grid.Col>
          <Grid.Col>
            <DashboardCard title="Soil" isLoading={!soilData}>
              <Group>
                <Text c="dimmed">Condition:</Text>
                <Text c="blue">{soilData?.isDry ? 'Dry' : 'Wet'}</Text>
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
  isLoading?: boolean;
};

function DashboardCard({ title, children, isLoading }: DashboardCardProps): Nullable<JSX.Element> {
  if (isLoading) {
    return <Skeleton height={120} />;
  }

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
