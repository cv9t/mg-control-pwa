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
                size: 'md',
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
            TextInput: {
              defaultProps: {
                size: 'md',
              },
            },
            PasswordInput: {
              defaultProps: {
                size: 'md',
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
