import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    antTable: {
      '& div.ant-table-body': { maxHeight: '100% !important' },
      '& td': { padding: '2px 4px !important' },
      '& th': { padding: '2px 4px !important' },
    },
  };
});
