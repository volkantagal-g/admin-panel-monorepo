import { createUseStyles } from 'react-jss';

export default createUseStyles({
  customerInfo: {},
  courierInfo: { padding: '0 10px' },
  ArtisanInfo: {},
  colInfo: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
  },
  colMain: {
    display: 'flex',
    justifyContent: 'space-between',
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
  warehouse: { color: '#000000' },
});
