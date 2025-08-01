import { PageHeader, Col, Row, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Creators } from '../../redux/actions';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const Header = (): JSX.Element => {
  const { t } = useTranslation(['paymentFraudControlPage', 'global']);
  const dispatch = useDispatch();
  const { Can } = usePermission();

  const handleCreateRule = () => {
    dispatch(
      Creators.setRuleModalData({
        name: t('paymentFraudControlPage:CREATE_RULE_MODAL_NAME'),
        isModalOpen: true,
      }),
    );
  };
  return (
    <Row justify="space-between" align="middle">
      <PageHeader
        className="p-0 page-title"
        title={t('global:PAGE_TITLE.FRAUD_CONTROL.LIST')}
      />
      <Can
        permKey={permKey.PAGE_PAYMENT_FRAUD_CONTROL_LIST_COMPONENT_CREATE_RULE}
      >
        <Button type="primary" onClick={() => handleCreateRule()}>
          {t('paymentFraudControlPage:CREATE_RULE_BUTTON')}
        </Button>
      </Can>
    </Row>
  );
};

export default Header;
