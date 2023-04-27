import { Col, Row, Typography } from "antd";

import { ActivateForm } from "@/features/auth";
import { dom } from "@/shared/lib";

import styles from "./styles.module.scss";

const ActivatePage = () => {
  dom.useTitle("MG Control | Активация");

  return (
    <Row className={styles.root} justify="center" align="middle" gutter={[0, 8]}>
      <Col span={24}>
        <Typography.Title className={styles.title} level={4}>
          Активация устройства
        </Typography.Title>
      </Col>
      <Col span={24}>
        <ActivateForm />
      </Col>
    </Row>
  );
};

export default ActivatePage;
