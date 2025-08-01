import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  discountLink: {
    paddingRight: '2px',
    textDecoration: 'underline',
  },
  discountReasonMessage: { padding: '5px 0' },
  formContainer: {
    border: '1px solid #f0f0f0',
    padding: '12px',
    marginTop: '14px',
  },
  title: {
    display: 'block',
    marginBottom: '5px',
  },
  infoText: { color: 'green' },
  infoTextContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    display: 'block',
    width: '100%',
    border: 'none',
    padding: '0 5px',
  },
  countrySelect: { width: '100%' },
  formRow: { marginTop: '14px' },
  inputNumberWrapper: { display: 'flex' },
  inputNumberSuffix: { width: '40px' },
  inputNumber: { width: '100%' },
  feeContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  feeLabel: { marginRight: 4 },
  feeItem: { display: 'flex' },
  requiredField: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 700,
    color: theme.color.red,
  },
}));
