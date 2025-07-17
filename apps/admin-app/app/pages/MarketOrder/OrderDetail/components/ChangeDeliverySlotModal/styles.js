import { createUseStyles } from 'react-jss';

export default createUseStyles({
  slotWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '10px',
    alignItems: 'center',
    height: 45,
    fontSize: '14px',
    fontWeight: 500,

  },
  daycontainers: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 5,
  },
  slotContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  seperator: {
    width: '100%',
    height: '1px',
    backgroundColor: '#F0F1F3',
    margin: '10px 0',
  },
  slotRadioGroupWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 3,
    height: 'auto',
    maxHeight: '300px',
    overflowY: 'scroll',
    width: '100%',

  },
  slotRadioWrapper: {
    borderRadius: '8px',
    padding: '3px',
    display: 'flex',
    alignItems: 'center',
    marginBlock: '3px',
    border: '2px solid #F0F1F3',
    boxShadow: '0 0.1rem 0.125rem 0 rgba(138, 142, 148, 0.12)',
  },
  disabledSlot: { backgroundColor: '#F0F1F3' },
  deliveryFee: { color: '#888', fontSize: '12px' },
  resultWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
