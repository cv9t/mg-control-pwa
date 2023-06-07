import { ComponentType, Suspense } from 'react';

import { RouterProvider } from 'atomic-router-react';

import { router } from '@mg-control/web/shared/routing';
import { View } from '@mg-control/web/shared/types';
import { Loader } from '@mg-control/web/shared/ui';

export function withRouter(WrappedComponent: ComponentType) {
  return function wrapper(): View {
    return (
      <RouterProvider router={router}>
        <Suspense fallback={<Loader.Spin className="overlay" />}>
          <WrappedComponent />
        </Suspense>
      </RouterProvider>
    );
  };
}
