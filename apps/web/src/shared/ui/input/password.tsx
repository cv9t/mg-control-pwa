import { PasswordInput as MantinePasswordInput, PasswordInputProps } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';

import { View } from '@mg-control/web/shared/types';

export function PasswordInput(props: PasswordInputProps): View {
  return (
    <MantinePasswordInput
      label="Password"
      placeholder="Enter password"
      icon={<IconLock size="1rem" />}
      required
      {...props}
    />
  );
}
