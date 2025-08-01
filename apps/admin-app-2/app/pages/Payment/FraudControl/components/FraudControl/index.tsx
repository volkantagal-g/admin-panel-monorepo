import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Row } from 'antd';

import { allRulesSelector, ruleModalDataSelector } from '../../redux/selectors';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { columns } from './config';
import RuleModal from '../RuleModal';
import { Creators } from '../../redux/actions';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

export type RuleModalData = {
  isModalOpen: boolean;
  ruleId: string | null;
  name: string | null;
};

const FraudControlList = () => {
  const { t } = useTranslation(['paymentFraudControlPage', 'global']);
  const dispatch = useDispatch();
  const allRulesData = useSelector(allRulesSelector.getData);
  const allRulesIsPending = useSelector(allRulesSelector.getIsPending);
  const ruleModalData = useSelector(ruleModalDataSelector.getData);
  const { canAccess } = usePermission();
  const isAuthForUpdateRule = canAccess(
    permKey.PAGE_PAYMENT_FRAUD_CONTROL_LIST_COMPONENT_UPDATE_RULE,
  );

  const handleOpenRuleModal = (id: string, name: string) => {
    dispatch(
      Creators.setRuleModalData({
        isModalOpen: true,
        ruleId: id,
        name,
      }),
    );
  };
  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          total={allRulesData?.length}
          dataSource={allRulesData}
          columns={columns(t, handleOpenRuleModal, isAuthForUpdateRule)}
          loading={allRulesIsPending}
        />
      </Col>
      {ruleModalData.isModalOpen && <RuleModal />}
    </Row>
  );
};

export default FraudControlList;
