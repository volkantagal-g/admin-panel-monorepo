import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    buttonContainer: { marginTop: '-5px' },
    tableSelectContainer: { '& .ant-form-item-with-help .ant-form-item-explain': { display: 'none' } },
  };
});
