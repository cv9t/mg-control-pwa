import { ComponentType } from 'react';

import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { Nullable } from '@mg-control/shared/types';

const theme: MantineThemeOverride = {
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
    Text: {
      defaultProps: {
        size: 'md',
      },
    },
  },
};

export function withMantine(WrappedComponent: ComponentType) {
  return function wrapper(): Nullable<JSX.Element> {
    return (
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <Notifications />
        <WrappedComponent />
      </MantineProvider>
    );
  };
}
