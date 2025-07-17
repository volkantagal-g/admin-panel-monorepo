import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Radio } from 'antd';
import { useTranslation } from 'react-i18next';

import { courierPlanTypeSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { COURIER_PLAN_TYPE_KEYS, EMPLOYEE_TYPE } from '../../constants';

import useStyles from './styles';

const Header = ({ filters, setFilters }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('courierPlanPublication');
  const classes = useStyles();

  const courierPlanType = useSelector(courierPlanTypeSelector.getData);

  const onCourierPlanTypeChange = e => {
    const newCourierPlanType = e.target.value;
    if (courierPlanType !== newCourierPlanType) {
      dispatch(Creators.updateCourierPlanType({ planType: newCourierPlanType }));
    }
  };

  const onEmployeeTypeChange = e => {
    const newEmployeeType = e.target.value;
    if (filters.employeeType !== newEmployeeType) {
      setFilters({ ...filters, employeeType: newEmployeeType });
    }
  };

  return (
    <>
      <Row className={classes.headerContainer}>
        <Col flex={1}>
          <Radio.Group
            defaultValue={filters.employeeType}
            value={filters.employeeType}
            onChange={onEmployeeTypeChange}
            buttonStyle="solid"
            size="large"
          >
            <Radio.Button value={EMPLOYEE_TYPE.COURIER} data-testid="courierTab">
              {t('EMPLOYEE_TYPE.COURIER')}
            </Radio.Button>
            <Radio.Button value={EMPLOYEE_TYPE.STORE_ASSISTANT} data-testid="storeAssistantTab">
              {t('EMPLOYEE_TYPE.STORE_ASSISTANT')}
            </Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      {filters.employeeType === EMPLOYEE_TYPE.COURIER && (
      <Row className={classes.headerContainer}>
        <Col flex={1}>
          <Radio.Group
            defaultValue={courierPlanType}
            value={courierPlanType}
            onChange={onCourierPlanTypeChange}
            buttonStyle="solid"
            size="large"
          >
            <Radio.Button value={COURIER_PLAN_TYPE_KEYS.STANDARD}>
              {t('COURIER_PLAN_TYPE.STANDARD')}
            </Radio.Button>
            <Radio.Button value={COURIER_PLAN_TYPE_KEYS.SCHEDULED}>
              {t('COURIER_PLAN_TYPE.SCHEDULED')}
            </Radio.Button>
            <Radio.Button value={COURIER_PLAN_TYPE_KEYS.SLOT_CAPACITY}>
              {t('COURIER_PLAN_TYPE.SLOT_CAPACITY')}
            </Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      )}
    </>
  );
};

export default memo(Header);
