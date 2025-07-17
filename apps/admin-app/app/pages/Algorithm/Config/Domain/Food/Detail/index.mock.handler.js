import { detailId } from '@shared/api/e2eCourierPlan/index.mock.data';
import {
  mockedConfigValueData,
  mockedDomainConfigSettingsData,
  mockedInheritedConfigValueData,
} from '@app/pages/Algorithm/Config/Domain/Food/Detail/index.mock.data';

export const getDomainSettingsMockHandler = {
  url: '/algorithm/config/food/getDomainSettings',
  method: 'get',
  successData: mockedDomainConfigSettingsData,
};

export const getConfigValuesHandler = {
  url: `/algorithm/config/food/getDomainConfigDetail/${detailId}`,
  method: 'get',
  successData: mockedConfigValueData,
};

export const getConfigInheritedValuesHandler = {
  url: `/algorithm/config/food/getDomainConfig/${detailId}`,
  method: 'get',
  successData: mockedInheritedConfigValueData,
};

export default [getDomainSettingsMockHandler, getConfigValuesHandler, getConfigInheritedValuesHandler];
