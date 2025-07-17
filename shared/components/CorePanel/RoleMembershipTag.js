import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import { ROLE_MEMBER_TYPE } from '@shared/constants/panelUser';

const tagColorMap = {
  [ROLE_MEMBER_TYPE.STANDARD]: 'blue',
  [ROLE_MEMBER_TYPE.OWNER]: 'gold',
};

export default function RoleMembershipTag({ memberType }) {
  const { t } = useTranslation('rolePage');
  return (
    <Tag color={tagColorMap[memberType]}>
      {t(`rolePage:ROLE_MEMBER_TYPE.${memberType}`)}
    </Tag>
  );
}
