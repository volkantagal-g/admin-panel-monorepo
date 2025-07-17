import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    filterWrapper: { width: '100%' },
    domainTypeSelect: { width: '100%' },
    selection: { width: '100%' },
    selectWarehouseType: { width: '100%' },
    submitButtonContainer: { display: 'flex', justifyContent: 'flex-end' },
  };
});
