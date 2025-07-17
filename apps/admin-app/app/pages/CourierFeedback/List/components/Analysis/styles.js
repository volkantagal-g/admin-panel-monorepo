import { createUseStyles } from 'react-jss';

export default createUseStyles({
  noDataContainer: {
    height: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: { '& .ant-card-head': { height: 27.84 } },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
