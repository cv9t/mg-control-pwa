import { Box, Flex, Loader } from '@mantine/core';

import { View } from '@mg-control/web/shared/types';

export function PageLoader(): View {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Flex w="100%" h="100%" align="center" justify="center">
        <Loader variant="dots" />
      </Flex>
    </Box>
  );
}
