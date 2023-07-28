import { createRoot } from 'react-dom/client';

import { boot } from './processes/boot';
import { AppWithProviders } from './app';

const root = createRoot(document.getElementById('root') as HTMLElement);

boot();

root.render(<AppWithProviders />);
