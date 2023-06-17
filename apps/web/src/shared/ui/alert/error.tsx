import { Alert, AlertProps, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import { Nullable } from '@mg-control/shared/types';

type ErrorAlertProps = Omit<AlertProps, 'color' | 'icon' | 'children'> & {
  text: string;
};

export function ErrorAlert({ text, ...props }: ErrorAlertProps): Nullable<JSX.Element> {
  return (
    <Alert icon={<IconAlertCircle size="1.3rem" />} color="red" {...props}>
      <Text c="red">{text}</Text>
    </Alert>
  );
}
