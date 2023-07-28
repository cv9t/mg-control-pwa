import { attach, createEffect, createEvent, createStore, restore, sample, scopeBind } from 'effector';

import { EventSourcePolyfill, MessageEvent } from 'event-source-polyfill';

import { DeviceDataDto } from '@mg-control/shared/dtos';
import { Nullable } from '@mg-control/shared/types';
import { env } from '@mg-control/web/shared/config';
import * as tokenStorage from '@mg-control/web/shared/token-storage';

export const setupConnection = createEvent();
export const closeConnection = createEvent();

export const connectionEstablished = createEvent();
export const connectionFailed = createEvent();

export const messageReceived = createEvent<MessageEvent['data']>();
export const dataReceived = createEvent<DeviceDataDto>();

const setupConnectionFx = attach({
  source: tokenStorage.$token,
  effect: (token) => {
    const messageReceivedBound = scopeBind(messageReceived, { safe: true });

    const eventSource = new EventSourcePolyfill(`${env.BACKEND_URL}/api/v1/device/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    eventSource.addEventListener('message', (event) => messageReceivedBound(event.data));
    return eventSource;
  },
});

const preprocessMessageFx = createEffect<MessageEvent['data'], DeviceDataDto>((message) => {
  const data = JSON.parse(message) as DeviceDataDto;
  return data;
});

export const $connection = createStore<Nullable<EventSourcePolyfill>>(null).on(setupConnectionFx.doneData, (_, connection) => connection);

export const $data = restore(dataReceived, null);

const closeConnectionFx = attach({
  source: $connection,
  effect: (connection) => {
    connection?.close();
  },
});

sample({ clock: setupConnection, target: setupConnectionFx });
sample({ clock: setupConnectionFx.done, target: connectionEstablished });
sample({ clock: setupConnectionFx.fail, target: connectionFailed });

sample({ clock: closeConnection, target: closeConnectionFx });

sample({ clock: messageReceived, target: preprocessMessageFx });
sample({ clock: preprocessMessageFx.doneData, target: dataReceived });
