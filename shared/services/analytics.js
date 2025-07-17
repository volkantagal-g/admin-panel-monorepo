import { map, get } from 'lodash';

import { RudderAnalytics } from '@rudderstack/analytics-js';

import { getLangKey } from '@shared/i18n';
import { isMobile, isNullOrEmpty } from '@shared/utils/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { ENVIRONMENT } from '../config';
import { getUser } from '@shared/redux/selectors/auth';

const getEmployeeInfo = () => {
  const user = getUser();
  const isEmployee = !!get(user, ['employee', '_id'], false);
  let employeeDepartment = get(user, ['employee', 'departmentName'], 'No Department');
  let employeeSubDepartment1 = get(
    user,
    ['employee', 'subDepartmentName'],
    'No Sub Department',
  );

  const vendorName = user.email.match(/@(\w+)\.getir\.com/);
  if (vendorName && employeeDepartment === 'No Department') {
    employeeDepartment = `NoGetirEmployee-${vendorName[1]}`;
    employeeSubDepartment1 = null;
  }

  return {
    is_employee: isEmployee,
    employee_department: employeeDepartment,
    employee_sub_department_1: employeeSubDepartment1,
  };
};

class AnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.environmentWhiteList = new Set(['local', 'development', 'production']);
  }

  static getFormattedTraits({ traits }) {
    const deviceType = isMobile() ? 'mobile' : 'web';
    const langKey = getLangKey();
    const selectedCountry = getSelectedCountry();

    return ({
      langKey,
      deviceType,
      appVersion: ENVIRONMENT.REACT_APP_VERSION,
      ...(selectedCountry ? { selectedCountry: get(selectedCountry, 'code.alpha2') } : undefined),
      ...(traits?.countries ? { accessibleCountries: map(traits?.countries, 'code.alpha2') } : undefined),
      ...getEmployeeInfo(),
    });
  }

  static blockedKeys = new Set(['token', 'authTempToken', 'tempToken', 'refreshToken', 'accessToken', 'password']);

  reset() {
    if (this.isInitialized) {
      this.rudderAnalytics?.reset();
    }
  }

  init() {
    if (
      this.environmentWhiteList.has(ENVIRONMENT.ENV) &&
      ENVIRONMENT.REACT_APP_RUDDERSTACK_ANALYTICS_WRITE_KEY &&
      ENVIRONMENT.REACT_APP_RUDDERSTACK_ANALYTICS_DATA_PLANE_URL &&
      !this.isInitialized
    ) {
      this.rudderAnalytics = new RudderAnalytics();
      this.rudderAnalytics?.load(ENVIRONMENT.REACT_APP_RUDDERSTACK_ANALYTICS_WRITE_KEY, ENVIRONMENT.REACT_APP_RUDDERSTACK_ANALYTICS_DATA_PLANE_URL, {});
      setTimeout(() => {
        this.rudderAnalytics?.ready(() => {
          this.isInitialized = true;
        });
      }, 0);
    }
  }

  identify({ traits }) {
    if (this.isInitialized) {
      const formattedTraits = AnalyticsService.getFormattedTraits({ traits });
      this.rudderAnalytics?.identify('', formattedTraits);
    }
    else if (this.environmentWhiteList.has(ENVIRONMENT.ENV)) {
      setTimeout(() => {
        this.identify({ traits });
      }, 1000);
    }
  }

  pageView({ pageName = '', props = { squad: '' } } = {}) {
    let search = window?.location?.search || '';

    if (!isNullOrEmpty(search)) {
      const tempSearch = new URLSearchParams(search);
      AnalyticsService.blockedKeys.forEach(key => {
        tempSearch.delete(key);
      });

      search = tempSearch.toString();
    }

    const fullProps = {
      search, // override search prop for security concerns
      ...props,
    };

    this.rudderAnalytics?.page(
      props.squad ?? '', // category
      pageName,
      fullProps,
    );
  }

  track(eventName, options = {}) {
    if (this.isInitialized) {
      this.rudderAnalytics?.track(eventName, options);
    }
  }
}

export default new AnalyticsService();
