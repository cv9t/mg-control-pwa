import compose from "compose-function";

import withRouter from "./with-router";

export const withHocs = compose(withRouter);
