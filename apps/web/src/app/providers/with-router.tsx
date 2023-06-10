import { ComponentType } from 'react';

import { RouterProvider } from 'atomic-router-react';

import { router } from '@mg-control/web/shared/routing';

export function withRouter(WrappedComponent: ComponentType) {
  return function wrapper() {
    return (
      <RouterProvider router={router}>
        <WrappedComponent />
      </RouterProvider>
    );
  };
}
