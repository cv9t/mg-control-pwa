import { RouteRecord } from 'atomic-Router-react';

import { Nullable } from '@mg-control/shared/types';

export type View = Nullable<JSX.Element>;

export type Children = View[] | View;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Route = RouteRecord<any, any>;
