import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { init } from './shared/config';
import { AppWithProviders } from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
init.appStarted();
root.render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
);
