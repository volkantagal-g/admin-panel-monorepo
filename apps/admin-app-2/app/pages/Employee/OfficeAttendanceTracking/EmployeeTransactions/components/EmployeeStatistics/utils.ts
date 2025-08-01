import { isEmpty } from 'lodash';

import { percentFormatWithoutDecimal } from '@shared/utils/localization';

interface IEmployeeSummary {
  invited?: number;
  onSite?: {
    total: number;
    atInvitedOffice: number;
    atAnotherOffice: number;
    invitedAnotherOffice: number;
    onSiteButNotInvited: number;
   };
  onLeave?: number;
  noShow?: number;
  noShowExcuse?: number;
  employeesAtTheOfficeCount?: number;
  totalOfficeDurationAsSeconds?: number;
  uniqueEmployeeVisitingDayCount?: number;
}

export function getPresenceRatio({ employeeSummary }: { employeeSummary: IEmployeeSummary }) {
  if (isEmpty(employeeSummary)) {
    return 'N/A';
  }

  const { invited = 0, onSite, onLeave = 0, noShowExcuse = 0 } = employeeSummary;
  const { total = 0, onSiteButNotInvited = 0 } = onSite || {};

  const dividend = total - onSiteButNotInvited;
  const divider = (invited || 0) - (onLeave || 0) - (noShowExcuse || 0);

  if (divider <= 0) {
    return 'N/A';
  }

  return percentFormatWithoutDecimal.format(dividend / divider);
}
