import { createUseStyles } from 'react-jss';

export default createUseStyles({
  identifiersHeader: {
    marginBottom: 16,
    textAlign: 'center',
  },
  addPaymentMethod: {
    color: 'green',
    width: '100%',
    padding: 4,
    border: '1px dashed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 518,
  },
  addIconGrid: {
    color: 'green',
    width: '100%',
    padding: 4,
    border: '1px dashed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeCardIcon: {
    position: 'absolute',
    top: '-16px',
    fontSize: 24,
    right: '-12px',
  },
  removeIcon: { marginTop: 4, fontSize: 24, cursor: 'pointer' },
  collapseColumn: { width: '100%', display: 'flex', flexDirection: 'column', '& section': { marginBottom: 16 } },
  textCenter: { textAlign: 'center' },
  fullHeight: { height: '100%' },
  fullWidth: { width: '100%' },
  inputNumberSize: { width: '110px' },
  inputSplitBox: {
    width: '30px !important',
    pointerEvents: 'none',
  },
  paymentMethodGrid: { paddingTop: 8 },
  enabledArea: { display: 'flex', justifyContent: 'center', textAlign: 'center' },
});
