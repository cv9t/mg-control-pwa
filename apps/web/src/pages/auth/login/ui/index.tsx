import { Col, Row, Typography } from "antd";

import { LoginForm } from "@/features/auth";
import { dom } from "@/shared/lib";

import styles from "./styles.module.scss";

const LoginPage = () => {
  dom.useTitle("MG Control | Вход");

  return (
    <Row className={styles.root} justify="center" align="middle" gutter={[0, 8]}>
      <Col span={24}>
        <Typography.Title level={4} className={styles.title}>
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
