import { createUseStyles } from 'react-jss';

export default createUseStyles({
  coverageDiv: {
    padding: '5px',
    background: '#fff',
    height: '100%',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    marginBottom: '10px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sketchWrapper: {
    position: 'absolute',
    zIndex: '2',
  },
  sketchWrapperInner: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
  color: {
    width: '100%',
    height: '100%',
    borderRadius: '2px',
    background: props => props.pickerColor,
  },
});
