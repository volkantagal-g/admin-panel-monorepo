import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    imageUploader: { '& .ant-upload': { width: '100%' } },
    labelWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      '& .anticon': { marginRight: '3px' },
    },
    iconWrapper: { cursor: 'pointer' },
    formItemWrapper: { '& label': { width: '100%' } },
  };
});
