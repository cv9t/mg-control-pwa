import { Button, Space, Typography } from "antd";
import { useUnit } from "effector-react";

import { dom } from "@/shared/lib";

import { goActivatePressed } from "../model";

import styles from "./styles.module.scss";

export const HomePage = (): JSX.Element | null => {
  dom.useTitle("MG Control | Главная");

  const goActivatePressedFn = useUnit(goActivatePressed);

  return (
    <div className={styles.root}>
      <Typography.Title level={4}>
        Выращивайте микрозелень без усилий в домашних условиях 🌱
      </Typography.Title>
      <Typography.Text className={styles.text}>
        <b>MicroGreen Box</b> - автоматизированное устройство, позволяющее быстро вырастить любую
        микрозелень!
      </Typography.Text>
      <Space>
        <Button type="primary" onClick={goActivatePressedFn}>
          Активировать устройство
        </Button>
      </Space>
    </div>
  );
};
