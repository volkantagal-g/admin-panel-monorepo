import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  courierInfo: { padding: '0 10px' },
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
    flexWrap: 'wrap',
  },
  col1: { fontWeight: '700' },
  col2: { fontWeight: '400' },
  detailButton: {
    border: '1px solid #dddddd',
    padding: '3px 5px',
    color: '#000000',
  },
  warehouse: { color: '#000000' },
  successTag: {
    backgroundColor: theme.color.status.success,
    color: '#ffffff',
    borderRadius: '5px',
  },
  table: {
    '& .ant-table-cell-with-append': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  price: {
    color: '#5D3EBC',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceWithDiscount: {
    display: 'flex',
    flexDirection: 'column',
    '& del': { fontSize: 10 },
  },
}));
