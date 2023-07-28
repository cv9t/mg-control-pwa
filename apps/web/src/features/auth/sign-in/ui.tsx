import { useEffect } from 'react';

import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { Button, Stack } from '@mantine/core';

import { Nullable } from '@mg-control/shared/types';
import { Alert, Form, Input } from '@mg-control/web/shared/ui';

import * as model from './model';

export function SignInForm(): Nullable<JSX.Element> {
  const { submit, fields } = useForm(model.form);
  const { mounted, error, isPending } = useUnit({
    mounted: model.mounted,
    error: model.$error,
    isPending: model.$isPending,
  });

  useEffect(() => {
    mounted();
  }, [mounted]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <Form.Content>
        {error && <Alert.Error mb="md" text={error} />}
        <Stack>
          <Input.Email
            value={fields.email.value}
            onChange={(e) => fields.email.onChange(e.target.value)}
            error={fields.email.firstError?.errorText}
            disabled={isPending}
          />
          <Input.Password
            value={fields.password.value}
            onChange={(e) => fields.password.onChange(e.target.value)}
            error={fields.password.firstError?.errorText}
            disabled={isPending}
          />
        </Stack>
        <Button mt="xl" type="submit" loading={isPending}>
          Sign In
        </Button>
      </Form.Content>
    </Form>
  );
}
