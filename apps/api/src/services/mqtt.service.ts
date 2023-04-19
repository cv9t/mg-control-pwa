import mqtt, { MqttClient } from "mqtt";

export type MqttServiceOptions = {
  brokerUrl: string;
  primaryTopic: string;
};

type MqttRoomSubscription = {
  room: string;
  onMessage: (message: string) => void;
};

class MqttService {
  private client: MqttClient;

  private roomSubscriptions: MqttRoomSubscription[];

  public constructor(name: string, private options: MqttServiceOptions) {
    this.client = mqtt.connect(options.brokerUrl);
    this.roomSubscriptions = [];

    this.client.on("connect", () => {
      console.log(`${name} MQTT подключено`);
    });

    this.client.on("message", (topic, message) => {
      const room = topic.split("/").pop();
      const matchingSubscription = this.roomSubscriptions.find((subscription) => room === subscription.room);
      if (matchingSubscription) {
        matchingSubscription.onMessage(message.toString());
      }
    });
  }

  public subscribe(room: string, onMessage: (message: string) => void) {
    const topic = `${this.options.primaryTopic}/${room}/#`;
    this.client.subscribe(topic);
    this.roomSubscriptions.push({ room, onMessage });
  }
}

export default MqttService;
