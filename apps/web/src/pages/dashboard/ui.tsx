import { Col, Row } from "antd";

import { deviceModel } from "@/entities/device";
import { dom } from "@/shared/lib";
import { Card, Chart, Loader } from "@/shared/ui";

const DashboardPage = () => {
  dom.useTitle("MG Control | Панель");

  const { sensorData } = deviceModel.useDeviceStore();
  deviceModel.useDeviceConnect();

  if (!sensorData) {
    return <Loader.Spin className="overlay" />;
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Chart.Liquid percent={sensorData.liquid} width={240} height={240} />
        </Col>

        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <Card.Dashboard
            title="Воздух"
            mainIndicator={{
              value: sensorData.air.temp,
              maxValue: 40,
              format: (value) => `${value}°`,
            }}
            indicators={[
              {
                label: "Влажность",
                value: sensorData.air.humidity,
                format: (value) => `${value}%`,
              },
            ]}
          />
        </Col>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <Card.Dashboard
            title="Почва"
            mainIndicator={{
              value: sensorData.soil.temp,
              maxValue: 40,
              format: (value) => `${value}°`,
            }}
            indicators={[
              {
                label: "Влажность",
                value: sensorData.soil.moisture,
                format: (value) => `${value}%`,
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
