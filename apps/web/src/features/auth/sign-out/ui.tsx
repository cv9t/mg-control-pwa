import { useUnit } from 'effector-react';

import { ActionIcon } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { View } from '@mg-control/web/shared/types';

import { SignOutButtonModel } from './model';

type SignOutButtonProps = {
  $$model: SignOutButtonModel;
};

export function SignOutButton({ $$model }: SignOutButtonProps): View {
  const { signOutClicked, isPending } = useUnit({
    signOutClicked: $$model.signOutClicked,
    isPending: $$model.$isPending,
  });

  return (
    <ActionIcon color="red" size="lg" loading={isPending} onClick={signOutClicked}>
      <IconLogout size="1.1rem" />
    </ActionIcon>
  );
}
