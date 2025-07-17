import { createUseStyles } from 'react-jss';

export default createUseStyles({
  notAutoCompleteItem: {
    marginBottom: '0px !important',
    '& .flabel': { fontSize: '12px !important' },
  },
  autoCompleteItem: {
    width: '100%',
    '& .ant-select-selector': {
      minHeight: '40px !important',
      display: 'flex',
      alignItems: 'center',
    },
  },
  endOfFilter: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
