import { createUseStyles } from 'react-jss';

export default createUseStyles({
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '20px',
    borderRadius: '5px',
    fontSize: '12px',
    color: '#58666e',
    marginRight: '2px',
    padding: '0px 3.5px',
    '&:hover, &:active, &:focus': {
      backgroundColor: '#edf1f2',
      borderColor: '#c7d3d6',
      color: '#58666e',
    },
  },
  bgGreen: {
    color: '#ffffff',
    backgroundColor: '#27c24c',
    border: '1px solid #2cab4b',
    '&:hover, &:active, &:focus': {
      color: '#ffffff',
      backgroundColor: '#23ad44',
      borderColor: '#20a03f',
    },
  },
});
