import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Row,
  Space,
  Typography,
  Select,
} from 'antd';

import { Creators } from '../../redux/actions';
import { personListSelector } from '../../redux/selectors';
import useStyles from './styles';
import { convertSelectOptions, selectOptionsSearch } from '@shared/utils/common';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = ({ filters, setFilters, handleSubmit }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('timesheetLogs');
  const classes = useStyles();

  const isPeoplePending = useSelector(personListSelector.getIsPending);
  const people = useSelector(personListSelector.getData);

  const handleDateRangeChange = dateRange => {
    setFilters({ ...filters, dateRange });
  };

  const handlePersonChange = personId => {
    setFilters({ ...filters, personId });
  };

  const handleSearch = useCallback(name => {
    if (name?.trim?.()?.length < 3) return;
    dispatch(Creators.getPersonListRequest({ name }));
  }, [dispatch]);

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  const isDisabled = !filters.dateRange || !filters.personId || isPeoplePending;

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER.TITLE')} key="1">
            <Space direction="vertical" className={classes.fullWidth}>
              <Row gutter={[8, 8]} className={classes.alignEnd}>
                <Col md={10} xs={24}>
                  <Text>{t('DATE')}</Text>
                  <DatePicker.RangePicker
                    onChange={handleDateRangeChange}
                    value={filters.dateRange}
                    className={classes.fullWidth}
                    allowClear={false}
                  />
                </Col>
                <Col md={10} xs={24}>
                  <Text>{t('FILTER.EMPLOYEE')}</Text>
                  <Select
                    value={filters.personId}
                    options={convertSelectOptions(people || [], { valueKey: '_id', labelKey: 'name' })}
                    onChange={handlePersonChange}
                    showSearch
                    onSearch={debouncedHandleSearch}
                    filterOption={selectOptionsSearch}
                    loading={isPeoplePending}
                    placeholder={t('global:SEARCH')}
                    className={classes.fullWidth}
                  />
                </Col>
                <Col className={classes.flex}>
                  <Row className={classes.justifyEnd}>
                    <Button
                      type="primary"
                      disabled={isDisabled}
                      onClick={handleSubmit}
                    >
                      {t('BRING')}
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
