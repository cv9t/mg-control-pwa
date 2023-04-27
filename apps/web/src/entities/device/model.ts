import { DeviceSensorData } from "@mg-control/types";
import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";

import { api, env, plugs } from "@/shared/config";
import { alert, hooks } from "@/shared/lib";

type DeviceStore = {
  sensorData: DeviceSensorData | null;
};

const initialState: DeviceStore = {
  sensorData: null,
};

const setSensorData = createEvent<DeviceSensorData>();

const $deviceStore = createStore(initialState).on(setSensorData, (state, sensorData) => ({ ...state, sensorData }));

export const useDeviceConnect = () => {
  hooks.useSse(`${env.BACKEND_URL}/api/v1/sse/connect`, {
    eventSourceOptions: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(api.MG_CONTROL_ACCESS_TOKEN)}`,
      },
    },
    onMessage: (event) => {
      const sensorData = JSON.parse(event.data) as DeviceSensorData;
      setSensorData(sensorData);
    },
    onError: () => alert.error(plugs.UNEXPECTED_ERROR),
  });
};

export const useDeviceStore = () => useStore($deviceStore);
