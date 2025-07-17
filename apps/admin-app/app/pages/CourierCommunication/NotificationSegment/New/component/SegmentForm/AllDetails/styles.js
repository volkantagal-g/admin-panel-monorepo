import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    segmentDetails: { margin: '2%' },
    segmentName: { display: 'flex' },
    segmentDescription: { display: 'flex', marginTop: '1%' },
    labelName: { marginRight: '3%', paddingTop: '0.5%' },
    labelDescription: { marginRight: '2.5%', paddingTop: '0.5%' },
    input: { width: '40%' },
    inputCard: { display: 'flex', width: '80%', justifyContent: 'space-between' },
    check: { color: 'green' },
    cancel: { color: 'red' },
    filter: { marginLeft: '1%', fontSize: '14px' },
  };
});
