import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getProductActivationValidationErrorsSelector, updateMarketProductSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { filterValidationErrors } from '@app/pages/MarketProduct/utils';

const useProductActivationErrors = ({ tabId, containerId } = {}) => {
  const activationValidationErrors = useSelector(getProductActivationValidationErrorsSelector.getValidationErrors);
  const enableValidationErrors = useSelector(updateMarketProductSelector.getValidationErrors);

  const memoizedValErrors = useMemo(() => {
    return filterValidationErrors({ validationErrors: [...activationValidationErrors, ...enableValidationErrors], tabId, containerId });
  }, [containerId, tabId, activationValidationErrors, enableValidationErrors]);

  return memoizedValErrors;
};

export default useProductActivationErrors;
