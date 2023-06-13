import { useEffect } from 'react';

import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { Button, TextInput } from '@mantine/core';
import { IconQrcode } from '@tabler/icons-react';

import { excludeField } from '@mg-control/web/shared/lib';
import { View } from '@mg-control/web/shared/types';
import { EmailInput, ErrorAlert, Form, PasswordInput } from '@mg-control/web/shared/ui';

import { ActivationFormModel } from './model';

type ActivationFormProps = {
  $$model: ActivationFormModel;
};

export function ActivationForm({ $$model }: ActivationFormProps): View {
  const { submit, fields } = useForm($$model.$$form);
  const { mounted, $activationError, $formDisabled } = useUnit(excludeField($$model, '$$form'));

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
      {$activationError && <ErrorAlert mb="md" text={$activationError} />}
      <TextInput
        value={fields.activationCode.value}
        onChange={(e) => fields.activationCode.onChange(e.target.value)}
        error={fields.activationCode.firstError?.errorText}
        disabled={$formDisabled}
        label="Activation code"
        placeholder="Enter activation code"
        icon={<IconQrcode size="1rem" />}
        required
      />
      <EmailInput
        mt="md"
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
      <PasswordInput
        label="Confirm password"
        placeholder="Re-enter password"
        mt="md"
        value={fields.confirmation.value}
        onChange={(e) => fields.confirmation.onChange(e.target.value)}
        error={fields.confirmation.firstError?.errorText}
        disabled={$formDisabled}
      />
      <Button type="submit" fullWidth mt="xl" loading={$formDisabled}>
        Activate
      </Button>
    </Form>
  );
}
