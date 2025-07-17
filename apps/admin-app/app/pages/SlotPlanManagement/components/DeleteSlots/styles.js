import { createUseStyles } from 'react-jss';

export default createUseStyles({
  fullWidth: { width: '100%' },
  justifyEnd: { display: 'flex', justifyContent: 'flex-end' },
  selectHeight: {
    '& .ant-select-selector': {
      maxHeight: 90,
      overflow: 'scroll',
    },
  },
});
