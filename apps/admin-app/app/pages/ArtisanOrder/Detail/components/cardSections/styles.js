import { createUseStyles } from 'react-jss';

export default createUseStyles({
  customerInfo: {},
  courierInfo: { padding: '0 10px' },
  ArtisanInfo: {},
  colInfo: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
    overflowWrap: 'break-word',
  },
  colMain: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  colMainAlignStart: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    marginBottom: '10px',
  },
  col1: {
    fontWeight: '700',
    width: '35%',
  },
  col2: {
    fontWeight: '400',
    width: '65%',
  },
  detailButton: {
    border: '1px solid #dddddd',
    padding: '3px 5px',
    color: '#000000',
  },
  alignStart: { alignItems: 'flex-start' },
  alignSelfStart: { alignSelf: 'flex-start' },
  warehouse: { color: '#000000' },
  customerServiceInfoIcon: {
    fontSize: '14px',
    color: 'red',
    padding: '0 5px',
  },
  customerServiceInfo: {
    fontSize: '14px',
    color: 'red',
  },
  wordBreakAll: { wordBreak: 'break-all' },
});
