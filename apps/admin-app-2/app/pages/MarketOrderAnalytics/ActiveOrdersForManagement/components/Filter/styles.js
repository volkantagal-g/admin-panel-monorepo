import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    filterWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-evenly',
      '& .ant-form-item-explain-connected': { display: 'none' },
    },
    selectInput: { width: '100%', marginBottom: 0, paddingRight: '1px', paddingLeft: '1px' },
  };
});
