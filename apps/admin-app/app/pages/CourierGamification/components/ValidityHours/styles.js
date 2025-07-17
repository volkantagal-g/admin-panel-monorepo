import { createUseStyles } from 'react-jss';

export default createUseStyles(() => ({
  weekContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    overflowY: 'auto',
  },
  weekColumn: {
    display: 'flex',
    maxWidth: '300px',
  },
  dayContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  dayLabel: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '50px',
  },
  timePickerContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  timeRangesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
    marginLeft: '4px',
    flexDirection: 'column',
  },
  buttonContainer: { marginBottom: 16 },
  buttonWrapper: {
    textAlign: 'left',
    marginBottom: 8,
  },
  actionButton: { marginRight: 8 },
}));
