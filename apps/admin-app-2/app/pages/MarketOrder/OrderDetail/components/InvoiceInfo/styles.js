import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  infoCard: { height: '7rem' },
  infoCardLabel: {
    display: 'flex',
    gap: 8,
    alignItems: 'baseline',
    lineHeight: '0.75rem',
    paddingBottom: '0.75rem',
  },
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
  downloadIcon: { marginLeft: '5px', fontSize: 'bold' },
  linkIcon: { marginLeft: '5px', fontSize: 'bold', color: theme.color.primary },
}));
