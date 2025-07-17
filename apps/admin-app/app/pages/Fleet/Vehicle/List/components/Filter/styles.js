import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    filterWrapper: { width: '100%' },
    formItem: { marginBottom: '0 !important' },
    wrapper: { width: '100%' },
    submitButtonContainer: { display: 'flex', justifyContent: 'flex-end' },
    selectWarehouseType: { width: '100%' },
    domainTypeSelect: { width: '100%' },
  };
});
