import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Col, DatePicker, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';

import useStyles from '../../styles';
import { Creators } from '../../redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import SelectCity from '@shared/containers/Select/City';
import SelectFranchise from '@shared/containers/Select/Franchise';
import { leaveManagementReportSelector } from '../../redux/selectors';
import { getSelectedCountryTimezone, getCitiesSelector } from '@shared/redux/selectors/common';

const LeaveManagementReportFilter = () => {
  const { t } = useTranslation(['global', 'workforceReports']);
  const dispatch = useDispatch();
  const classes = useStyles();

  const reportDownloadPending = useSelector(leaveManagementReportSelector.getIsPending);
  const selectedCountryTimezone = getSelectedCountryTimezone.getData();
  const utcOffset = moment.tz(selectedCountryTimezone).utcOffset();
  const cities = useSelector(getCitiesSelector.getData);
  const citiesPending = useSelector(getCitiesSelector.getIsPending);

  const [date, setDate] = useState();
  const [franchiseIds, setFranchiseIds] = useState();
  const [cityIds, setCityIds] = useState([]);
  useEffect(() => setCityIds(cities.map(item => item._id)), [cities]);
  useEffect(() => setFranchiseIds([]), [cityIds]);

  const downloadReport = () => {
    const startDatetime = date[0] ? moment(date[0]).utc().startOf('day') : undefined;
    const endDatetime = date[1] ? moment(date[1]).utc().endOf('day') : undefined;
    dispatch(Creators.getLeaveManagementReportRequest({
      startDatetime,
      endDatetime,
      franchiseIds,
      utcOffset,
    }));
  };

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  const isPending = citiesPending || reportDownloadPending;

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Text>{t('global:DATE')}</Text>
        <DatePicker.RangePicker
          onChange={setDate}
          value={date}
          className={classes.fullWidth}
          allowClear={false}
          disabled={reportDownloadPending}
        />
      </Col>
      <Col span={12}>
        <Text>{t('global:CITIES')}</Text>
        <SelectCity
          value={cityIds}
          onChange={setCityIds}
          defaultValue={cityIds}
          className={classes.selectHeight}
          loading={isPending}
          isDisabled={isPending}
          showArrow
          allowClear
          isMultiple
        />
      </Col>
      <Col span={12}>
        <Text>{t('global:FRANCHISE')}</Text>
        <SelectFranchise
          value={franchiseIds}
          onChange={setFranchiseIds}
          disabled={isPending}
          cityIds={cityIds?.length ? cityIds : undefined}
          className={classes.selectHeight}
          showAllOption
          isMultiple
          allowClear
        />
      </Col>
      <Col span={24} className={classes.justifyEnd}>
        <Button disabled={!date || !franchiseIds.length || reportDownloadPending} type="primary" onClick={downloadReport}>
          {t('workforceReports:DOWNLOAD_REPORT')}
        </Button>
      </Col>
    </Row>
  );
};

export default LeaveManagementReportFilter;
