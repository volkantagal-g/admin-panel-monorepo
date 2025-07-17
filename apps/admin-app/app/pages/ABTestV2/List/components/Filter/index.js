import { Col, Form, Row } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Space, TextInput, Button, FormItem } from '@shared/components/GUI';
import { RangePicker } from '@shared/components/GUI/RangePicker';
import { MIN_SEARCH_INPUT_LENGTH } from '@app/pages/ABTestV2/constants';
import { Creators } from '../../redux/actions';
import { getABTestsSelector } from '../../redux/selectors';
import { getFormattedRequestData, getInitialDates } from '../../utils';
import { rules } from '../../../formHelper';

import useStyles from './styles';

export default function Filter() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('abTestingV2Page');

  const [dateRange, setDateRange] = useState(getInitialDates);
  const [testName, setTestName] = useState('');
  const [experimentId, setExperimentId] = useState('');

  const isAbTestsPending = useSelector(getABTestsSelector.getIsPending);
  const initialValues = { testName, experimentId, dateRange };

  return (
    <Form initialValues={initialValues}>
      <Space title={t('FILTER')} className="w-100">
        <Row
          justify="space-between"
          align="middle"
          className={classes.filterRow}
        >
          <Col sm={11} xs={24}>
            <FormItem name="testName" rules={rules.minLength}>
              <TextInput
                disabled={isAbTestsPending}
                value={testName}
                label={t('TEST_NAME')}
                data-testid="filter-test-name"
                onChange={handleTestNameChange}
              />
            </FormItem>
          </Col>
          <Col sm={11} xs={24}>
            <FormItem name="experimentId" rules={rules.minLength}>
              <TextInput
                disabled={isAbTestsPending}
                value={experimentId}
                label={t('EXPERIMENT_ID')}
                data-testid="filter-experiment-id"
                onChange={handleExperimentIdChange}
              />
            </FormItem>
          </Col>
        </Row>
        <Row justify="space-between" align="bottom">
          <Col sm={11} xs={24}>
            <FormItem
              name="dateRange"
              rules={[{ required: true, message: t('MISSING_AREA') }]}
            >
              <RangePicker
                disabled={isAbTestsPending}
                value={dateRange}
                allowClear={false}
                onChange={handleDateRangeChange}
                className={classes.rangepicker}
              />
            </FormItem>
          </Col>
          <Col sm={11} xs={24}>
            <FormItem>
              <div className={classes.searchButtonContainer}>
                <Button disabled={isAbTestsPending} onClick={handleSearch}>
                  {t('global:APPLY')}
                </Button>
              </div>
            </FormItem>
          </Col>
        </Row>
      </Space>
    </Form>
  );

  function handleDateRangeChange(dates) {
    const updatedDates = [dates[0].startOf('day'), dates[1].endOf('day')];
    setDateRange(updatedDates);
  }
  function handleSearch() {
    if (
      (!!testName.length && testName.length < MIN_SEARCH_INPUT_LENGTH) ||
      (!!experimentId.length && experimentId.length < MIN_SEARCH_INPUT_LENGTH)
    ) {
      return;
    }
    const requestData = getFormattedRequestData({ dates: dateRange, testName, experimentId });
    dispatch(Creators.setFilters({ requestData }));
  }

  function handleTestNameChange({ target: { value } }) {
    setTestName(value);
  }

  function handleExperimentIdChange({ target: { value } }) {
    setExperimentId(value);
  }
}
