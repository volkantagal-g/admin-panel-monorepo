import { createUseStyles } from 'react-jss';

export default createUseStyles({
  actionButtonsWrapper: { textAlign: 'right' },
  formItemWrapper: { marginBottom: 0 },
  csvImportWrapper: {
    width: '100%',
    '& .ant-space-item': { width: '100%' },
  },
  csvButtonWrapper: { marginTop: '-8px' },
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
