import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, DatePicker, Popconfirm, Row } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import { Header } from './components';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { timesheetsSelector } from './redux/selectors';
import { TIMESHEET_ACTION } from './constants';
import { getBetweenDates, getTimesheetAction } from './utils';
import useStyles from './styles';

const reduxKey = REDUX_KEY.TIMESHEET_LOCK;

const TimesheetLockPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles({});
  const { t } = useTranslation('timesheetLock');
  usePageViewAnalytics({ name: ROUTE.WORKFORCE_EMPLOYEE_TIMESHEET_LOCK.name, squad: ROUTE.WORKFORCE_EMPLOYEE_TIMESHEET_LOCK.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [dateRange, setDateRange] = useState(null);
  const [timesheetAction, setTimesheetAction] = useState(null);

  const isPending = useSelector(timesheetsSelector.getIsPending);
  const isActionSuccess = useSelector(timesheetsSelector.getIsActionSuccess);
  const timesheets = useSelector(timesheetsSelector.getData);

  const handleDateRangeChange = useCallback(values => {
    if (values) {
      const [startDate, endDate] = values;

      const action = getTimesheetAction(timesheets, startDate, endDate);

      setTimesheetAction(action);
      setDateRange(values);
    }
    else {
      setTimesheetAction(null);
      setDateRange(values);
    }
  }, [timesheets]);

  const handleTimesheetAction = action => {
    const [minDate, maxDate] = dateRange;

    const selectedCountry = getSelectedCountry();
    const countryCode = get(selectedCountry, 'code.alpha2', '');

    const dates = getBetweenDates(minDate, maxDate);

    if (action === TIMESHEET_ACTION.LOCK) {
      dispatch(Creators.lockTimesheetsRequest({ dates, countryCode }));
    }
    else {
      dispatch(Creators.unlockTimesheetsRequest({ dates, countryCode }));
    }
  };

  const dateRender = useCallback(currentDate => {
    if (timesheets && timesheets.length) {
      const timesheet = timesheets.find(ts => moment(ts.date).format('YYYY-MM-DD') === moment(currentDate).format('YYYY-MM-DD'));
      const isLocked = timesheet && timesheet.isLocked;

      return (
        <div
          className={`ant-picker-cell-inner ${isLocked ? classes.lockedDateCell : classes.unlockedDateCell}`}
        >
          {currentDate.date()}
        </div>
      );
    }

    return (
      <div
        className={`ant-picker-cell-inner ${classes.unlockedDateCell}`}
      >{currentDate.date()}
      </div>
    );
  }, [timesheets, classes]);

  const getTimesheets = useCallback(() => {
    const selectedCountry = getSelectedCountry();
    const countryCode = get(selectedCountry, 'code.alpha2', '');
    dispatch(Creators.filterLockedTimesheetsRequest({ countryCode }));
  }, [dispatch]);

  useEffect(() => {
    if (isActionSuccess) {
      getTimesheets();
      setDateRange(null);
      setTimesheetAction(null);
      toast.success(t('TIMESHEET_ACTION_SUCCESS'));
    }
  }, [isActionSuccess, getTimesheets, t]);

  useEffect(() => {
    getTimesheets();
  }, [getTimesheets]);

  return (
    <div>
      <Header />
      <Row gutter={[8, 8]}>
        <Col>
          <DatePicker.RangePicker
            dateRender={dateRender}
            value={dateRange}
            onChange={handleDateRangeChange}
            dropdownClassName={classes.datePicker}
          />
        </Col>
        {timesheetAction && (
          <Col data-testid="action-buttons">
            {timesheetAction !== TIMESHEET_ACTION.BOTH ? (
              <Popconfirm
                disabled={isPending}
                onConfirm={() => handleTimesheetAction(timesheetAction)}
                okText={t('button:YES')}
                cancelText={t('button:CANCEL')}
                title={t(`TIMESHEET_ACTION_CONFIRM.${timesheetAction}`)}
              >
                <Button type="primary" loading={isPending} disabled={isPending}>
                  {t(`TIMESHEET_ACTION.${timesheetAction}`)}
                </Button>
              </Popconfirm>
            ) : (
              <Row gutter={[8, 8]}>
                <Col>
                  <Popconfirm
                    disabled={isPending}
                    onConfirm={() => handleTimesheetAction(TIMESHEET_ACTION.LOCK)}
                    okText={t('button:YES')}
                    cancelText={t('button:CANCEL')}
                    title={t(`TIMESHEET_ACTION_CONFIRM.${TIMESHEET_ACTION.LOCK}`)}
                  >
                    <Button type="primary" loading={isPending} disabled={isPending}>
                      {t(`TIMESHEET_ACTION.${TIMESHEET_ACTION.LOCK}`)}
                    </Button>
                  </Popconfirm>
                </Col>
                <Col>
                  <Popconfirm
                    disabled={isPending}
                    onConfirm={() => handleTimesheetAction(TIMESHEET_ACTION.UNLOCK)}
                    okText={t('button:YES')}
                    cancelText={t('button:CANCEL')}
                    title={t(`TIMESHEET_ACTION_CONFIRM.${TIMESHEET_ACTION.UNLOCK}`)}
                  >
                    <Button type="primary" loading={isPending} disabled={isPending}>
                      {t(`TIMESHEET_ACTION.${TIMESHEET_ACTION.UNLOCK}`)}
                    </Button>
                  </Popconfirm>
                </Col>
              </Row>
            )}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default TimesheetLockPage;
