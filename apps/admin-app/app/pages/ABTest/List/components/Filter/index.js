import {
  Button,
  Col,
  DatePicker,
  Form,
  Row,
  Collapse,
  Space,
} from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { InputWrapper } from '@shared/components/UI/Form';
import { MIN_SEARCH_INPUT_LENGTH } from '@app/pages/ABTest/constants';

import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { getABTestsSelector } from '../../redux/selectors';
import { getFormattedRequestData, getInitialDates } from '../../utils';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'AB_TEST_LIST_PAGE_FILTER_COMPONENT_COLLAPSE_';

export default function Filter() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('abTestingPage');
  const [dateRange, setDateRange] = useState(getInitialDates);
  const [testName, setTestName] = useState('');
  const [testCode, setTestCode] = useState('');
  const isAbTestsPending = useSelector(getABTestsSelector.getIsPending);

  const initialValues = { testName, testCode, dateRange };

  return (
    <Collapse defaultActiveKey={`${COLLAPSE_KEY_PREFIX}_1`}>
      <Panel header={t('FILTER')} key={`${COLLAPSE_KEY_PREFIX}_1`}>
        <Form initialValues={initialValues}>
          <Space direction="vertical" className={classes.fullWidth}>
            <Row justify="space-between" align="middle">
              <Col sm={11} xs={24}>
                <InputWrapper
                  setDefaultValue={false}
                  inputKey="testName"
                  label={t('TEST_NAME')}
                  value={testName}
                  handleChange={handleTestNameChange}
                  labelCol={{ span: 24 }}
                  isTouched={!!testName.length}
                  hasError={testName.length < MIN_SEARCH_INPUT_LENGTH}
                  disabled={isAbTestsPending}
                />
              </Col>
              <Col sm={11} xs={24}>
                <InputWrapper
                  setDefaultValue={false}
                  inputKey="testCode"
                  label={t('TEST_CODE')}
                  value={testCode}
                  handleChange={handleTestCodeChange}
                  labelCol={{ span: 24 }}
                  isTouched={!!testCode.length}
                  hasError={testCode.length < MIN_SEARCH_INPUT_LENGTH}
                  disabled={isAbTestsPending}
                />
              </Col>
            </Row>
            <Row justify="space-between" align="bottom">
              <Col sm={11} xs={24}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label={t('global:DATE_RANGE')}
                  name="dateRange"
                >
                  <RangePicker
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    allowClear={false}
                    disabledDate={getDisabledDate}
                    className={classes.fullWidth}
                    disabled={isAbTestsPending}
                  />
                </Form.Item>
              </Col>
              <Col sm={11} xs={24}>
                <Form.Item>
                  <div className={classes.searchButtonContainer}>
                    <Button
                      type="primary"
                      disabled={isAbTestsPending}
                      onClick={handleSearch}
                    >
                      {t('global:APPLY')}
                    </Button>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Space>
        </Form>
      </Panel>
    </Collapse>
  );

  function handleDateRangeChange(dates) {
    const updatedDates = [dates[0].startOf('day'), dates[1].endOf('day')];
    setDateRange(updatedDates);
  }
  function handleSearch() {
    if (
      (!!testName.length && testName.length < MIN_SEARCH_INPUT_LENGTH) ||
      (!!testCode.length && testCode.length < MIN_SEARCH_INPUT_LENGTH)
    ) {
      return;
    }
    const requestData = getFormattedRequestData({ dates: dateRange, testName, testCode });
    dispatch(Creators.setFilters({ requestData }));
  }

  function getDisabledDate(date) {
    return date && date.isAfter(moment());
  }

  function handleTestNameChange({ target: { value } }) {
    setTestName(value);
  }

  function handleTestCodeChange({ target: { value } }) {
    setTestCode(value);
  }
}
