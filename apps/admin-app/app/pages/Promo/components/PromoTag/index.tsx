import { Button, Space, Tag } from 'antd';

import { ExportOutlined } from '@ant-design/icons';

import React from 'react';

import { usePromoTagStyles } from '@app/pages/Promo/components/PromoTag/styles';
import { PromoTagType } from '@app/pages/Promo/types';

type PropTypes = {
  hasRedirect?: boolean,
  promo: PromoTagType
  showId?: boolean
}

export function PromoTag({ promo: { promoCode, bgColor, textColor, _id }, hasRedirect, showId }: PropTypes) {
  const styles = usePromoTagStyles({ textColor });

  return (
    <Tag key={promoCode} color={bgColor || '#5cb85c'} className={styles.tag}>
      <Space>
        <span>{promoCode.concat(showId ? ` (${_id})` : '')}</span>
        {
          hasRedirect &&
          <Button href={`/promo/detail/${_id}`} target="_blank" type="link" icon={<ExportOutlined />} />
        }
      </Space>
    </Tag>
  );
}
