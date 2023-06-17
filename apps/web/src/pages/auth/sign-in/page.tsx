import { Anchor, Box, Space, Text, Title } from '@mantine/core';
import { Link } from 'atomic-router-react';

import { Nullable } from '@mg-control/shared/types';
import { SignIn } from '@mg-control/web/features/auth/sign-in';
import { env } from '@mg-control/web/shared/config';
import { dom } from '@mg-control/web/shared/lib';
import { routes } from '@mg-control/web/shared/routing';

export function SignInPage(): Nullable<JSX.Element> {
  dom.useTitle(`${env.APP_NAME} | Sign In`);

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
      <SignIn.Form />
    </Box>
  );
}
