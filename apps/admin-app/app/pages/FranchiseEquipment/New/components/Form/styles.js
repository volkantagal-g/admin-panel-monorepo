import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    alert: {
      '&>div.ant-select': {
        border: '1px solid #ff4d4f',
        '&:focus': { '&>div.ant-select-selector': { borderColor: 'inherit' } },
        '&:hover': { '&>div.ant-select-selector': { borderColor: 'inherit' } },
      },
      '&>div:last-child': {
        color: '#ff4d4f',
        paddingTop: '2px',
      },
    },
  };
});
