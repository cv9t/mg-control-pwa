import { createEvent, createStore, sample } from 'effector';
import { Model, modelFactory } from 'effector-factorio';

import { $$tokenStorageModel } from '@mg-control/web/shared/token-storage';

import { $$sessionApiModel } from './api';

const sessionFactory = modelFactory(() => {
  const isAuthorizedChanged = createEvent<boolean>();

  const $isAuthorized = createStore(false);

  sample({ clock: isAuthorizedChanged, target: $isAuthorized });

  sample({
    clock: [$$sessionApiModel.activateFx.done, $$sessionApiModel.signInFx.done],
    fn: () => true,
    target: isAuthorizedChanged,
  });

  sample({
    clock: $$sessionApiModel.activateFx.doneData,
    fn: ({ accessToken }) => accessToken,
    target: $$tokenStorageModel.updateToken,
  });

  return { $isAuthorized };
});

export type SessionModel = Model<typeof sessionFactory>;

export const $$sessionModel = sessionFactory.createModel();
