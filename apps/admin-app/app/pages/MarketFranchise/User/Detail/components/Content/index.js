import { useSelector } from 'react-redux';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { franchiseUserDetailSelector, roleGroupsSelector, franchisesSelector, rolesSelector } from '../../redux/selectors';
import useStyles from './styles';
import BoxGeneralInformation from '../BoxGeneralInformation';
import BoxRoleGroups from '../BoxRoleGroups';
import BoxFranchiseInformation from '../BoxFranchiseInformation';
import BoxPermissions from '../BoxPermissions';
import BoxAccesibleReports from '../BoxAccessibleReports';

const FranchiseUserDetailPageContent = () => {
  const classes = useStyles();
  const { Can } = usePermission();

  const franchiseUserDetail = useSelector(franchiseUserDetailSelector.getData);
  const isPendingRoleGroups = useSelector(roleGroupsSelector.getIsPending);
  const isPendingFranchises = useSelector(franchisesSelector.getIsPending);
  const isPendingRoles = useSelector(rolesSelector.getIsPending);
  const isPendingReports = useSelector(rolesSelector.getIsPending);
  const isPending = isPendingRoleGroups || isPendingFranchises || isPendingRoles || isPendingReports;

  return (
    <div className={classes.container}>
      <BoxGeneralInformation
        data={franchiseUserDetail}
        isPending={isPending}
        editPermKey={permKey.PAGE_MARKET_FRANCHISE_USER_EDIT}
      />
      <Can key="franchiseUserRoleGroups" permKey={permKey.PAGE_MARKET_FRANCHISE_USER_ROLE_GROUP_LIST}>
        <BoxRoleGroups
          data={franchiseUserDetail}
          isPending={isPending}
          editPermKey={permKey.PAGE_MARKET_FRANCHISE_USER_ROLE_GROUP_UPDATE}
        />
      </Can>
      <BoxFranchiseInformation
        data={franchiseUserDetail}
        isPending={isPending}
        editPermKey={permKey.PAGE_MARKET_FRANCHISE_USER_FRANCHISE_EDIT}
      />
      <Can key="franchiseUserPermissions" permKey={permKey.PAGE_MARKET_FRANCHISE_USER_ROLE_LIST}>
        <BoxPermissions
          data={franchiseUserDetail}
          isPending={isPending}
          editPermKey={permKey.PAGE_MARKET_FRANCHISE_USER_ROLE_EDIT}
        />
      </Can>
      <Can key="franchiseUserAccesibleReports" permKey={permKey.PAGE_MARKET_FRANCHISE_USER_REPORT_LIST}>
        <BoxAccesibleReports
          data={franchiseUserDetail}
          isPending={isPending}
          editPermKey={permKey.PAGE_MARKET_FRANCHISE_USER_REPORT_EDIT}
        />
      </Can>
    </div>
  );
};

export default FranchiseUserDetailPageContent;
