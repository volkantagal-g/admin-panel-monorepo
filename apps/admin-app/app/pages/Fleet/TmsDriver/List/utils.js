import { isNullOrEmpty } from '@shared/utils/common';

export const formatRequestParameters = ({ name, isLoggedIn, isActivated, statuses }) => {
  const params = {};
  if (name) {
    params.name = name;
  }
  if (statuses.length > 0) {
    params.statuses = statuses;
  }
  if (!isNullOrEmpty(isLoggedIn)) {
    params.isLoggedIn = isLoggedIn;
  }
  if (!isNullOrEmpty(isActivated)) {
    params.isActivated = isActivated;
  }

  return params;
};
