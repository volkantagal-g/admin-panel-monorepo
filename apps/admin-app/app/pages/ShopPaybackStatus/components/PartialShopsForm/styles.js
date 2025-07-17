import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    submitButton: { float: 'right' },
    spinContainer: { display: 'flex', justifyContent: 'center', width: '100%' },
    downloadLink: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    downloadIcon: { fontSize: '20px' },
  };
});
