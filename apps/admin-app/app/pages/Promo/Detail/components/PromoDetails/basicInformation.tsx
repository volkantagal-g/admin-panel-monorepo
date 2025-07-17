import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { Descriptions } from 'antd';

import { memo } from 'react';

import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { PROMO_HIERARCHY_TRANSLATIONS, promoMechanics } from '@app/pages/Promo/constantValues';
import { getLangKey } from '@shared/i18n';
import { CopyableText } from '@shared/components/UI/CopyableText/copyableText';
import { PromoTag } from '@app/pages/Promo/components/PromoTag';
import { formatDate } from '@shared/utils/dateHelper';

export const BasicInformation = memo(function BasicInformation() {
  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const { t } = useTranslation('promoPage');

  return (
    <Descriptions
      className="w-100"
      bordered
      column={1}
      size="small"
      title={t('BASIC_INFORMATION.TITLE')}
    >
      <Descriptions.Item label={t('PROMO_HIERARCHY')}>
        {PROMO_HIERARCHY_TRANSLATIONS[promo?.hierarchy][getLangKey()]}
      </Descriptions.Item>
      {promo.master && (
        <Descriptions.Item label={t('BASIC_INFORMATION.MASTER_PROMO')}>
          <PromoTag promo={promo.master} hasRedirect />
        </Descriptions.Item>
      )}
      <Descriptions.Item label={t('BASIC_INFORMATION.PROMO_CODE')}>
        <CopyableText>{promo.promoCode}</CopyableText>
      </Descriptions.Item>
      <Descriptions.Item label={t('BASIC_INFORMATION.PROMO_ID')}>
        <CopyableText>{promo._id}</CopyableText>
      </Descriptions.Item>
      {
        (promo.isParent || promo.isParentPromo) ? (
          <Descriptions.Item label={t('BASIC_INFORMATION.VALID_DATES')}>
            {formatDate(promo.validFrom)} - {formatDate(promo.validUntil)}
          </Descriptions.Item>
        ) :
          (
            <Descriptions.Item label={t('BASIC_INFORMATION.PROMO_TYPE')}>
              {promoMechanics[promo?.promoMechanic]?.[getLangKey()]}
            </Descriptions.Item>
          )
      }
    </Descriptions>
  );
});
