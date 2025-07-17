import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { thirdPartyCompanyStatuses } from '@app/pages/ThirdPartyCompany/constantValues';
import permKey from '@shared/shared/permKey.json';

const langKey = getLangKey();
const translationColumnsPrefix = 'PAGE.LIST.COLS';

export const tableColumns = ({ t, canAccess }) => [
  {
    title: t(`${translationColumnsPrefix}.NAME`),
    dataIndex: 'name',
    key: 'name',
    render: name => `${name}`,
  },
  {
    title: t(`${translationColumnsPrefix}.DESCRIPTION`),
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: t(`${translationColumnsPrefix}.STATUS`),
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: status => `${thirdPartyCompanyStatuses[status]?.[langKey]}`,
  },
  {
    title: t(`${translationColumnsPrefix}.ACTION`),
    width: 100,
    align: 'right',
    render: ({ _id: thirdPartyCompanyId }) => {
      if (!canAccess(permKey.PAGE_THIRD_PARTY_COMPANY_DETAIL)) {
        return null;
      }
      return (
        <Link to={ROUTE.THIRD_PARTY_COMPANY_DETAIL.path.replace(':id', thirdPartyCompanyId)}>
          <Button size="small">
            {t('BUTTONS.DETAIL')}
          </Button>
        </Link>
      );
    },
  },
];
