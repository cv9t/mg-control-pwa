import { useNavigate } from "react-router-dom";
import { Button, Layout, Space, Typography } from "antd";

import { dom } from "@/shared/lib";
import { Content } from "@/shared/ui";

const HomePage = () => {
  dom.useTitle("MG Control | Главная");

  const navigate = useNavigate();

  return (
    <Layout>
      <Content.Center
        style={{
          gap: "0.25em",
        }}
      >
        <div>
          <Typography.Title level={4}>Выращивайте микрозелень без усилий в домашних условиях 🌱</Typography.Title>
          <Typography.Text style={{ display: "block", marginBottom: "0.8em" }}>
            <b>MicroGreen Box</b> - автоматизированное устройство, позволяющее быстро вырастить любую микрозелень!
          </Typography.Text>
          <Space>
            <Button type="primary" onClick={() => navigate("/activate")}>
              Активировать устройство
            </Button>
            <Button onClick={() => navigate("/login")}>Войти</Button>
          </Space>
        </div>
      </Content.Center>
    </Layout>
  );
};

export default HomePage;
