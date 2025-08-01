import { createUseStyles } from 'react-jss';

export default createUseStyles({
  antTable: { '& div.ant-table-body': { maxHeight: '100% !important' } },
  promoContainer: {
    maxHeight: '50px',
    overflow: 'scroll',
  },
});
