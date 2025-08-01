import { createUseStyles } from 'react-jss';

import categoryActiveness from '@shared/styles/categoryActiveness';

export default createUseStyles(theme => {
  return { ...categoryActiveness(theme) };
});
