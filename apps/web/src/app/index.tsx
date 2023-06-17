import { Nullable } from '@mg-control/shared/types';

import { Pages } from '../pages';

import { withProviders } from './providers';

function App(): Nullable<JSX.Element> {
  return <Pages />;
}

export const AppWithProviders = withProviders(App);
