import { createUseStyles } from 'react-jss';

export default createUseStyles({
  removeIcon: { marginTop: 4, fontSize: 24, cursor: 'pointer' },
  addIconGrid: {
    color: 'green',
    width: '100%',
    padding: 4,
    border: '1px dashed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  addPaymentMethod: {
    color: 'green',
    width: '100%',
    padding: 4,
    border: '1px dashed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 548,
  },
  removeCardIcon: {
    position: 'absolute',
    top: '-16px',
    fontSize: 24,
    right: '-12px',
  },
  addIcon: { cursor: 'pointer', marginRight: 4 },
  formListHeader: { marginBottom: 8, textAlign: 'center' },
  cardSection: { marginBottom: 16 },
  textCenter: { textAlign: 'center' },
  inputNumberSize: { width: '100px' },
  inputSplitBox: {
    width: '30px !important',
    borderLeft: 0,
    borderRight: 0,
    pointerEvents: 'none',
  },
});
