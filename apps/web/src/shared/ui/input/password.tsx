import { PasswordInput as MantinePasswordInput, PasswordInputProps } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';

import { Nullable } from '@mg-control/shared/types';

export function PasswordInput(props: PasswordInputProps): Nullable<JSX.Element> {
  return (
    <MantinePasswordInput
      label="Password"
      placeholder="Enter password"
      icon={<IconLock size="1.3rem" />}
      required
      {...props}
    />
  );
}
