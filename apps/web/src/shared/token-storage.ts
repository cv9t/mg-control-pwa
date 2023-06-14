import { createEffect, createEvent, createStore, forward, scopeBind } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { Nullable } from '@mg-control/shared/typings';

import { LS_ACCESS_TOKEN } from './config';

type TokenStorageFactoryOptions = {
  key: string;
};

const tokenStorageFactory = modelFactory((options: TokenStorageFactoryOptions) => {
  const saveToken = createEvent<string>();
  const deleteToken = createEvent();
  const init = createEvent();
  const initCompleted = createEvent();

  const saveInStorageFx = createEffect<string, string>((newToken) => {
    localStorage.setItem(options.key, newToken);
    return newToken;
  });

  const deleteFromStorageFx = createEffect(() => {
    localStorage.removeItem(options.key);
  });

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

  const initFx = createEffect(() => {
    loadFromStorageFx();
    syncStorageWithTabsFx();
  });

  const $token = createStore<Nullable<string>>(null)
    .on(saveInStorageFx.doneData, (_, newToken) => newToken)
    .on(deleteFromStorageFx.doneData, () => null)
    .on(loadFromStorageFx.doneData, (_, persistedToken) => persistedToken);

  forward({ from: saveToken, to: saveInStorageFx });
  forward({ from: deleteToken, to: deleteFromStorageFx });
  forward({ from: init, to: initFx });
  forward({ from: initFx.finally, to: initCompleted });

  return {
    saveToken,
    deleteToken,
    init,
    initCompleted,
    $token,
  };
});

export type TokenStorageModel = Model<typeof tokenStorageFactory>;

export const $$tokenStorageModel = tokenStorageFactory.createModel({ key: LS_ACCESS_TOKEN });
