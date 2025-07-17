import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    submitButton: { paddingTop: '12px', textAlign: 'right' },
    card: { '& > *': { margin: '6px 0' } },
    alert: { width: 'max-content' },
    buttonText: {
      visibility: props => props.isPending && 'hidden',
      height: props => props.isPending && '0px',
      padding: props => (props.isPending ? '0px 15px' : '5.6px 15px'),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    button: { padding: '0', textAlign: props => (props.isPending ? 'center' : 'initial'), width: '180px' },
    downloadLink: { display: 'flex', alignItems: 'center' },
    downloadIcon: { fontSize: '18px', marginLeft: '8px' },
    radioGroup: { display: 'flex', flexDirection: 'column' },
    radioGroupInfoText: { fontSize: 10, color: '#999' },
  };
});
