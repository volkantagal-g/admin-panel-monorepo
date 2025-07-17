import { createUseStyles } from 'react-jss';

export default createUseStyles({
  noPanelPadding: {
    '& .ant-collapse-content-box': { padding: 0 },
    '& .ant-table-pagination': { marginRight: '16px' },
  },
});
