export type LoginBody = {
  email: string;
  password: string;
};

export type ActivateBody = {
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
