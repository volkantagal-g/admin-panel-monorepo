import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    table: {
      width: '100%',
      '& table': { width: '100% !important' },
      '& .ant-table-expanded-row-fixed': { width: '100% !important' },
      '& .ant-table-footer': { display: 'none' },
      '& .ant-table-body': { overflow: 'auto !important' },
      '& td': { padding: '2px 4px !important' },
      '& th': { padding: '2px 4px !important' },
    },
  };
});
