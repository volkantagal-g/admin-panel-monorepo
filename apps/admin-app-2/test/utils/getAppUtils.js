import store from '@app/redux/store';
import { getMyPermissionsSelector } from '@app/redux/selectors/common';
import { Creators as CommonCreators } from '@app/redux/actions/common';
import { getSelectedCountry } from '@app/redux/selectors/countrySelection';

export default function getAppRenderUtils() {
  const setUserPermissions = (permKeys, countryIdParam) => {
    validatePermKeys(permKeys);
    const countryId = countryIdParam || getSelectedCountry()._id;
    const permissions = permKeys.map(permKey => ({ countries: [countryId], permKey }));
    store.dispatch(CommonCreators.setMyPermissions({ data: permissions }));
  };
  //
  const addUserPermissions = (permKeys, countryIdParam) => {
    validatePermKeys(permKeys);
    const currentState = store.getState();
    const countryId = countryIdParam || getSelectedCountry()._id;
    const currentUserPermissions = getMyPermissionsSelector.getData(currentState) ?? [];
    const permissions = permKeys.map(permKey => ({ countries: [countryId], permKey }));
    store.dispatch(CommonCreators.setMyPermissions({ data: [...currentUserPermissions, ...permissions] }));
  };

  const removeUserPermissions = permKeys => {
    validatePermKeys(permKeys);
    const currentState = store.getState();
    const currentUserPermissions = getMyPermissionsSelector.getData(currentState);
    const permissions = currentUserPermissions.filter(perm => permKeys.indexOf(perm.permKey) === -1);
    store.dispatch(CommonCreators.setMyPermissions({ data: permissions }));
  };

  return { setUserPermissions, addUserPermissions, removeUserPermissions };
}

function validatePermKeys(permKeys) {
  if (!Array.isArray(permKeys)) {
    throw new Error('permKeys must be a non-empty array');
  }
}
