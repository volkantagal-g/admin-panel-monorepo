import { Link } from 'react-router-dom';
import { LinkOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import { getCommonTypography } from '../utils';

export function getFormattedPanelDoc(panelDoc, canAccess) {
  const { _id, name, description } = panelDoc || {};
  const translatedName = name?.[getLangKey()] || '';
  const translatedDesc = description?.[getLangKey()] || '';

  const formatted = `${translatedName} — ${translatedDesc}`;
  const renderResult = (
    <>
      <LinkOutlined style={{ marginRight: 5 }} />
      {getCommonTypography(formatted)}
    </>
  );

  return (
    canAccess(permKey.PAGE_PANEL_DOC_PREVIEW) ? (
      <Link to={ROUTE.PANEL_DOC_PREVIEW.path.replace(':id', _id)} key={_id}>
        { renderResult }
      </Link>
    ) :
      (
        <div key={_id}>
          {renderResult}
        </div>
      )
  );
}
