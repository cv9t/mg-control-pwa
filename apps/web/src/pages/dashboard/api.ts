import { createEffect } from 'effector';

import { api, ApiError } from '@mg-control/web/shared/api';

export const toggleLightFx = createEffect<'on' | 'off', void, ApiError>((state) =>
  api.authorizedRequestFx({
    url: 'device/toggle-light',
    method: 'POST',
    params: { state },
  }),
);
