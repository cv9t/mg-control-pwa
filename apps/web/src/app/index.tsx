import { Pages } from '../pages';
import { View } from '../shared/types';

import { withProviders } from './providers';

import './global.scss';

function App(): View {
  return <Pages />;
}

export const AppWithProviders = withProviders(App);
