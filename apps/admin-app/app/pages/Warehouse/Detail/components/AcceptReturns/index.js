import { useTranslation } from 'react-i18next';
import { Switch, Row } from 'antd';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import Card from '@shared/components/UI/AntCard';

function AcceptReturns({ acceptReturns, updateWarehouseAcceptReturnsRequest }) {
  const { t } = useTranslation(['warehousePage', 'global']);
  const [isActive, setIsActive] = useState();
  useEffect(() => {
    setIsActive(acceptReturns);
  }, [acceptReturns]);
  return (
    <Card bordered={false}>
      <Row justify="space-between">
        {t('AVAILABLE_FOR_RETURN')}
        <Switch
          unCheckedChildren={t('OFF')}
          checkedChildren={t('ON')}
          checked={isActive}
          onChange={value => {
            setIsActive(value);
            updateWarehouseAcceptReturnsRequest(value);
          }}
        />
      </Row>
    </Card>
  );
}

AcceptReturns.propTypes = {
  acceptReturns: PropTypes.bool,
  updateWarehouseAcceptReturnsRequest: PropTypes.func,
};
AcceptReturns.defaultProps = {
  acceptReturns: false,
  updateWarehouseAcceptReturnsRequest: () => {},
};

export default AcceptReturns;
