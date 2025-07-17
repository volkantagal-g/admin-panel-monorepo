import { createUseStyles } from 'react-jss';

export default createUseStyles({
  countryContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px !important',
  },
  countryInputsContainer: {
    display: 'flex',
    gap: '12px !important',
  },
  countryRenderSpace: { padding: '10px 10px 5px 12px' },
  countryRenderDivider: { margin: '8px 0' },
});
