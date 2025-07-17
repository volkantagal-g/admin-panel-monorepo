import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Collapse, DatePicker, Form, Row, Space } from 'antd';

import SelectDepartment from '@shared/containers/Select/Department';
import SelectEmployee from '@shared/containers/Select/Employee';
import SelectLocation from '@app/pages/Employee/components/Select/Location';
import SelectCountry from '@app/pages/Employee/components/Select/Country';
import SelectPermitStatus from '@app/pages/Employee/components/Select/Permit/Status';
import SelectPermitType from '@app/pages/Employee/components/Select/Permit/Type';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { filteredPermitsSelector, filterSelector } from '../../redux/selectors';
import { INITIAL_STATE } from '../../redux/reducer';
import {
  EMPLOYEE_PAYROLL_COUNTRY_OPTIONS,
  EMPLOYEE_PERMIT_TYPES,
  EMPLOYMENT_STATUSES,
} from '@app/pages/Employee/constants';
import SelectPermitReason from '@app/pages/Employee/components/Select/Permit/Reason';

const { Panel } = Collapse;
const { Item } = Form;
const { RangePicker } = DatePicker;

const Filter = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [form] = Form.useForm();
  const { t } = useTranslation(['global', 'employeePage']);

  const filters = useSelector(filterSelector.getFilters);
  const isFilteredPermitsPending = useSelector(filteredPermitsSelector.getIsPending);
  const [selectedPermitType, setSelectedPermitType] = useState(null);

  useEffect(() => {
    form.setFieldsValue(INITIAL_STATE.filters);
  }, [form]);

  const handleResetBtnOnClick = () => {
    form.setFieldsValue(INITIAL_STATE.filters);
    dispatch(Creators.resetFilters({}));
  };

  const handleFilterBtnOnClick = () => {
    dispatch(Creators.getFilteredPermitsRequest({}));
  };

  const handlePermitTypeChange = permitType => {
    setSelectedPermitType(permitType);
    form.setFieldsValue({
      reason: undefined,
      permitType,
    });
    dispatch(Creators.setFilters({
      filters: {
        ...filters,
        permitType,
        reason: undefined,
      },
    }));
  };

  return (
    <Collapse defaultActiveKey="table" className={classes.root}>
      <Panel header={t('global:FILTER')} key="table">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFilterBtnOnClick}
          onValuesChange={(_, allValues) => {
            dispatch(Creators.setFilters({ filters: allValues }));
          }}
          aria-label={t('global:FILTER')}
          disabled={isFilteredPermitsPending}
        >
          <Row gutter={[8, 8]}>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} name="dateRange" label={t('global:DATE')}>
                <RangePicker
                  allowClear={false}
                  disabled={isFilteredPermitsPending}
                  className={classes.fullWidth}
                />
              </Item>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} name="status" label={t('global:STATUS')}>
                <SelectPermitStatus title="statusSelect" disabled={isFilteredPermitsPending} showSearch />
              </Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} name="supervisor" label={t('employeePage:SUPERVISOR')}>
                <SelectEmployee disabled={isFilteredPermitsPending} name="supervisor" />
              </Item>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} name="departments" label={t('global:DEPARTMENT')}>
                <SelectDepartment disabled={isFilteredPermitsPending} showLastSucceededSelect={false} isReturnParsedValue allowClear />
              </Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} name="locationId" label={t('employeePage:LOCATION')}>
                <SelectLocation disabled={isFilteredPermitsPending} allowClear />
              </Item>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} name="businessCountry" label={t('employeePage:BUSINESS_COUNTRY')}>
                <SelectCountry disabled={isFilteredPermitsPending} showSearch />
              </Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Form.Item
                label={t('employeePage:PAYROLL_COUNTRY')}
                name="payrollCountry"
                className={classes.formItem}
              >
                <SelectCountry
                  countries={EMPLOYEE_PAYROLL_COUNTRY_OPTIONS}
                  mode="single"
                  name="payrollCountry"
                  disabled={isFilteredPermitsPending}
                  showSearch
                  placeholder={t('employeePage:PAYROLL_COUNTRY')}
                />
              </Form.Item>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} name="employee" label={t('employeePage:EMPLOYEE_NAME')}>
                <SelectEmployee
                  placeholder={t('employeePage:EMPLOYEE_NAME')}
                  disabled={isFilteredPermitsPending}
                  name="employee"
                  filters={{ employmentStatuses: [EMPLOYMENT_STATUSES.WORKING, EMPLOYMENT_STATUSES.ON_LEAVE, EMPLOYMENT_STATUSES.NOT_WORKING] }}
                />
              </Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} name="permitType" label={t('global:TYPE')}>
                <SelectPermitType
                  disabled={isFilteredPermitsPending}
                  showSearch
                  onChange={handlePermitTypeChange}
                />
              </Item>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Item className={classes.formItem} name="reason" label={t('global:REASON')}>
                <SelectPermitReason
                  disabled={
                    !selectedPermitType ||
                    (
                      selectedPermitType !== EMPLOYEE_PERMIT_TYPES.OTHER &&
                      selectedPermitType !== EMPLOYEE_PERMIT_TYPES.NO_SHOW_EXCUSE
                    )
                  }
                  permitType={selectedPermitType}
                />
              </Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]} justify="end">
            <Space size="small">
              <Item className={classes.filterBtn}>
                <Button
                  onClick={handleResetBtnOnClick}
                  loading={isFilteredPermitsPending}
                >{t('global:RESET')}
                </Button>
              </Item>
              <Item className={classes.filterBtn}>
                <Button
                  type="primary"
                  htmlType="submit"
                  name="filter"
                  loading={isFilteredPermitsPending}
                >{t('global:FILTER')}
                </Button>
              </Item>
            </Space>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default Filter;
