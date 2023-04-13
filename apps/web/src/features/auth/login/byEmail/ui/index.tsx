import { Button, Col, Form, Input, Row, Typography } from "antd";

import styles from "./styles.module.scss";

type FormValues = {
  email: string;
  password: string;
};

const ByEmail = () => {
  const handleFinish = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Row className={styles.root} justify="center" align="middle" gutter={[0, 8]}>
      <Col span={24}>
        <Typography.Title className={styles.title} level={4}>
          Вход
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Form layout="vertical" initialValues={{ remember: true }} autoComplete="off" onFinish={handleFinish}>
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
            <Input placeholder="example@example.com" />
          </Form.Item>
          <Form.Item label="Пароль" name="password" rules={[{ required: true, message: "Введите пароль!" }]}>
            <Input.Password placeholder="example123" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ByEmail;
