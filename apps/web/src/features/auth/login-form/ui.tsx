import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Space, Typography } from "antd";

import { routes } from "@/shared/config";

import * as loginFormModel from "./model";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();

  const { errorMessage, isLoading } = loginFormModel.useLoginForm();

  const handleFinish = ({ email, password }: FormValues) => {
    loginFormModel.loginFx({ email, password }).then(() => navigate(routes.DASHBOARD));
  };

  return (
    <Form validateTrigger="onSubmit" layout="vertical" initialValues={{ remember: true }} autoComplete="off" onFinish={handleFinish}>
      {errorMessage && (
        <div style={{ marginBottom: 12 }}>
          <Typography.Text type="danger">{errorMessage}</Typography.Text>
        </div>
      )}
      <Form.Item
        label="Адрес электронной почты"
        name="email"
        rules={[
          {
            type: "email",
            message: "Неверно введен адрес электронной почты!",
          },
          { required: true, message: "Введите адрес электронной почты!" },
        ]}
      >
        <Input placeholder="Введите адрес электронной почты" />
      </Form.Item>
      <Form.Item label="Пароль" name="password" rules={[{ required: true, message: "Введите пароль!" }]}>
        <Input.Password placeholder="Введите пароль" />
      </Form.Item>
      <Form.Item>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Войти
          </Button>
          <Link to={routes.ACTIVATE}>Активировать устройство?</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
