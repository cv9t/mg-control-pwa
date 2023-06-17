import { Nullable } from '@mg-control/shared/types';

import { PageLoader } from './page';

export function AuthLoader(): Nullable<JSX.Element> {
  return <PageLoader title="Authorization" />;
}
