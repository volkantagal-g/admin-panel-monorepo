import { createUseStyles } from 'react-jss';

export default createUseStyles({
  importFooter: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  importHeader: { fontSize: 14, fontWeight: 'bold' },
  importLevelsInfo: { fontSize: 12, fontWeight: 600, color: 'gray' },
});
