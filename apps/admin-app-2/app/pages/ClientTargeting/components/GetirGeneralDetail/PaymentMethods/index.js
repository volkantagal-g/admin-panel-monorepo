import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { paymentMethods } from '@shared/shared/constantValues';
import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import MinMaxInput from '../../common/MinMaxInput';
import SingleSelect from '../../common/SingleSelect';
import { getClientListData } from '../../../redux/selectors';

const subSectionName = 'paymentMethods';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const WithdrawDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const paymentMethodSelectOptions = convertConstantValuesToSelectOptions(paymentMethods);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t("PAYMENT_METHODS")} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <SingleSelect
            activeKey={activeKey}
            tagValue="label"
            tagKey="value"
            value={data.paymentMethod}
            label={t("PAYMENT_METHOD")}
            clientListKey="paymentMethod"
            selectable={paymentMethodSelectOptions}
            placeholder={t("PAYMENT_METHOD")}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data.minTransactionCount}
            maxCount={data.maxTransactionCount}
            minCountKey="minTransactionCount"
            maxCountKey="maxTransactionCount"
            label={t("PAYMENT_METHOD_TRANSACTION_COUNT")}
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('PAYMENT_METHOD_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default WithdrawDetail;
