import { createUseStyles } from 'react-jss';

export default createUseStyles({
  imageSize: {
    minHeight: 18,
    minWidth: 40,
    objectFit: 'contain',
  },
  providerFitCellSize: { width: 115 },
  providerAutoCellSize: { width: 'auto' },
});
