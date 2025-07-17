import { createUseStyles } from 'react-jss';

export default createUseStyles({
  addressDivider: { margin: '12px 0' },
  noFieldMargin: { '& .ant-form-item': { margin: 0 } },
  noPanelPadding: { '& .ant-collapse-content-box': { padding: 0 } },
  padding16: { padding: '16px' },
});