import { Anchor, Box, Space, Text, Title } from '@mantine/core';
import { Link } from 'atomic-router-react';

import { $$sessionModel } from '@mg-control/web/entities/session';
import { SignInForm, signInFormFactory } from '@mg-control/web/features/auth/sign-in';
import { APP_NAME } from '@mg-control/web/shared/config';
import { useTitle } from '@mg-control/web/shared/lib';
import { routes } from '@mg-control/web/shared/routing';
import { View } from '@mg-control/web/shared/types';

const $$signInFormModel = signInFormFactory.createModel({ signInFx: $$sessionModel.signInFx });

export function SignInPage(): View {
  useTitle(`${APP_NAME} | Sign In`);

  return (
    <Box w="100%">
      <Title align="center">Welcome back!</Title>
      <Text mt="xs" c="dimmed" align="center">
        Do not activate an account yet?{' '}
        <Anchor component={Link} to={routes.auth.activation}>
          Activate account
        </Anchor>
      </Text>
      <Space h={30} />
      <SignInForm $$model={$$signInFormModel} />
    </Box>
  );
}
