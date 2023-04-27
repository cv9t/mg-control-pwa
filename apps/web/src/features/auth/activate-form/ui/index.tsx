import { Link } from "react-router-dom";
import { Button, Form, Input, Space, Typography } from "antd";

import { routes } from "@/shared/config";

import * as activateFormModel from "../model";

import styles from "./styles.module.scss";

type FormValues = {
  activateCode: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const ActivateForm = () => {
  const { errorMessage, isLoading, activate } = activateFormModel.useActivateForm();

  const [form] = Form.useForm();

  const handleFinish = ({ email, password, activateCode }: FormValues) => {
    activate({ email, password, activateCode });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      validateTrigger="onSubmit"
      initialValues={{ remember: true }}
      onFinish={handleFinish}
    >
      {errorMessage && (
        <div className={styles.errorContainer}>
          <Typography.Text type="danger">{errorMessage}</Typography.Text>
        </div>
      )}
      <Form.Item label="Код активации" name="activateCode" rules={[{ required: true, message: "Введите код активации!" }]}>
        <Input placeholder="Введите код активации" />
      </Form.Item>
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
      <Form.Item
        name="repeatPassword"
        label="Повторите пароль"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Введите повторно пароль!",
          },
          () => ({
            validator(_, value) {
              const password = form.getFieldValue("password");
              if (!value || !form.isFieldValidating("password") || !password || password === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли должны совпадать!"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Введите повторно пароль" onPaste={(e) => e.preventDefault()} />
      </Form.Item>
      <Form.Item>
        <Space className={styles.buttonContainer}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Активировать
          </Button>
          <Link to={routes.LOGIN}>Уже активировали?</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ActivateForm;
