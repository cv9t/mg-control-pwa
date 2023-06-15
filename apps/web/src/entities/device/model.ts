import { attach, createEffect, createEvent, restore, sample, scopeBind } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { EventSourcePolyfill, MessageEvent } from 'event-source-polyfill';

import { DeviceDataDto } from '@mg-control/shared/dtos';
import { API_URL } from '@mg-control/web/shared/config';
import { delay } from '@mg-control/web/shared/lib';
import { $$tokenStorageModel, TokenStorageModel } from '@mg-control/web/shared/token-storage';

type DeviceFactoryOptions = {
  $$tokenStorageModel: TokenStorageModel;
};

const deviceFactory = modelFactory((options: DeviceFactoryOptions) => {
  const setupConnection = createEvent();
  const closeConnection = createEvent();
  const connectionEstablished = createEvent<EventSourcePolyfill>();
  const connectionFailed = createEvent();

  const dataReceived = createEvent<DeviceDataDto>();
  const messageReceived = createEvent<MessageEvent['data']>();

  const setupConnectionFx = attach({
    source: options.$$tokenStorageModel.$token,
    effect: async (token) => {
      const messageReceivedBound = scopeBind(messageReceived, { safe: true });

      await delay(2000);

      const eventSource = new EventSourcePolyfill(`${API_URL}/api/v1/device/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      eventSource.addEventListener('message', (event) => messageReceivedBound(event.data));
      eventSource.addEventListener('error', () => {});
      return eventSource;
    },
  });

  const preprocessMessageFx = createEffect<MessageEvent['data'], DeviceDataDto>((message) => {
    const data = JSON.parse(message) as DeviceDataDto;
    return data;
  });

  const $connection = restore(connectionEstablished, null);
  const $data = restore(dataReceived, null);

  const closeConnectionFx = attach({
    source: $connection,
    effect: (connection) => {
      connection?.close();
    },
  });

  $connection.reset(closeConnectionFx.done);
  $data.reset(closeConnectionFx.done);

  sample({ clock: setupConnection, target: setupConnectionFx });
  sample({ clock: closeConnection, target: closeConnectionFx });
  sample({ clock: setupConnectionFx.doneData, target: connectionEstablished });
  sample({ clock: setupConnectionFx.fail, target: connectionFailed });
  sample({ clock: messageReceived, target: preprocessMessageFx });
  sample({ clock: preprocessMessageFx.doneData, target: dataReceived });

  return {
    setupConnection,
    closeConnection,
    connectionEstablished,
    connectionFailed,
    dataReceived,
    $connection,
    $data,
  };
});

export type DeviceModel = Model<typeof deviceFactory>;

export const $$deviceModel = deviceFactory.createModel({ $$tokenStorageModel });
