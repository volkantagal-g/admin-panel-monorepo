import { createUseStyles } from 'react-jss';

export default createUseStyles({
  iconBasic: {
    fontSize: 'x-large',
    verticalAlign: 'middle',
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    pointerEvents: props => props.pointerEvents,
    opacity: props => props.opacity,
  },
});
