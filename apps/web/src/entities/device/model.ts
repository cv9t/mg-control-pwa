import { attach, createEffect, createEvent, createStore, forward, scopeBind } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { EventSourcePolyfill, MessageEvent } from 'event-source-polyfill';

import { DeviceDataDto } from '@mg-control/shared/dtos';
import { Nullable } from '@mg-control/shared/typings';
import { API_URL } from '@mg-control/web/shared/config';
import { TokenStorageModel } from '@mg-control/web/shared/token-storage';

type DeviceFactoryOptions = {
  $$tokenStorageModel: TokenStorageModel;
};

const initialDataState: DeviceDataDto = {
  air: {
    temp: 0,
  },
  soil: {
    temp: 0,
    moisture: 0,
  },
  isLightOn: false,
};

const deviceFactory = modelFactory((options: DeviceFactoryOptions) => {
  const messageReceived = createEvent<MessageEvent['data']>();

  const setupConnectionFx = attach({
    source: options.$$tokenStorageModel.$token,
    effect: (token) => {
      const eventSource = new EventSourcePolyfill(`${API_URL}/api/v1/device/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const messageReceivedBound = scopeBind(messageReceived);
      eventSource.addEventListener('message', (event) => messageReceivedBound(event.data));
      return eventSource;
    },
  });

  const preprocessMessageFx = createEffect<MessageEvent['data'], DeviceDataDto>((message) => {
    const data = JSON.parse(message) as DeviceDataDto;
    return data;
  });

  const $connection = createStore<Nullable<EventSource>>(null);
  const $data = createStore(initialDataState).on(
    preprocessMessageFx.doneData,
    (_, newData) => newData,
  );

  const closeConnectionFx = attach({
    source: $connection,
    effect: (connection) => {
      connection?.close();
    },
  });

  forward({ from: setupConnectionFx.doneData, to: $connection });
  forward({ from: messageReceived, to: preprocessMessageFx });
  forward({ from: preprocessMessageFx.doneData, to: $data });

  return { setupConnectionFx, closeConnectionFx, $data };
});

export type DeviceModel = Model<typeof deviceFactory>;
