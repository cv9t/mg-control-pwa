import { Alert, AlertProps, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import { View } from '@mg-control/web/shared/types';

type ErrorAlertProps = Omit<AlertProps, 'color' | 'icon' | 'children'> & {
  text: string;
};

export function ErrorAlert({ text, ...props }: ErrorAlertProps): View {
  return (
    <Alert icon={<IconAlertCircle size="1.3rem" />} color="red" {...props}>
      <Text c="red">{text}</Text>
    </Alert>
  );
}
