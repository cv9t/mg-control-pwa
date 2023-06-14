import { createEvent, sample } from 'effector';

import { routerInit } from '../shared/routing';
import { $$tokenStorageModel } from '../shared/token-storage';

export const boot = createEvent();

sample({ clock: boot, target: [routerInit, $$tokenStorageModel.init] });
