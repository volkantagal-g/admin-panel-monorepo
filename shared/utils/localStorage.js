const KEYS_TO_DELETE_AFTER_LOGOUT = [
  'accessToken',
  'refreshToken',
  'token',
  'user',
  'selectedCountry',
  'selectedCountryDivision',
  'permissions',
  'isAccessTokenRefreshing',
];

export const clearLocalStorage = () => {
  KEYS_TO_DELETE_AFTER_LOGOUT.forEach(key => {
    localStorage.removeItem(key);
  });
  window.location.replace('/login');
};

export const getItemFromLocalStorage = key => {
  const result = JSON.parse(localStorage.getItem(key));
  // TODO: result can be null, 0 etc. which can be usefull,
  // why are you returning empty array by default in a global util function
  return result || [];
};

export const setItemToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
