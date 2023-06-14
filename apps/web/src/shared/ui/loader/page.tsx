import { Box, Loader } from '@mantine/core';

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Loader variant="dots" />
    </Box>
  );
}
