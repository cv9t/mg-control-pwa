import { Col, Row, Typography } from "antd";

import { LoginForm } from "@/features/auth";
import { dom } from "@/shared/lib";

const LoginPage = () => {
  dom.useTitle("MG Control | Login");

  return (
    <Row justify="center" align="middle" gutter={[0, 8]} style={{ maxWidth: 320, width: "100%" }}>
      <Col span={24}>
        <Typography.Title level={4} style={{ textAlign: "center" }}>
          Вход
        </Typography.Title>
      </Col>
      <Col span={24}>
        <LoginForm />
      </Col>
    </Row>
  );
};

export default LoginPage;
