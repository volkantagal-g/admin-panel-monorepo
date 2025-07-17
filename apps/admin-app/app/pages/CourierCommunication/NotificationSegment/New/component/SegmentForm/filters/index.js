import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import CourierStarRating from './courierStarRating/index';
import General from './general/index';
import TotalOrderCount from './totalOrderCount/index';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import useStyles from './styles';

const KpiFilters = ({ getFilters, prevData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [general, setGeneral] = useState(null);
  const [rating, setRating] = useState(null);
  const [order, setOrder] = useState(null);

  const handleGeneral = useCallback(value => {
    setGeneral(value);
  }, [setGeneral]);

  const handleRating = useCallback(value => {
    setRating(value);
  }, [setRating]);

  const handleOrder = useCallback(value => {
    setOrder(value);
  }, [setOrder]);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  useEffect(() => {
    getFilters({ ...general, ...rating, ...order });
  }, [general, rating, order, getFilters]);

  return (
    <div data-testid="total-count-main-container" className={classes.filter}>
      <div className={classes.kpiFilter}>
        <General
          prevData={prevData?.general}
          getGeneralFilter={handleGeneral}
        />
      </div>
      <div className={classes.kpiFilter}>
        <CourierStarRating
          prevData={prevData?.courierStarRating}
          getRating={handleRating}
        />
      </div>
      <div className={classes.kpiFilter}>
        <TotalOrderCount
          prevData={prevData?.totalOrderCount}
          getOrder={handleOrder}
        />
      </div>
    </div>
  );
};

export default KpiFilters;
