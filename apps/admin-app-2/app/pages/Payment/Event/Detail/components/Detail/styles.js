import { createUseStyles } from 'react-jss';

export default createUseStyles({

  paymentDetailCard: { width: '100%', backgroundColor: '#ffff', padding: 24 },
  collapseColumn: { width: '100%', display: 'flex', flexDirection: 'column', '& section': { marginBottom: 16 } },
  itemRow: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0px', gap: 16 },
  fullWidth: { width: '100%' },
  statusTag: { maxWidth: 'max-content', margin: 0 },
  overflowList: { maxHeight: 60, overflowY: 'auto', overflowX: 'hidden' },
  overflowText: { overflowWrap: 'anywhere' },
});
