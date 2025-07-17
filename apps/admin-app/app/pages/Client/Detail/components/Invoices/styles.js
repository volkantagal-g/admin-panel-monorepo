import { createUseStyles } from 'react-jss';

export default createUseStyles({
  notes: {
    padding: 0,
    margin: 0,

    '& li': {
      listStyle: 'none',
      padding: '0.5rem 1rem',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
    },

    '& li:last-child': { borderBottom: 'none' },
  },
  title: {
    fontWeight: 600,

    '& span': { fontWeight: 400 },
  },
  message: { color: '#98a6ad' },
  note: { flexGrow: 1 },
  padding16: { padding: '16px' },
  noPanelPadding: {
    '& .ant-collapse-content-box': { padding: 0 },
    '& .ant-row': { padding: '16px' },
    '& .ant-divider-horizontal': { margin: 0 },
  },
  createNoteForm: {
    margin: '0.5rem -1rem -0.5rem -1rem',
    width: 'calc(100% + 2rem)',
  },
});