import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    tableColumn: {
      '& .ant-tag': {
        maxWidth: '100%',
        overflow: 'auto',
        textOverflow: 'ellipsis',
      },
    },
  };
});
