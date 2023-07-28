import { TextInput, TextInputProps } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

import { Nullable } from '@mg-control/shared/types';

export function EmailInput(props: TextInputProps): Nullable<JSX.Element> {
  return <TextInput label="Email" placeholder="Enter email" icon={<IconAt size="1.3rem" />} required {...props} />;
}
