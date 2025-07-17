import { useCallback } from 'react';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

function usePermitListConfidentialData() {
  const { canAccess } = usePermission();
  const canAccessPermitListConfidentialData = canAccess(permKey.PAGE_EMPLOYEE_PERMIT_LIST_COMPONENT_CONFIDENTIAL_DATA);

  const Can = useCallback(
    ({ children }) => {
      return canAccessPermitListConfidentialData ? children : null;
    },
    [canAccessPermitListConfidentialData],
  );

  return { canAccessPermitListConfidentialData, Can };
}

export default usePermitListConfidentialData;
