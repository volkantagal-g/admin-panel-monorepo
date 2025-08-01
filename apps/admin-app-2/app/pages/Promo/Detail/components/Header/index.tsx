import { useTranslation } from 'react-i18next';
import { Button, Col, PageHeader, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';

import { PromoStatus } from '../PromoStatus';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { CopyPromoModal } from '@app/pages/Promo/Detail/components/OverwriteModal/CopyPromoModal/CopyPromoModal';

const Header = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('promoPage');
  const isPreviewsHidden = useSelector(PromoDetailSlice.selectors.isPreviewsHidden);
  const isMaster = useSelector(PromoDetailSlice.selectors.isMaster);

  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);

  const navigate = useNavigate();

  const handleTogglePicturePreviews = () => {
    dispatch(PromoDetailSlice.actions.togglePicturePreviews());
  };

  const onBack = () => {
    navigate('/promo/list');
  };

  return (
    <Row gutter={[12, 12]}>
      <Col span={12}>
        <Row>
          <PageHeader onBack={onBack} className="p-0" title={t('PROMO_DETAIL_TITLE')} />
        </Row>
      </Col>
      <Col span={12} className="text-right d-flex justify-content-end align-items-center">
        {canEdit && (
          <>
            <CopyPromoModal />
            <PromoStatus />
          </>
        )}
        {!isMaster && (
          <Button
            className="ml-2"
            onClick={handleTogglePicturePreviews}
            type="primary"
            size="small"
            icon={isPreviewsHidden ? <CaretRightOutlined /> : <CaretDownOutlined />}
            shape="round"
          >
            {isPreviewsHidden ? t('SHOW_PICTURE_PREVIEWS') : t('HIDE_PICTURES_PREVIEWS')}
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default Header;
