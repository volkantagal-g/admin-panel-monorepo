const getEligibleIsOpenValue = isOpen => {
  const isOpenEmptyOrBothSelected = isOpen.length === 0 || isOpen.length === 2;
  if (isOpenEmptyOrBothSelected) {
    return null;
  }
  const isOpenValue = isOpen[0];
  if (isOpenValue === 'true') {
    return true;
  }
  return false;
};

export default function prepareFiltersForRequestBody(filters) {
  return {
    ...filters,
    isOpen: filters.isOpen && getEligibleIsOpenValue(filters.isOpen),
  };
}
