import { Injectable, OnModuleInit } from '@nestjs/common';

import mqtt, { MqttClient } from 'mqtt';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { env } from '@mg-control/api/config';

import { MqttSubscription } from './interfaces/mqtt-subscription.interface';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: MqttClient;

  private readonly subscriptions: MqttSubscription[] = [];

  public constructor(@InjectPinoLogger(MqttService.name) private readonly logger: PinoLogger, private readonly config: env.Config) {}

  public onModuleInit(): void {
    this.client = mqtt.connect(this.config.mqtt.broker_url);

    this.client.on('connect', () => {
      this.logger.info(`MQTT connected on: ${this.client.options.hostname}`);
    });

    this.client.on('disconnect', () => {
      this.logger.info(`MQTT disconnected on: ${this.client.options.hostname}`);
    });

    this.client.on('reconnect', () => {
      this.logger.info(`MQTT is reconnecting on: ${this.client.options.hostname}`);
    });

    this.client.on('close', () => {
      this.logger.info(`MQTT closed on: ${this.client.options.hostname}`);
    });

    this.client.on('message', (topic, message) => {
      const matchingSubscription = this.subscriptions.find((subscription) =>
        topic.startsWith(this._createFullTopicTopic(subscription.topic)),
      );
      if (matchingSubscription) {
        matchingSubscription.onMessage(topic, message.toString());
      }
    });
  }

  public subscribe(topic: MqttSubscription['topic'], onMessage: MqttSubscription['onMessage']): void {
    const fullTopic = this._createFullTopicTopic(topic);
    this.client.subscribe(fullTopic);
    this.subscriptions.push({ topic, onMessage });
  }

  public unsubscribe(topic: string): void {
    const matchingSubscriptionIndex = this.subscriptions.findIndex((subscription) => subscription.topic === topic);
    if (matchingSubscriptionIndex >= 0) {
      const fullTopic = this._createFullTopicTopic(topic);
      this.client.unsubscribe(fullTopic);
      this.subscriptions.splice(matchingSubscriptionIndex, 1);
    }
  }

  public publish(topic: string, message: string): void {
    const fullTopic = this._createFullTopicTopic(topic);
    this.client.publish(fullTopic, message);
  }

  private _createFullTopicTopic(topic: string): string {
    return `${this.config.mqtt.primary_topic}/${topic}`;
  }
}
