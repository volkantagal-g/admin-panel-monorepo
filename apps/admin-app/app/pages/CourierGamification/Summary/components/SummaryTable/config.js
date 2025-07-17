import RedirectText from '@shared/components/UI/RedirectText';
import permKey from '@shared/shared/permKey.json';

import { t } from '@shared/i18n';
import { alphabeticallySortByParam } from '@shared/utils/common';
import { getGMFCTaskProgressStatus } from '../../../constant';
import { ROUTE } from '@app/routes';

export const getTableColumns = () => {
  const columns = [
    {
      title: t('courierGamificationPage:PERSON_IDS'),
      dataIndex: 'personId',
      key: 'personId',
      width: '100px',
      render: personId => {
        return (
          <RedirectText
            text={personId}
            to={`${ROUTE.PERSON_DETAIL.path.replace(':id', personId)}`}
            target="_blank"
            size="small"
            permKey={permKey.PAGE_PERSON_DETAIL}
          />
        );
      },
    },
    {
      title: t('courierGamificationPage:PROGRESS_TYPES'),
      dataIndex: 'progressStatus',
      key: 'progressStatus',
      width: '100px',
      render: progressStatus => {
        return (
          <p> {t(`courierGamificationPage:${alphabeticallySortByParam(getGMFCTaskProgressStatus(t)).filter(i => {
            return i?.value === progressStatus;
          })[0]?.label}`) }
          </p>
        );
      },
    },
    {
      title: t('courierGamificationPage:CURRENT_PROGRESS'),
      dataIndex: 'currentProgress',
      key: 'currentProgress',
      width: '100px',
      defaultSortOrder: 'ascend',
      sorter: true,
      sortDirections: ['descend', 'ascend', 'descend'],
    },
  ];

  return columns;
};
