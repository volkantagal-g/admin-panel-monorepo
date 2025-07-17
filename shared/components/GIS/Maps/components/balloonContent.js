import { get } from 'lodash';
import { Descriptions, Tag } from 'antd';

import { t, getLangKey } from '@shared/i18n';
import { domainTypes } from '@shared/shared/constantValues';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';

export default function BalloonContent({ warehouse }) {
  return (
    <Descriptions title={t('global:WAREHOUSE')} column={1} size="small" bordered>
      <Descriptions.Item label={t('global:NAME')}>{ warehouse?.name || 'N/A' }</Descriptions.Item>
      <Descriptions.Item label={t('global:CITY')}>{ get(warehouse, `city.name.${getLangKey()}`, 'N/A') }</Descriptions.Item>
      <Descriptions.Item label={t('global:DOMAIN_TYPES')}>
        {
          warehouse?.domainTypes.map(domainType => (
            <Tag key={domainType}>{get(domainTypes, [domainType, getLangKey()])}</Tag>
          ))
        }
      </Descriptions.Item>
      <Descriptions.Item label="ID">
        <CopyToClipboard message={warehouse._id || warehouse.id} />
      </Descriptions.Item>
    </Descriptions>
  );
}
