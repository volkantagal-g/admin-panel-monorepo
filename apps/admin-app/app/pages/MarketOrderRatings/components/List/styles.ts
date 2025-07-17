import { createUseStyles } from 'react-jss';

export default createUseStyles({
  tag: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagButton: { display: 'flex', alignItems: 'center' },
  rating: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  ratingContainer: { width: '20%' },
  ratingCard: {
    height: 700,
    overflow: 'auto',
  },
  ratingStar: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});
