import { createUseStyles } from 'react-jss';

export default createUseStyles({
  courierCountTableWrapper: {
    marginBottom: '8px',
    borderRadius: '5px 5px',
    backgroundColor: '#fff',
    boxShadow: '2px 2px 10px rgb(0 0 0 / 10%)',
  },
  table: {
    width: 'auto !important',
    padding: '0 5px',
    overflowY: 'auto',
    maxHeight: '200px',
  },
  innerTable: { marginLeft: '0 !important' },
  cell: {
    padding: '1px !important',
    fontSize: '11px !important',
  },
  alignRight: { textAlign: 'right' },
  name: {
    fontWeight: 'bold !important',
    padding: '4px 0 !important',
  },
  planned: {
    color: '#697488 !important',
    fontSize: '11px !important',
  },
  totalCourier: {
    fontWeight: 'bold !important',
    color: '#58666E !important',
  },
  freeCourier: {
    fontWeight: 'bold !important',
    color: '#1C8C04 !important',
  },
  onDuty: {
    fontWeight: 'bold !important',
    color: '#5D3EBC !important',
  },
  returning: {
    fontWeight: 'bold !important',
    color: '#FF974A !important',
  },
  busy: {
    fontWeight: 'bold !important',
    color: '#F05050 !important',
  },
  utilization: {
    fontWeight: 'bold !important',
    color: '#24B7E6 !important',
  },
});
