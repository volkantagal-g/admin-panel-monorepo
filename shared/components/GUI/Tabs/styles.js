import { createUseStyles } from 'react-jss';

export default createUseStyles({
  tabs: () => {
    return {
      /*
        Note: this "overflow: 'unset'" line for ErrorBadge.
        If you remove it, error badges in space component will be half visible.
      */
      overflow: 'unset',
    };
  },
});
