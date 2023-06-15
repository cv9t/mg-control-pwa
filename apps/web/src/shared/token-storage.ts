import { createEffect, createEvent, createStore, sample, scopeBind } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { Nullable } from '@mg-control/shared/typings';

import { LS_ACCESS_TOKEN } from './config';

type TokenStorageFactoryOptions = {
  key: string;
};

const tokenStorageFactory = modelFactory((options: TokenStorageFactoryOptions) => {
  const saveToken = createEvent<string>();
  const deleteToken = createEvent();
  const initialize = createEvent();
  const initializeCompleted = createEvent();

  const saveInStorageFx = createEffect<string, string>((newToken) => {
    localStorage.setItem(options.key, newToken);
    return newToken;
  });

  const deleteFromStorageFx = createEffect(() => localStorage.removeItem(options.key));

  const loadFromStorageFx = createEffect<void, Nullable<string>>(() =>
    localStorage.getItem(options.key),
  );

  const syncStorageWithTabsFx = createEffect(() => {
    const saveTokenBound = scopeBind(saveToken);
    const deleteTokenBound = scopeBind(deleteToken);

    window.addEventListener('storage', (e) => {
      if (e.key === options.key) {
        const persistedToken = localStorage.getItem(options.key);
        if (persistedToken === null) {
          deleteTokenBound();
          return;
        }
        saveTokenBound(persistedToken);
      }
    });
  });

  const initializeFx = createEffect(() => {
    loadFromStorageFx();
    syncStorageWithTabsFx();
  });

  const $token = createStore<Nullable<string>>(null)
    .on(saveInStorageFx.doneData, (_, newToken) => newToken)
    .on(loadFromStorageFx.doneData, (_, persistedToken) => persistedToken)
    .reset(deleteFromStorageFx.doneData);

  sample({ clock: saveToken, target: saveInStorageFx });
  sample({ clock: deleteToken, target: deleteFromStorageFx });
  sample({ clock: initialize, target: initializeFx });
  sample({ clock: initializeFx.finally, target: initializeCompleted });

  return {
    saveToken,
    deleteToken,
    initialize,
    initializeCompleted,
    $token,
  };
});

export type TokenStorageModel = Model<typeof tokenStorageFactory>;

export const $$tokenStorageModel = tokenStorageFactory.createModel({ key: LS_ACCESS_TOKEN });
