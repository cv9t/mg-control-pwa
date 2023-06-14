import { useEffect } from 'react';

import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { Button } from '@mantine/core';

import { View } from '@mg-control/web/shared/types';
import { EmailInput, ErrorAlert, Form, PasswordInput } from '@mg-control/web/shared/ui';

import { SignInFormModel } from './model';

type SignInFormProps = {
  $$model: SignInFormModel;
};

export function SignInForm({ $$model }: SignInFormProps): View {
  const { submit, fields } = useForm($$model.$$form);
  const { mounted, error, isPending } = useUnit({
    mounted: $$model.mounted,
    error: $$model.$error,
    isPending: $$model.$isPending,
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
      {error && <ErrorAlert mb="md" text={error} />}
      <EmailInput
        value={fields.email.value}
        onChange={(e) => fields.email.onChange(e.target.value)}
        error={fields.email.firstError?.errorText}
        disabled={isPending}
      />
      <PasswordInput
        mt="md"
        value={fields.password.value}
        onChange={(e) => fields.password.onChange(e.target.value)}
        error={fields.password.firstError?.errorText}
        disabled={isPending}
      />
      <Button mt="xl" type="submit" loading={isPending}>
        Sign In
      </Button>
    </Form>
  );
}
