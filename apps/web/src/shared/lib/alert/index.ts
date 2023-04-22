import { ReactNode } from "react";
import { notification } from "antd";
import { IconType } from "antd/es/notification/interface";

const openNotification = (type: IconType) => (message: string | ReactNode, description?: string | ReactNode, icon?: ReactNode) => {
  notification.open({ type, message, description, placement: "bottomRight", icon });
};

export const error = openNotification("error");
export const success = openNotification("success");
export const warn = openNotification("warning");
export const info = openNotification("info");
