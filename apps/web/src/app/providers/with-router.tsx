import { ComponentType } from 'react';

import { RouterProvider } from 'atomic-router-react';

import { Nullable } from '@mg-control/shared/types';
import { router } from '@mg-control/web/shared/routing';

export function withRouter(WrappedComponent: ComponentType) {
  return function wrapper(): Nullable<JSX.Element> {
    return (
      <RouterProvider router={router}>
        <WrappedComponent />
      </RouterProvider>
    );
  };
}
