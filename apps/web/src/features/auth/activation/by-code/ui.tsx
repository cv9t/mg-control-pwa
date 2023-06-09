import { useEffect } from 'react';

import { useUnit } from 'effector-react';

import { Button, Form, Input, Space } from 'antd';

import { View } from '@mg-control/web/shared/types';

import { ActivationByCodeModel } from './model';

type ActivationByCodeProps = {
  $$model: ActivationByCodeModel;
};

export function ActivationByCode({ $$model }: ActivationByCodeProps): View {
  const { pageMounted, formSubmitted, $formSubmitPending } = useUnit($$model);

  const [form] = Form.useForm();

  useEffect(() => {
    pageMounted();
  }, [pageMounted]);

  return (
    <Form
      layout="vertical"
      autoComplete="off"
      validateTrigger="onSubmit"
      initialValues={{ remember: true }}
      onFinish={formSubmitted}
    >
      <Form.Item
        label="Activation code"
        name="activationCode"
        rules={[{ required: true, message: 'Enter activation code!' }]}
      >
        <Input placeholder="Enter activation code" />
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'Incorrect e-mail!',
          },
          { required: true, message: 'Enter e-mail!' },
        ]}
      >
        <Input placeholder="Enter e-mail" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Enter password!' }]}
      >
        <Input.Password placeholder="Enter password" />
      </Form.Item>
      <Form.Item
        name="repeatPassword"
        label="Repeat password"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Re-enter password!',
          },
          () => ({
            validator(_, value) {
              const password = form.getFieldValue('password');
              if (
                !value ||
                !form.isFieldValidating('password') ||
                !password ||
                password === value
              ) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords must match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Repeat password" onPaste={(e) => e.preventDefault()} />
      </Form.Item>
      <Form.Item>
        <Space
          style={{
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Button loading={$formSubmitPending} type="primary" htmlType="submit">
            Activate
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
