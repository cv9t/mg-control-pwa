import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginRequestData } from "@mg-control/types";
import { Button, Form, Input, Space, Typography } from "antd";

import { routes } from "@/shared/config";

import * as loginFormModel from "../model";

import styles from "./styles.module.scss";

type FormValues = {
  email: string;
  password: string;
};

const useLoginForm = () => {
  const store = loginFormModel.useStore();

  const navigate = useNavigate();

  const login = useCallback(
    (credentials: LoginRequestData) => loginFormModel.loginFx(credentials).then(() => navigate(routes.DASHBOARD)),
    []
  );

  return {
    ...store,
    login,
  };
};

const LoginForm = () => {
  const { errorMessage, isLoading, login } = useLoginForm();

  const handleFinish = ({ email, password }: FormValues) => {
    login({ email, password });
  };

  return (
    <Form validateTrigger="onSubmit" layout="vertical" initialValues={{ remember: true }} autoComplete="off" onFinish={handleFinish}>
      {errorMessage && (
        <div className={styles.errorContainer}>
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
        <Space className={styles.buttonContainer}>
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
