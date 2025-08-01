import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return { antTable: { '& div.ant-table-body': { maxHeight: '100% !important' } } };
});
