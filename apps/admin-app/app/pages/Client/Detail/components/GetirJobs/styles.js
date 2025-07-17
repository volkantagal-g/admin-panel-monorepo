import { createUseStyles } from 'react-jss';

export default createUseStyles({
  noPanelPadding: { '& .ant-collapse-content-box': { padding: 0 } },
  activeStatus: {
    color: '#28A745',
    display: 'inline-block',
    height: 'auto',
    marginRight: '8px',
    padding: '0 7px',
    fontSize: ' 12px',
    lineHeight: ' 20px',
  },
  closedStatus: {
    color: '#58666E',
    display: 'inline-block',
    height: 'auto',
    marginRight: '8px',
    padding: '0 7px',
    fontSize: '12px',
    lineHeight: '20px',
  },
});
