import { createUseStyles } from 'react-jss';

export default createUseStyles({
  reportTag: {
    backgroundColor: props => props.backgroundColor,
    color: props => props.textColor,
  },
});
