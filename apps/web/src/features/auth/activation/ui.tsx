import { useEffect } from 'react';

import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { Button, Stack, TextInput } from '@mantine/core';
import { IconQrcode } from '@tabler/icons-react';

import { Nullable } from '@mg-control/shared/types';
import { Alert, Form, Input } from '@mg-control/web/shared/ui';

import { ActivationFormModel } from './model';

type ActivationFormProps = {
  model: ActivationFormModel;
};

export function ActivationForm({ model }: ActivationFormProps): Nullable<JSX.Element> {
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
          <TextInput
            value={fields.activationCode.value}
            onChange={(e) => fields.activationCode.onChange(e.target.value)}
            error={fields.activationCode.firstError?.errorText}
            label="Activation code"
            placeholder="Enter activation code"
            icon={<IconQrcode size="1.3rem" />}
            disabled={isPending}
            required
          />
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
          <Input.Password
            label="Confirm password"
            placeholder="Re-enter password"
            value={fields.confirmation.value}
            onChange={(e) => fields.confirmation.onChange(e.target.value)}
            error={fields.confirmation.firstError?.errorText}
            disabled={isPending}
          />
        </Stack>
        <Button mt="xl" type="submit" loading={isPending}>
          Activate
        </Button>
      </Form.Content>
    </Form>
  );
}
