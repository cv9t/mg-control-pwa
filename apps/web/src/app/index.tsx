import { View } from '@mg-control/web/shared/types';

import { Pages } from '../pages';

import { withProviders } from './providers';

function App(): View {
  return <Pages />;
}

export const AppWithProviders = withProviders(App);
