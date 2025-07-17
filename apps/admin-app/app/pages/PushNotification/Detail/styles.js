import { createUseStyles } from 'react-jss';

export default createUseStyles({
  antDefaultForm: { '& .ant-form-item-explain': { height: '32px' } },
  notificationHeader: {
    '@media (max-width: 768px)': {
      '& .ant-page-header-heading-extra': {
        width: '100%',
        '& button': { display: 'block', margin: '5px 0px', width: '100%' },
        '& .ant-badge': { display: 'block', margin: '5px 0px', width: '100%' },
      },
    },
  },
});
