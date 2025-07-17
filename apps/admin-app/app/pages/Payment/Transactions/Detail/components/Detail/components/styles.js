import { createUseStyles } from 'react-jss';

export default createUseStyles({

  paymentDetailCard: { width: '100%', backgroundColor: '#ffff', padding: 40 },
  itemRow: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0px' },
  collapseColumn: { width: '100%', display: 'flex', flexDirection: 'column', '& section': { marginBottom: 16 } },
  statusTag: { maxWidth: 'max-content' },
  capitalizeText: { textTransform: 'capitalize' },
});
