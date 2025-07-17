import { useSelector } from 'react-redux';

import Odometer from 'react-odometerjs';

import 'odometer/themes/odometer-theme-car.css';
import useStyles from './styles';

import { totalOrderCountsDataSelector } from '../../redux/selectors';

const OdometerWrapper = () => {
  const classes = useStyles();
  const totalOrderCountsData = useSelector(totalOrderCountsDataSelector.getData);

  return (
    <div
      className={classes.odometerWrapper}
    >
      <Odometer
        value={totalOrderCountsData}
        format="(.ddd)"
        theme="car"
        style={{ fontSize: '8vw' }}
        data-testid="odometer"
      />
    </div>
  );
};

export default OdometerWrapper;
