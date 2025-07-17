import { createUseStyles } from 'react-jss';

export default createUseStyles({
  content: { display: 'flex', gap: '8px', flexDirection: 'column', justifyContent: 'center' },
  title: { fontWeight: 600, fontSize: '16px' },
  infoIcon: { marginLeft: '5px' },
  button: { marginTop: '8px' },
  buttons: { display: 'flex', gap: '8px' },
  item: { display: 'flex', gap: '4px', flexDirection: 'column', borderBottom: '1px dashed black', paddingBottom: '8px', '& .ant-form-item': { margin: 0 } },
});
