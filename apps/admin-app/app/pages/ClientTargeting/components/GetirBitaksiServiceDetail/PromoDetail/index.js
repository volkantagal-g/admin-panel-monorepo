import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections, getPromoObjectiveTypes } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MultipleSelect from '../../common/MultipleSelect';
import CheckboxSelect from '../../common/CheckboxSelect';
import CSVSelect from '../../common/CSVSelect';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';

const subSectionName = 'promoUsage';
const activeKey = `${clientListSections.getirBitaksiServiceDetail}.${subSectionName}`;

const PromoDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const promoObjectiveOptions = getPromoObjectiveTypes(t);

  return (
    <CollapsePanel header={t('PROMO_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <CSVSelect
            activeKey={activeKey}
            label={t('PROMOS')}
            description={t('ONLY_CSV_UPLOAD_IS_AVAILABLE')}
            clientListKey="usedPromos"
            value={data.usedPromos}
            selectable={[]}
            showCSVImporter
          />
          <CheckboxSelect
            activeKey={activeKey}
            label={t('EXCLUDE_CLIENTS')}
            description={t('EXCLUDE_CLIENTS_DESCRIPTION')}
            value={data.excludeClients}
            clientListKey="excludeClients"
          />
          <MultipleSelect
            activeKey={activeKey}
            clientListKey="promoObjective"
            value={data.promoObjective}
            selectable={promoObjectiveOptions}
            tagValue="label"
            tagKey="value"
            label={t('PROMO_OBJECTIVE')}
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('DATE_RANGE')}
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

export default PromoDetail;
