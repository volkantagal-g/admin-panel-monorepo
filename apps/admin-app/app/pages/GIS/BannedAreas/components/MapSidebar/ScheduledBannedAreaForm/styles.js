import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    cardWrapper: {
      marginLeft: '15px',
      '& .ant-card-body': { padding: '8px 16px 8px 0px' },
    },
    filterWrapper: { width: '100%', paddingLeft: '15px' },
    domainTypeSelect: { width: '100%' },
    polygonTypeSelect: { width: '100%' },
    jsonView: {
      width: '100%',
      height: 'auto',
      minHeight: '250px',
    },
    alertWrapper: { marginTop: '5px' },
  };
});
