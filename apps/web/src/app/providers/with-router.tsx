import { ComponentType, Suspense } from 'react';

import { RouterProvider } from 'atomic-Router-react';

import { Router } from '@mg-control/web/shared/routing';
import { View } from '@mg-control/web/shared/types';
import { Spin } from '@mg-control/web/shared/ui';

export function withRouter(WrappedComponent: ComponentType) {
  return function wrapper(): View {
    return (
      <RouterProvider router={Router}>
        <Suspense fallback={<Spin className="overlay" />}>
          <WrappedComponent />
        </Suspense>
      </RouterProvider>
    );
  };
}
