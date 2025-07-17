import { createUseStyles } from 'react-jss';

export default createUseStyles({
  attendanceLegend: {
    display: 'flex',
    background: 'white',
    borderRadius: '4px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    gap: '8px',
    padding: '4px',
  },
  legendItem: {
    border: '1px solid #58666E',
    borderRadius: '4px',
    padding: '1px 4px',
  },
});
