import { createUseStyles } from 'react-jss';

export default createUseStyles({
  colInfo: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
    overflowWrap: 'break-word',
  },
  colMain: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  col1: {
    fontWeight: '700',
    width: '35%',
  },
  col2: {
    fontWeight: '400',
    width: '65%',
  },
  detailButton: {
    '& .ant-btn': {
      border: '1px solid #dddddd !important',
      padding: '3px 5px !important',
      color: '#000000 !important',
    },
  },
});
