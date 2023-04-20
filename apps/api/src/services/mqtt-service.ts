import mqtt, { MqttClient } from "mqtt";

import { env } from "@/config";

type MqttSubscription = {
  topic: string;
  onMessage: (topic: string, message: string) => Promise<void>;
};

class MqttService {
  private client: MqttClient;

  private primaryTopic: string;

  private subscriptions: MqttSubscription[];

  public constructor() {
    this.client = mqtt.connect(env.MQTT_BROKER_URL);
    this.primaryTopic = env.MQTT_PRIMARY_TOPIC;
    this.subscriptions = [];

    this.client.on("connect", () => {
      console.log("MQTT подключено");
    });

    this.client.on("message", async (topic, message) => {
      const matchingSubscription = this.subscriptions.find((subscription) =>
        topic.startsWith(this.primaryTopic.concat(subscription.topic).replace("#", ""))
      );
      if (matchingSubscription) {
        await matchingSubscription.onMessage(topic, message.toString());
      }
    });
  }

  public subscribe(topic: string, onMessage: MqttSubscription["onMessage"]) {
    this.client.subscribe(this.primaryTopic.concat(topic));
    this.subscriptions.push({ topic, onMessage });
  }

  public unsubscribe(topic: string) {
    const matchingSubscriptionIndex = this.subscriptions.findIndex((subscription) => subscription.topic === topic);
    if (matchingSubscriptionIndex >= 0) {
      this.client.unsubscribe(this.primaryTopic.concat(topic));
      this.subscriptions.splice(matchingSubscriptionIndex, 1);
    }
  }
}

const mqttService = new MqttService();

export default mqttService;
