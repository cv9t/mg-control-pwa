import { useUnit } from 'effector-react';

import { ActionIcon } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { Nullable } from '@mg-control/shared/types';

import * as model from './model';

export function SignOutButton(): Nullable<JSX.Element> {
  const { isPending, signOutPressed } = useUnit({
    signOutPressed: model.signOutPressed,
    isPending: model.$isPending,
  });

  return (
    <ActionIcon
      w={50}
      variant="light"
      color="red"
      size="lg"
      loading={isPending}
      onClick={signOutPressed}
    >
      <IconLogout size="1.3rem" />
    </ActionIcon>
  );
}
