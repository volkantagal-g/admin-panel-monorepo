import { createUseStyles } from 'react-jss';

export default createUseStyles({
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '4px 8px',
    '& .ant-pagination-item-link': { backgroundColor: 'transparent' },
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
  },
  limitContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 7,
  },
  limitLabel: { marginRight: 8, color: '#9e9e9e' },
  limitSelectBox: { width: 65 },
  totalLabel: { marginRight: 8 },
});
