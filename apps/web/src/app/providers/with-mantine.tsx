import { ComponentType } from 'react';

import { MantineProvider } from '@mantine/core';

export function withMantine(WrappedComponent: ComponentType) {
  return function wrapper() {
    return (
      <MantineProvider
        theme={{
          fontFamily: 'Inter, sans-serif',
          components: {
            Button: {
              defaultProps: {
                fullWidth: true,
                radius: 'md',
                size: 'md',
              },
            },
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <WrappedComponent />
      </MantineProvider>
    );
  };
}
