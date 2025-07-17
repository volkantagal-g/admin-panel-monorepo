import { createUseStyles } from 'react-jss';

export default createUseStyles({
  searchContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    '& > *': { margin: '0 5px 0 5px' },
  },
  formItem: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': { margin: '0 5px 0 5px', flex: '0 1 auto !important' },
    ' & .ant-form-item-control': { flex: '1 1 auto !important' },
    '& label': { margin: 0 },
  },
});
