import { useState } from 'react';
import { Form, DatePicker, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';

import { getLocalDateFormat } from '@shared/utils/localization';

import { SUMMARY_INITIAL_FILTERS, INITIAL_DATE_RANGE, MAX_DATE_RANGE_IN_DAYS } from '../../constants';

import { LocalsERPDataTrackingSummaryExcelExportSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

const { RangePicker } = DatePicker;

const Filters = ({ onChangeFilters }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('localsERPDataTrackingPage');
  const isExcelPending = useSelector(LocalsERPDataTrackingSummaryExcelExportSelector.getIsPending);

  const [dateRange, setDateRange] = useState(() => INITIAL_DATE_RANGE);

  const isExcelDisabled = !dateRange || !dateRange[0] || !dateRange[1];

  const disabledDate = current => {
    if (!dateRange || dateRange.length === 0) {
      return false;
    }
    const laterThanToday = current && current > moment().endOf('day');
    const tooLate = dateRange[0] && current.diff(dateRange[0], 'days') > MAX_DATE_RANGE_IN_DAYS;
    const tooEarly = dateRange[1] && dateRange[1].diff(current, 'days') > MAX_DATE_RANGE_IN_DAYS;
    return laterThanToday || tooEarly || tooLate;
  };

  const handleExcelExport = () => {
    dispatch(
      Creators.getLocalsERPDataTrackingSummaryExcelExportRequest({
        startDate: moment(dateRange[0]).format('YYYY-MM-DD'),
        endDate: moment(dateRange[1]).format('YYYY-MM-DD'),
      }),
    );
  };

  return (
    <Form initialValues={SUMMARY_INITIAL_FILTERS} onValuesChange={onChangeFilters} className="d-flex justify-content-between">
      <Form.Item
        name="dateRange"
        label={t('RANGE_PICKER_LABEL')}
        colon={false}
        rules={[{ required: true }]}
      >
        <RangePicker
          onCalendarChange={setDateRange}
          disabledDate={disabledDate}
          format={getLocalDateFormat()}
        />
      </Form.Item>

      <Button
        loading={isExcelPending}
        disabled={isExcelDisabled}
        type="primary"
        onClick={handleExcelExport}
      >
        {t('SUMMARY.EXCEL_EXPORT')}
      </Button>
    </Form>
  );
};

export default Filters;
