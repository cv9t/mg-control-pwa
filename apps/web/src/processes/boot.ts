import { createEvent, sample } from 'effector';

import { initializeRouter } from '../shared/routing';
import { $$tokenStorageModel } from '../shared/token-storage';

export const boot = createEvent();

sample({ clock: boot, target: [initializeRouter, $$tokenStorageModel.initialize] });
