import { Link } from 'react-router-dom';

import { usePermission } from '@shared/hooks';

export default function LinkOrText({
  permKey,
  to,
  text,
  ...otherLinkProps
}) {
  const { canAccess } = usePermission();

  if (!permKey || canAccess(permKey)) {
    return (
      <Link to={to} {...otherLinkProps}>{text}</Link>
    );
  }

  return text;
}
