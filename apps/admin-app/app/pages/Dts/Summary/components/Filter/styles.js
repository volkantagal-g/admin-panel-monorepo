import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    dateWrapper: {
      'display': 'flex',
      'align-items': 'flex-start',
    },
    filterWrapper: {
      width: '100%',
      'align-items': 'flex-start',
    },
    filterItem: { 'min-width': '18rem' },
    searchInput: { 'max-width': '18rem' },
    domainTypeSpace: {
      'justify-content': 'space-between',
      'width': '100%',
    },
    selectButtonContainer: {
      'max-width': '18rem',
      'width': '100%',
      'justify-content': 'space-between',
    },
    footerContainer: {
      width: '100%',
      'justify-content': 'space-between',
    },
  };
});
