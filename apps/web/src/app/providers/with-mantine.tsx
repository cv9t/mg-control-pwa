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
                radius: 'md',
              },
            },
            TextInput: {
              defaultProps: {
                radius: 'md',
              },
            },
            PasswordInput: {
              defaultProps: {
                radius: 'md',
              },
            },
            Paper: {
              defaultProps: {
                radius: 'md',
                withBorder: true,
                shadow: 'md',
              },
            },
            Alert: {
              defaultProps: {
                radius: 'md',
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
