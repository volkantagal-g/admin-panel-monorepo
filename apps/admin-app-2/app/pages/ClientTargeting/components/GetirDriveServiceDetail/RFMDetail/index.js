import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import MultipleSelect from '../../common/MultipleSelect';
import MinMaxInput from '../../common/MinMaxInput';
import {
  clientListSections,
  GETIR_DRIVE_EXTERNAL_SOURCE_OPTIONS,
  getGetirDriveRentStatusOptions,
  getGetirDrivePaymentTypeOptions,
} from '../../../constants';
import { getClientListData } from '../../../redux/selectors';

const subSectionName = 'rfmDetail';
const activeKey = `${clientListSections.getirDriveServiceDetail}.${subSectionName}`;

const RFMDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const getirDriveRentStatusOptions = getGetirDriveRentStatusOptions(t);
  const getirDrivePaymentTypeOptions = getGetirDrivePaymentTypeOptions(t);

  const minRecencyCountKey = 'minRecencyCount';
  const maxRecencyCountKey = 'maxRecencyCount';
  const minFrequencyCountKey = 'minFrequencyCount';
  const maxFrequencyCountKey = 'maxFrequencyCount';
  const minMonetaryCountKey = 'minMonetaryCount';
  const maxMonetaryCountKey = 'maxMonetaryCount';

  return (
    <CollapsePanel header={t('GETIR_DRIVE_RFM_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <MultipleSelect
            activeKey={activeKey}
            value={data.externalSource}
            label={t('SOURCE')}
            clientListKey="externalSource"
            selectable={GETIR_DRIVE_EXTERNAL_SOURCE_OPTIONS}
            placeholder={t('SOURCE')}
          />
          <MultipleSelect
            activeKey={activeKey}
            value={data.state}
            label={t('RENT_STATUS')}
            clientListKey="state"
            selectable={getirDriveRentStatusOptions}
            placeholder={t('RENT_STATUS')}
          />
          <MultipleSelect
            activeKey={activeKey}
            value={data.paymentType}
            label={t('PAYMENT_TYPE')}
            clientListKey="paymentType"
            selectable={getirDrivePaymentTypeOptions}
            placeholder={t('PAYMENT_TYPE')}
          />
        </Col>
        <Col span={11}>
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minRecencyCountKey]}
            maxCount={data[maxRecencyCountKey]}
            minCountKey={minRecencyCountKey}
            maxCountKey={maxRecencyCountKey}
            label={t('RECENCY')}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minFrequencyCountKey]}
            maxCount={data[maxFrequencyCountKey]}
            minCountKey={minFrequencyCountKey}
            maxCountKey={maxFrequencyCountKey}
            label={t('FREQUENCY')}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minMonetaryCountKey]}
            maxCount={data[maxMonetaryCountKey]}
            minCountKey={minMonetaryCountKey}
            maxCountKey={maxMonetaryCountKey}
            label={t('MONETARY')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default RFMDetail;
