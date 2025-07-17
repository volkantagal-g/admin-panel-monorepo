import { createUseStyles } from 'react-jss';

export default createUseStyles({
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '26px',
    borderRadius: '6px',
    fontSize: '12px',
    color: '#58666e',
    '&:hover, &:active, &:focus': {
      backgroundColor: '#edf1f2',
      borderColor: '#c7d3d6',
      color: '#58666e',
    },
  },
  container: {
    marginBottom: '5px !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButtonWrapper: {
    fontSize: '14px',
    color: 'red',
  },
  showCourierTypeButtonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
