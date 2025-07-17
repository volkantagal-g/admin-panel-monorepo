import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    cardWrapper: {
      '& .ant-card-body': { padding: '8px 16px 8px 0px' },
      height: 'auto',
      width: '100%',
      '@media (min-width: 768px)': { marginLeft: '15px' },
    },
    filterWrapper: { width: '100%', paddingLeft: '15px' },
    domainTypeSelect: { width: '100%' },
    polygonTypeSelect: { width: '100%' },
    jsonView: {
      width: '100%',
      height: 'auto',
      minHeight: '250px',
    },
  };
});
