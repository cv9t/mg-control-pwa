import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Injectable, OnModuleInit } from "@nestjs/common";
import mqtt, { MqttClient } from "mqtt";

import { env } from "@/config";

import { MqttSubscription } from "./interfaces/mqtt-subscription.interface";

@Injectable()
export class MqttService implements OnModuleInit {
  private client: MqttClient;

  private primaryTopic: string;

  private readonly subscriptions: MqttSubscription[] = [];

  public constructor(@InjectPinoLogger(MqttService.name) private readonly logger: PinoLogger, private readonly config: env.Config) {}

  public onModuleInit(): void {
    this.client = mqtt.connect(this.config.mqtt.broker_url);
    this.primaryTopic = this.config.mqtt.primary_topic;

    this.client.on("connect", () => {
      this.logger.info(`MQTT connected on: ${this.client.options.hostname}`);
    });

    this.client.on("disconnect", () => {
      this.logger.info(`MQTT disconnected on: ${this.client.options.hostname}`);
    });

    this.client.on("reconnect", () => {
      this.logger.info(`MQTT is reconnecting on: ${this.client.options.hostname}`);
    });

    this.client.on("close", () => {
      this.logger.info(`MQTT closed on: ${this.client.options.hostname}`);
    });

    this.client.on("message", (topic, message) => {
      const matchingSubscription = this.subscriptions.find((subscription) =>
        topic.startsWith(this.primaryTopic.concat(subscription.topic).replace("#", ""))
      );
      if (matchingSubscription) {
        matchingSubscription.onMessage(topic, message.toString());
      }
    });
  }

  public subscribe(topic: MqttSubscription["topic"], onMessage: MqttSubscription["onMessage"]): void {
    this.client.subscribe(this.createTopic(topic));
    this.subscriptions.push({ topic, onMessage });
  }

  public unsubscribe(topic: string): void {
    const matchingSubscriptionIndex = this.subscriptions.findIndex((subscription) => subscription.topic === topic);
    if (matchingSubscriptionIndex >= 0) {
      this.client.unsubscribe(this.createTopic(topic));
      this.subscriptions.splice(matchingSubscriptionIndex, 1);
    }
  }

  private createTopic(topic: string): string {
    return this.primaryTopic.concat(topic);
  }
}
