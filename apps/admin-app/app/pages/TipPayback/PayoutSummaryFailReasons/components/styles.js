import { createUseStyles } from 'react-jss';

export default createUseStyles({
  statCard: { width: '100%', backgroundColor: '#ffff', padding: 24, flexDirection: 'column' },
  statTitle: { height: 50 },
  statDescription: { margin: '8px 0px', fontSize: 16 },
  filterItem: { width: '100%' },
  margin8: { margin: '8px 0px' },
  marginBottom16: { marginBottom: '16px' },
  statusTag: {
    margin: '8px 0px',
    fontSize: 16,
    maxWidth: 'fit-content',
    height: 25,
  },
  expandedTipColumn: { paddingLeft: 600, width: 220 },
});
