import { ReactNode } from 'react';

import { View } from '@mg-control/web/shared/types';

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps): View {
  return <>{children}</>;
}
