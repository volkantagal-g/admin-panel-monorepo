import { createUseStyles } from 'react-jss';

export default createUseStyles({
  labelWrapper: {
    lineHeight: '1.7rem',
    textAlign: 'right',
    paddingRight: '10px',
  },
  noPanelPadding: {
    '& .ant-collapse-content-box': { padding: 0 },
    '& .ant-row': { padding: '16px' },
    '& .ant-divider-horizontal': { margin: 0 },
  },
  tagsWrapper: {
    lineHeight: '1.7rem',
    '& .ant-tag': { fontSize: '10px' },
  },
});