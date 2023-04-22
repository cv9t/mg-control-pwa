import { ReactNode } from "react";

import { CheckAuth } from "@/entities/session";

const withAuth = (WrapperComponent: () => ReactNode) => () => <CheckAuth>{WrapperComponent()}</CheckAuth>;

export default withAuth;
