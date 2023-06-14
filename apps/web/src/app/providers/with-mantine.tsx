import { ComponentType } from 'react';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

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
              },
            },
            Paper: {
              defaultProps: {
                withBorder: true,
                shadow: 'md',
              },
            },
            Container: {
              defaultProps: {
                size: 'xs',
              },
            },
            Text: {
              defaultProps: {
                size: 'sm',
              },
            },
            Anchor: {
              defaultProps: {
                size: 'sm',
              },
            },
            ActionIcon: {
              defaultProps: {
                variant: 'filled',
              },
            },
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />
        <WrappedComponent />
      </MantineProvider>
    );
  };
}
