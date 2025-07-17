import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    submitButton: { paddingTop: '12px', textAlign: 'right' },
    alert: { width: 'max-content' },
    radioGroup: { display: 'flex', flexDirection: 'column' },
    radioGroupInfoText: { fontSize: 10, color: '#999' },
  };
});
