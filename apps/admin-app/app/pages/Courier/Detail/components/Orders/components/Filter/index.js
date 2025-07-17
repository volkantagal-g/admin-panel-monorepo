import { Col } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import AntSelect from '@shared/components/UI/AntSelect';
import { orderListSelector } from '../../../../redux/selectors';
import { getirFinanceDomainTypeOption, domainTypes } from '../../../../utils';
import useStyles from './styles';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const OrderFilter = ({ domainType, handleOnChange }) => {
  const { t } = useTranslation('courierPage');
  const classes = useStyles();

  const isPendingGetOrderList = useSelector(orderListSelector.getIsPending);

  const { canAccess } = usePermission();
  const hasFinanceEmployeeRole = canAccess(permKey.PAGE_COURIER_DETAIL_COMPONENT_GETIR_FINANCE_EMPLOYEE);

  return (
    <Col lg={24} xs={24}>
      <AntSelect
        id="domainType"
        value={domainType}
        onChange={handleOnChange}
        disabled={isPendingGetOrderList}
        options={hasFinanceEmployeeRole ? getirFinanceDomainTypeOption : domainTypes}
        className={classes.orderTypeInput}
        placeholder={t('DOMAIN_TYPE')}
      />
    </Col>
  );
};

OrderFilter.propTypes = {
  domainType: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
};

export default OrderFilter;
