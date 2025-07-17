import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    segmentForm: {
      backgroundColor: 'white',
      minHeight: '80%',
      maxHeight: 'auto',
      borderRadius: '5px',
    },
    content: {
      marginTop: '1%',
      height: '45%',
      overflowY: 'scroll',
    },
    steps: { padding: '2% 2% 0% 2%' },
    segmentDetailForm: { margin: '2% 2% 2% 2%' },
  };
});
