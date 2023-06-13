import { TextInput, TextInputProps } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

import { View } from '@mg-control/web/shared/types';

export function EmailInput(props: TextInputProps): View {
  return (
    <TextInput
      label="Email"
      placeholder="Enter email"
      icon={<IconAt size="1rem" />}
      required
      {...props}
    />
  );
}
