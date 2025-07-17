import { detailId } from '@shared/api/e2eCourierPlan/index.mock.data';
import {
  mockedConfigValueData,
  mockedDomainConfigSettingsData,
  mockedInheritedConfigValueData,
} from '@app/pages/Algorithm/Config/Domain/Locals/Detail/index.mock.data';

export const getDomainSettingsMockHandler = {
  url: '/algorithm/config/locals/getDomainSettings',
  method: 'get',
  successData: mockedDomainConfigSettingsData,
};

export const getConfigValuesHandler = {
  url: `/algorithm/config/locals/getDomainConfigDetail/${detailId}`,
  method: 'get',
  successData: mockedConfigValueData,
};

export const getConfigInheritedValuesHandler = {
  url: `/algorithm/config/locals/getDomainConfig/${detailId}`,
  method: 'get',
  successData: mockedInheritedConfigValueData,
};

export default [getDomainSettingsMockHandler, getConfigValuesHandler, getConfigInheritedValuesHandler];
