import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Card } from 'antd';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Header, PlanImporter, ExampleCSV, ExcelExport } from './components';

import useStyles from './components/Header/styles';
import { COURIER_PLAN_TYPE_KEYS, EMPLOYEE_TYPE } from './constants';
import { courierPlanTypeSelector } from './redux/selectors';

function StaffPlanPublication() {
  usePageViewAnalytics({ name: ROUTE.STAFF_PLAN_PUBLICATION.name, squad: ROUTE.STAFF_PLAN_PUBLICATION.squad });
  const dispatch = useDispatch();
  const classes = useStyles();

  const [filters, setFilters] = useState({ employeeType: EMPLOYEE_TYPE.COURIER });

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const courierPlanType = useSelector(courierPlanTypeSelector.getData);

  return (
    <div>
      <Card className={classes.headerContainer}>
        <Header filters={filters} setFilters={setFilters} />
        <PlanImporter employeeType={filters.employeeType} />
      </Card>
      <ExampleCSV employeeType={filters.employeeType} />
      {courierPlanType === COURIER_PLAN_TYPE_KEYS.SLOT_CAPACITY && <ExcelExport />}
    </div>
  );
}

const reduxKey = REDUX_KEY.STAFF_PLAN_PUBLICATION;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(StaffPlanPublication);
