import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MinMaxInput from '../../common/MinMaxInput';
import MultipleSelect from '../../common/MultipleSelect';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import GeoJsonUploader from '../../common/GeoJsonUploader';

const subSectionName = 'forcedTabOpen';
const activeKey = `${clientListSections.getirBitaksiServiceDetail}.${subSectionName}`;

const ForcedTabOpenDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const cities = useSelector(getCitiesSelector.getOperationalOrWasOperationalCities);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minTabOpenCount';
  const maxCountKey = 'maxTabOpenCount';

  return (
    <CollapsePanel header={t('GBT_FORCED_TAB_OPEN_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          {!data.geoJson && (
            <div>
              <MultipleSelect
                activeKey={activeKey}
                value={data.cities}
                label={t('global:CITY')}
                clientListKey="cities"
                selectable={cities}
                placeholder={t('global:CITY')}
                showCSVImporter
                disabled={data.cityDisabled}
              />
            </div>
          )}
          <GeoJsonUploader activeKey={activeKey} value={data.geoJson} key={activeIndex} />
        </Col>
        <Col span={11}>
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('TAB_OPEN_COUNT')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default ForcedTabOpenDetail;
