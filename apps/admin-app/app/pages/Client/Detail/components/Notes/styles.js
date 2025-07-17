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
  noPanelPadding: { '& .ant-collapse-content-box': { padding: 0 } },
  title: {
    fontWeight: 600,

    '& span': { fontWeight: 400 },
  },
  message: { color: '#98a6ad' },
  note: { flexGrow: 1 },
  padding16: { padding: '16px' },
  createNoteForm: {
    margin: '0.5rem -0.1rem',
    width: 'calc(100% + 2rem)',
  },
});