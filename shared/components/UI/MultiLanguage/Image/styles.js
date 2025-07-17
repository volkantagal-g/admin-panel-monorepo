import { createUseStyles } from 'react-jss';

import addonAfter from '@shared/styles/addonAfter';

export default createUseStyles(theme => {
  return { ...addonAfter(theme) };
});
