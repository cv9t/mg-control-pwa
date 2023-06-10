import { createEffect, createEvent, createStore, sample, scopeBind } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { Nullable } from '@mg-control/shared/types';

import { appStarted, LS_ACCESS_TOKEN } from './config';

type TokenStorageFactoryOptions = {
  lsKey: string;
};

const tokenStorageFactory = modelFactory(({ lsKey }: TokenStorageFactoryOptions) => {
  const updateToken = createEvent<string>();
  const deleteToken = createEvent();
  const initialize = createEvent();

  const updateInStorageFx = createEffect((newToken: string) => {
    localStorage.setItem(lsKey, newToken);
    return newToken;
  });

  const deleteFromStorageFx = createEffect(() => {
    localStorage.removeItem(lsKey);
  });

  const loadFromStorageFx = createEffect(() => localStorage.getItem(lsKey));

  const syncStorageWithTabsFx = createEffect(() => {
    const updateTokenBound = scopeBind(updateToken);
    const deleteTokenBound = scopeBind(deleteToken);
    window.addEventListener('storage', (e) => {
      if (e.key === lsKey) {
        const updatedToken = localStorage.getItem(lsKey);
        if (updatedToken === null) {
          deleteTokenBound();
          return;
        }
        updateTokenBound(updatedToken);
      }
    });
  });

  const initializationFx = createEffect(() => {
    loadFromStorageFx();
    syncStorageWithTabsFx();
  });

  const $token = createStore<Nullable<string>>(null);

  sample({ clock: updateToken, target: updateInStorageFx });
  sample({ clock: updateInStorageFx.doneData, target: $token });

  sample({ clock: deleteToken, target: deleteFromStorageFx });
  sample({ clock: deleteFromStorageFx.doneData, fn: () => null, target: $token });

  sample({ clock: initialize, target: initializationFx });

  return {
    $token,
    updateToken,
    deleteToken,
    initialize,
  };
});

export type TokenStorageModel = Model<typeof tokenStorageFactory>;

export const $$tokenStorageModel = tokenStorageFactory.createModel({
  lsKey: LS_ACCESS_TOKEN,
});

sample({ clock: appStarted, target: $$tokenStorageModel.initialize });
