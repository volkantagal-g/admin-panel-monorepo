import { createUseStyles } from 'react-jss';

export default createUseStyles({
  tableWrapper: {
    width: '100%',
    marginTop: '24px',
  },
  filterWrapper: { width: '100%' },
  buttonFilter: { backgroundColor: '#5D3EBC', color: '#fff' },
  updateSlotCapacityBtn: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'end',
    marginTop: '24px',
  },
  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  infoText: { marginTop: '12px' },
  infoIcon: { marginRight: '4px' },
});
