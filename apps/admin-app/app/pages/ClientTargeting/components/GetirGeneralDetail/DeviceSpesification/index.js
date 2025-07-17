import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MultipleSelect from '../../common/MultipleSelect';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { getDeviceOSOptions } from './constants';
// import MinMaxInput from '../../common/MinMaxInput';

const subSectionName = 'deviceSpesification';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const DeviceSpesification = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const countries = useSelector(countriesSelector.getData);

  const selectableLanguages = useMemo(() => {
    const uniqueLanguages = new Set();
    countries.forEach(country => uniqueLanguages.add(...country.languageSortOrder));
    return Array.from(uniqueLanguages);
  }, [countries]);

  const selectableLanguagesTagOptions = useMemo(
    () => selectableLanguages.map(language => ({ label: language, value: language })),
    [selectableLanguages],
  );

  const selectableDeviceOSOptions = useMemo(() => getDeviceOSOptions(t), [t]);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  // const minCountKey = 'minDevicePrice';
  // const maxCountKey = 'maxDevicePrice';

  return (
    <CollapsePanel header={t('DEVICE_SPESIFICATION')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <MultipleSelect
          activeKey={activeKey}
          value={data.appLanguage}
          label={t('global:APP_LANGUAGE')}
          clientListKey="appLanguage"
          selectable={selectableLanguagesTagOptions}
          tagKey="label"
          tagValue="value"
          placeholder={t('global:APP_LANGUAGE')}
          maxTagCount={null}
        />
      </Row>
      <Row justify="space-between">
        <MultipleSelect
          activeKey={activeKey}
          value={data.deviceTypes}
          label={t('DEVICE_OS')}
          clientListKey="deviceTypes"
          selectable={selectableDeviceOSOptions}
          tagKey="value"
          tagValue="label"
          placeholder={t('DEVICE_OS')}
          maxTagCount={null}
        />
      </Row>
      {/* <Row justify="space-between">
        <MinMaxInput
          activeKey={activeKey}
          minCount={data[minCountKey]}
          maxCount={data[maxCountKey]}
          minCountKey={minCountKey}
          maxCountKey={maxCountKey}
          label={t('DEVICE_PRICE_INTERVAL')}
        />
      </Row> */}
    </CollapsePanel>
  );
};

export default DeviceSpesification;
