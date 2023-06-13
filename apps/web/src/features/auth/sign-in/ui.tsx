import { useEffect } from 'react';

import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { Button } from '@mantine/core';

import { excludeField } from '@mg-control/web/shared/lib';
import { View } from '@mg-control/web/shared/types';
import { EmailInput, ErrorAlert, Form, PasswordInput } from '@mg-control/web/shared/ui';

import { SignInFormModel } from './model';

type SignInFormProps = {
  $$model: SignInFormModel;
};

export function SignInForm({ $$model }: SignInFormProps): View {
  const { submit, fields } = useForm($$model.$$form);
  const { mounted, $signInError, $formDisabled } = useUnit(excludeField($$model, '$$form'));

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
      {$signInError && <ErrorAlert mb="md" text={$signInError} />}
      <EmailInput
        value={fields.email.value}
        onChange={(e) => fields.email.onChange(e.target.value)}
        error={fields.email.firstError?.errorText}
        disabled={$formDisabled}
      />
      <PasswordInput
        mt="md"
        value={fields.password.value}
        onChange={(e) => fields.password.onChange(e.target.value)}
        error={fields.password.firstError?.errorText}
        disabled={$formDisabled}
      />
      <Button type="submit" fullWidth mt="xl" loading={$formDisabled}>
        Sign In
      </Button>
    </Form>
  );
}
