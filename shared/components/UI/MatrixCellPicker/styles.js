import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    row: { '& p': { userSelect: 'none' } },
    inactiveOverlay: {
      position: 'absolute',
      zIndex: 9,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,.1)',
      cursor: 'not-allowed',
    },
    cell: {
      width: '0',
      flex: '1 1',
      '& button': {
        height: '100%',
        width: '100%',
        border: '1px solid lightGray',
        '&:active, &:focus': { outline: '0' },
      },
    },
  };
});
