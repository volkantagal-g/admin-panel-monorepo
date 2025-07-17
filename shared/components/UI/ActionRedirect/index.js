import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { t } from '@shared/i18n';
import { usePermission } from '@shared/hooks';
import { redirectHelper } from './utils';

/**
 * ActionRedirect - Functional Component
 * @param {route, translateKey, urlParams} props
 * @returns
 * Link component
 * if current panel user is allowed to be redirected with a valid internal url detected
 * else the getTranslatedText text wrapped in a span with no url param(s) exposed
 * use case:
 * for an internal route defined in ROUTE i.e.
 * ROLE_DETAIL: {
    path: '/role/detail/:id',
    component: pages.RoleDetail,
    allowed: [],
  },
 * in action:
 * <ActionRedirect route="ROLE_DETAIL" urlParams={{ id: roleId }} />
 */
const ActionRedirect = ({ route, translateKey, urlParams }) => {
  const { canAccess } = usePermission();

  const { isValidToRedirect, redirectUrl } = useMemo(
    () => redirectHelper({ route, urlParams }),
    [route, urlParams],
  );

  const isAuthToRedirect = canAccess(`PAGE_${route}`);

  if (isValidToRedirect && isAuthToRedirect) {
    return (
      <Link to={redirectUrl}>
        {t(translateKey)}
      </Link>
    );
  }

  return (
    <span>{t(translateKey)}</span>
  );
};

ActionRedirect.propTypes = {
  route: PropTypes.string.isRequired,
  translateKey: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  urlParams: PropTypes.object,
};

ActionRedirect.defaultProps = { translateKey: 'global:DETAIL' };

export default memo(ActionRedirect);
