import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    fullWidth: { width: '100%' },
    buttonWrapper: { marginTop: '.5rem' },
    textWithCsv: { display: 'flex', flexDirection: 'row', position: 'relative', '& > *': { marginLeft: '4px' } },
    csvInput: { position: 'absolute', right: '10px' },
  };
});
