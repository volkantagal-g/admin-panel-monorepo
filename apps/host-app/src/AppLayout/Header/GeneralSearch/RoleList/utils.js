import { Link } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@shared/routes';
import { getCommonTypography } from '../utils';

export function getFormattedRole(role, canAccess) {
  const { _id, name, description } = role || {};

  const translatedDesc = description?.[getLangKey()] || '';

  const formatted = `${name} — ${translatedDesc}`;

  const renderResult = (
    <>
      <SettingOutlined style={{ marginRight: 5 }} />
      {getCommonTypography(formatted)}
    </>
  );

  return (
    canAccess(permKey.PAGE_ROLE_DETAIL) ? (
      <Link to={ROUTE.ROLE_DETAIL.path.replace(':id', _id)} key={_id}>
        { renderResult }
      </Link>
    ) : (
      <div key={_id}>
        {renderResult}
      </div>
    )
  );
}
