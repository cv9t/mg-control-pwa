import { Box, Loader, Text } from '@mantine/core';

import { Nullable } from '@mg-control/shared/types';

type PageLoaderProps = {
  title?: string;
};

export function PageLoader({ title }: PageLoaderProps): Nullable<JSX.Element> {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      <Loader variant="dots" />
      {title && (
        <Text mt="md" c="blue">
          {title}
        </Text>
      )}
    </Box>
  );
}
