import { createEvent, sample } from 'effector';

import * as routing from '../shared/routing';
import * as tokenStorage from '../shared/token-storage';

export const boot = createEvent();

sample({ clock: boot, target: [routing.initialize, tokenStorage.initialize] });
