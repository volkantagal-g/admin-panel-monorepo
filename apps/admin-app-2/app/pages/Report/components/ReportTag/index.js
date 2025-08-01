import { Tag, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getLangKey } from '@shared/i18n';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import useStyles from './styles';

export default function ReportTag({ isViewMode = false, reportTag, withTooltip }) {
  const { t } = useTranslation('reportsPage');
  const { canAccess } = usePermission();
  const canAccessTagDetail = canAccess(permKey.PAGE_REPORT_TAGS_DETAIL);
  const tagDetailRoute = ROUTE.REPORT_TAGS_DETAIL.path;
  const { _id, textColor, backgroundColor, name, description } = reportTag;
  const tagDetailPath = tagDetailRoute.replace(':id', _id);
  const classes = useStyles({ backgroundColor, textColor });

  const tag = (
    <Tag className={classes.reportTag}>
      {
        _id && !isViewMode && canAccessTagDetail ?
          (
            <Link to={tagDetailPath} target="_blank" style={{ color: textColor }}>
              {name?.[getLangKey()] || t('EXAMPLE_NAME')}
            </Link>
          ) :
          (name?.[getLangKey()] || t('EXAMPLE_NAME'))
      }
    </Tag>
  );

  return withTooltip ? (
    <Tooltip placement="rightTop" title={description[getLangKey()]}>
      {tag}
    </Tooltip>
  ) : (
    tag
  );
}
