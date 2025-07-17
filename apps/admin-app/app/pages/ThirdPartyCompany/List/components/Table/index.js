import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import { tableColumns } from '@app/pages/ThirdPartyCompany/List/components/Table/config';
import { thirdPartyCompaniesSelector, filteredThirdPartyCompaniesSelector } from '@app/pages/ThirdPartyCompany/List/redux/selectors';
import { Creators } from '@app/pages/ThirdPartyCompany/List/redux/actions';

const ThirdPartyCompanyListTable = () => {
  // constants
  const { t } = useTranslation(['thirdPartyCompany', 'global']);
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  // selectors
  const isThirdPartyCompanyListPending = useSelector(thirdPartyCompaniesSelector.getIsPending);
  const thirdPartyCompanyList = useSelector(filteredThirdPartyCompaniesSelector.getData);

  useEffect(() => {
    dispatch(Creators.getThirdPartyCompaniesRequest());
  }, [dispatch]);

  return (
    <AntTableV2
      data={thirdPartyCompanyList}
      columns={tableColumns({ t, canAccess })}
      loading={isThirdPartyCompanyListPending}
      pagination={false}
    />
  );
};

export default ThirdPartyCompanyListTable;
