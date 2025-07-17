import { createUseStyles } from 'react-jss';

export default createUseStyles({
  actionButtonsWrapper: { textAlign: 'right' },
  formItemWrapper: { marginBottom: 0 },
  ignoreCurrentStockField: {
    '& .ant-checkbox-inner': {
      height: '30px',
      width: '30px',
    },
    '& .ant-checkbox-inner::after': {
      height: '14px',
      top: '45%',
      left: '28.5%',
    },
  },
});
