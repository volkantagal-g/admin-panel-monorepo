import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  requiredField: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 700,
    color: theme.color.red,
  },
  disabledSelectedButton: {
    '& .ant-radio-button-wrapper-checked': {
      borderColor: '#8063c9',
      color: '#8063c9',
    },
  },
}));
