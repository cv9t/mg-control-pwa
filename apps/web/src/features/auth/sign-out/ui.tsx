import { useUnit } from 'effector-react';

import { ActionIcon } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { View } from '@mg-control/web/shared/types';

import { SignOutButtonModel } from './model';

type SignOutButtonProps = {
  $$model: SignOutButtonModel;
};

export function SignOutButton({ $$model }: SignOutButtonProps): View {
  const { clicked, isLoading } = useUnit({
    clicked: $$model.clicked,
    isLoading: $$model.$isLoading,
  });

  return (
    <ActionIcon w={50} variant="light" color="red" size="lg" loading={isLoading} onClick={clicked}>
      <IconLogout size="1.3rem" />
    </ActionIcon>
  );
}
