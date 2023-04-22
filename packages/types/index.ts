export type LoginRequestData = {
  email: string;
  password: string;
};

export type ActivateRequestData = {
  activateCode: string;
  email: string;
  password: string;
};

export type DeviceSensorData = {
  air: {
    humidity: number;
    temp: number;
  };
  soil: {
    moisture: number;
    temp: number;
  };
  liquid: 0;
};
