import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    card: { '& > *': { margin: '6px 0' } },
    alert: { width: 'max-content' },
    button: { textAlign: props => (props.isPending ? 'center' : 'initial'), width: '150px' },
    buttonContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      visibility: props => props.isPending && 'hidden',
    },
  };
});
