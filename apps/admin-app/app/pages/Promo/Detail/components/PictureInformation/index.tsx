import { useTranslation } from 'react-i18next';

import { Col } from 'antd';
import { useSelector } from 'react-redux';

import { PromoPicture } from '@app/pages/Promo/Detail/components/PictureInformation/PromoPicture';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

type PropTypes = {
  filteredLanguages?: string[]
  className?: string;
}

export function PromoPicturePreview(props: PropTypes) {
  const { t } = useTranslation('promoPage');

  return (
    <PromoPicture
      title={t('PICTURE_INFORMATION.PICTURE_PREVIEW')}
      imagePath={['picURL']}
      hasSizeRestriction
      {...props}
    />
  );
}

export function PromoPopUpPreview(props: PropTypes) {
  const { t } = useTranslation('promoPage');

  return (
    <PromoPicture
      title={t('PICTURE_INFORMATION.POPUP_PREVIEW')}
      imagePath={['popup', 'imageUrl']}
      {...props}
    />
  );
}

export function PromoNotificationPreview(props: PropTypes) {
  const { t } = useTranslation('promoPage');

  return (
    <PromoPicture
      title={t('PICTURE_INFORMATION.NOTIF_PREVIEW')}
      imagePath={['notification', 'imageUrl']}
      {...props}
    />
  );
}

export function PromoThumbnailPreview(props: PropTypes) {
  const { t } = useTranslation('promoPage');

  return (
    <PromoPicture
      title={t('PICTURE_INFORMATION.THUMBNAIL_PREVIEW')}
      imagePath={['thumbnailURL']}
      {...props}
    />
  );
}

export default function PictureInformation() {
  const isMasterPromo = useSelector(PromoDetailSlice.selectors.isMaster);
  const isParent = useSelector(PromoDetailSlice.selectors.isParent);
  const isPreviewsHidden = useSelector(PromoDetailSlice.selectors.isPreviewsHidden);

  if (isMasterPromo || isPreviewsHidden) {
    return null;
  }

  return (
    <Col xs={6}>
      <PromoPicturePreview />
      <PromoPopUpPreview />
      <PromoNotificationPreview />
      {!isParent && <PromoThumbnailPreview />}
    </Col>
  );
}
