import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { clientListSections, getGetirSelectPaymentTypeOptions } from '../../../constants';
import { getClientListData } from '../../../redux/selectors';
import MultipleSelect from '../../common/MultipleSelect';

const subSectionName = 'subscriptionPaymentType';
const activeKey = `${clientListSections.getirSelectServiceDetail}.${subSectionName}`;

const PaymentTypeDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const getirSelectPaymentTypeOptions = getGetirSelectPaymentTypeOptions();

  return (
    <CollapsePanel header={t('GETIR_SELECT_PAYMENT_TYPE.TITLE')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row>
        <Col xs={22} md={11}>
          <MultipleSelect
            activeKey={activeKey}
            selectable={getirSelectPaymentTypeOptions}
            tagValue="label"
            tagKey="value"
            value={data.paymentType}
            label={t('GETIR_SELECT_MEMBERSHIP.SUBSCRIPTION_PAYMENT_TYPE')}
            clientListKey="paymentType"
            placeholder={t('GETIR_SELECT_MEMBERSHIP.SUBSCRIPTION_PAYMENT_TYPE')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default PaymentTypeDetail;
