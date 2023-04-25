import { Col, Row, Typography } from "antd";

import { ActivateForm } from "@/features/auth";
import { dom } from "@/shared/lib";

const ActivatePage = () => {
  dom.useTitle("MG Control | Activate");

  return (
    <Row justify="center" align="middle" gutter={[0, 8]} style={{ maxWidth: 320, width: "100%" }}>
      <Col span={24}>
        <Typography.Title level={4} style={{ textAlign: "center" }}>
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
