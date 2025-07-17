import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    routeOptionColumn: {
      display: 'flex',
      justifyContent: 'center',
    },
    httpVerbSelect: { minWidth: 100 },
  };
});
