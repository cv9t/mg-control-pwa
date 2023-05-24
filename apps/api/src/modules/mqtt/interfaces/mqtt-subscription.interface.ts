export interface MqttSubscription {
  topic: string;
  onMessage: (topic: string, message: string) => void;
}
