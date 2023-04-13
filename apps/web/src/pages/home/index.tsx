import { useNavigate } from "react-router-dom";
import { Button, Layout, Space, Typography } from "antd";

import { dom } from "@/shared/lib";
import { Content } from "@/shared/ui";

import styles from "./styles.module.scss";

const HomePage = () => {
  dom.useTitle("MG Control | Home");

  const navigate = useNavigate();

  return (
    <Layout>
      <Content.Center className={styles.content}>
        <Typography.Title level={4}>Выращивайте микрозелень без усилий в домашних условиях 🌱</Typography.Title>
        <Typography.Text className={styles.text}>
          <b>MicroGreen Box</b> - автоматизированное устройство, позволяющее быстро вырастить любую микрозелень!
        </Typography.Text>
        <Space size={8}>
          <Button type="primary" onClick={() => navigate("/activate")}>
            Активировать Box
          </Button>
          <Button onClick={() => navigate("/login")}>Войти</Button>
        </Space>
      </Content.Center>
    </Layout>
  );
};

export default HomePage;
