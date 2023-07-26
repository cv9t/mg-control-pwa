import { MouseEvent } from 'react';

import { attach, createEvent, sample } from 'effector';

import { redirect } from 'atomic-router';

import { sessionModel } from '@mg-control/web/entities/session';
import { routes } from '@mg-control/web/shared/routing';

export const signOutPressed = createEvent<MouseEvent>();

const signOutFx = attach({ effect: sessionModel.signOutFx });

export const $isPending = signOutFx.pending;

sample({ clock: signOutPressed, target: signOutFx });

redirect({ clock: signOutFx.done, route: routes.auth.signIn });
