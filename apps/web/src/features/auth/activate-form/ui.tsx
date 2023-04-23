import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, Space, Typography } from "antd";

import { routes } from "@/shared/config";

import * as activateFormModel from "./model";

type FormValues = {
  activateCode: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const ActivateForm = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const { errorMessage, isLoading } = activateFormModel.useActivateForm();

  const handleFinish = ({ email, password, activateCode }: FormValues) => {
    activateFormModel.activateFx({ email, password, activateCode }).then(() => navigate(routes.DASHBOARD));
  };

  return (
    <Row justify="center" align="middle" gutter={[0, 8]} style={{ maxWidth: 320, width: "100%" }}>
      <Col span={24}>
        <Typography.Title level={4} style={{ textAlign: "center" }}>
          Активация устройства
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Form
          form={form}
          validateTrigger="onSubmit"
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={handleFinish}
        >
          {errorMessage && (
            <div style={{ marginBottom: 12 }}>
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
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Активировать
              </Button>
              <Link to={routes.LOGIN}>Уже активировали?</Link>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ActivateForm;
