import { createUseStyles } from 'react-jss';

export default createUseStyles({
  flex: { flex: 'auto' },
  fullWidth: { width: '100%' },
  justifyEnd: { display: 'flex', justifyContent: 'flex-end' },
  alignEnd: { display: 'flex', alignItems: 'flex-end' },
  selectHeight: {
    '& .ant-select-selector': {
      maxHeight: 90,
      overflow: 'scroll',
    },
  },
});
