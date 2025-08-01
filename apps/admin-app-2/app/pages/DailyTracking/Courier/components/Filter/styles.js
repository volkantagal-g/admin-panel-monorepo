import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    dateWrapper: {
      display: 'flex',
      'align-items': 'flex-start',
    },
    filterWrapper: { width: '100%' },
    filterItem: { 'min-width': '18rem' },
    searchInput: { 'max-width': '18rem' },
    domainTypeSpace: {
      'justify-content': 'space-between',
      width: '100%',
    },
    empty: { 'margin-top': '1rem' },
    row: { margin: '0 -8px 8px !important' },
  };
});
