import { createUseStyles } from 'react-jss';

export default createUseStyles({
  switchBtnContainer: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height: '100%',
    // @ts-ignore
    '& .ant-switch-inner': { fontSize: props => (props.theme.isLargeScreen ? '18px' : '12px') },
  },
  exportBtn: { fontSize: 21 },
  lastUpdateDatesWrapper: {
    marginLeft: 'auto',
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'flex-end',
    '& p': {
      // @ts-ignore
      fontSize: props => (props.theme.isLargeScreen ? '18px' : '14px'),
      fontWeight: 700,
      margin: 0,
    },
  },
});
