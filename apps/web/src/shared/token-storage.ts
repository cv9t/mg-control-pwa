import { createEffect, createEvent, createStore, sample, scopeBind } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { Nullable } from '@mg-control/shared/typings';

import { appStarted, LS_ACCESS_TOKEN } from './config';

type TokenStorageFactoryOptions = {
  key: string;
};

const tokenStorageFactory = modelFactory(({ key }: TokenStorageFactoryOptions) => {
  const saveToken = createEvent<string>();
  const deleteToken = createEvent();
  const initialize = createEvent();
  const initialized = createEvent();

  const saveInStorageFx = createEffect<string, string>((newToken) => {
    localStorage.setItem(key, newToken);
    return newToken;
  });

  const deleteFromStorageFx = createEffect(() => {
    localStorage.removeItem(key);
  });

  const loadFromStorageFx = createEffect<void, Nullable<string>>(() => localStorage.getItem(key));

  const syncStorageWithTabsFx = createEffect(() => {
    const saveTokenBound = scopeBind(saveToken);
    const deleteTokenBound = scopeBind(deleteToken);

    window.addEventListener('storage', (e) => {
      if (e.key === key) {
        const persistedToken = localStorage.getItem(key);
        if (persistedToken === null) {
          deleteTokenBound();
          return;
        }
        saveTokenBound(persistedToken);
      }
    });
  });

  const initializationFx = createEffect(() => {
    loadFromStorageFx();
    syncStorageWithTabsFx();
  });

  const $token = createStore<Nullable<string>>(null)
    .on(saveInStorageFx.doneData, (_, newToken) => newToken)
    .on(deleteFromStorageFx.doneData, () => null)
    .on(loadFromStorageFx.doneData, (_, persistedToken) => persistedToken);

  sample({ clock: saveToken, target: saveInStorageFx });
  sample({ clock: deleteToken, target: deleteFromStorageFx });
  sample({ clock: initialize, target: initializationFx });
  sample({ clock: initializationFx.finally, target: initialized });

  return {
    saveToken,
    deleteToken,
    initialize,
    initialized,
    $token,
  };
});

export type TokenStorageModel = Model<typeof tokenStorageFactory>;

export const $$tokenStorageModel = tokenStorageFactory.createModel({ key: LS_ACCESS_TOKEN });

sample({ clock: appStarted, target: $$tokenStorageModel.initialize });
