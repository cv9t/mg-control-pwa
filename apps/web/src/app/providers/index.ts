import compose from 'compose-function';

import { withMantine } from './with-mantine';
import { withRouter } from './with-router';

export const withProviders = compose(withMantine, withRouter);
