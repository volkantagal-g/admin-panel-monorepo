import { createUseStyles } from 'react-jss';

export default createUseStyles({
  collapsePanel: {
    marginTop: '1rem',
    '& .ant-collapse-header': { alignItems: 'center !important' },
    '& .ant-collapse-content-box': { padding: 0 },
  },
  collapsePanelHeaderRow: { flex: 1 },
});
