import { createEffect, createEvent, createStore, sample, scopeBind } from 'effector';

import { Nullable } from '@mg-control/shared/types';

import { env } from './config';

export const saveToken = createEvent<string>();
export const deleteToken = createEvent();

export const initialize = createEvent();
export const initialized = createEvent();

const saveTokenFx = createEffect<string, string>((newToken) => {
  localStorage.setItem(env.LS_ACCESS_TOKEN, newToken);
  return newToken;
});

const deleteTokenFx = createEffect(() => {
  localStorage.removeItem(env.LS_ACCESS_TOKEN);
});

const loadTokenFx = createEffect<void, Nullable<string>>(() => localStorage.getItem(env.LS_ACCESS_TOKEN));

const syncTokenFx = createEffect(() => {
  const saveTokenBound = scopeBind(saveToken);
  const deleteTokenBound = scopeBind(deleteToken);

  window.addEventListener('storage', (e) => {
    if (e.key === env.LS_ACCESS_TOKEN) {
      const persistedToken = localStorage.getItem(env.LS_ACCESS_TOKEN);
      if (persistedToken === null) {
        deleteTokenBound();
        return;
      }
      saveTokenBound(persistedToken);
    }
  });
});

const initializeFx = createEffect(() => {
  loadTokenFx();
  syncTokenFx();
});

export const $token = createStore<Nullable<string>>(null)
  .on(saveTokenFx.doneData, (_, newToken) => newToken)
  .on(loadTokenFx.doneData, (_, persistedToken) => persistedToken)
  .reset(deleteTokenFx.done);

sample({ clock: saveToken, target: saveTokenFx });
sample({ clock: deleteToken, target: deleteTokenFx });

sample({ clock: initialize, target: initializeFx });
sample({ clock: initializeFx.finally, target: initialized });
