import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { Col, Collapse, Row } from 'antd';

import { ParentPromoDetails } from '@app/pages/Promo/Detail/components/PromoDetails/parentPromoDetails';
import { UsageInformation } from './usageInformation';
import { PromoPicturePreview } from '@app/pages/Promo/Detail/components/PictureInformation';
import { usePromoDetailsStyles } from '@app/pages/Promo/Detail/components/PromoDetails/style';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { BasicInformation } from '@app/pages/Promo/Detail/components/PromoDetails/basicInformation';
import { InactiveParentAlert } from '@app/pages/Promo/Detail/components/PromoDetails/inactiveParentAlert';

export default function PromoDetails() {
  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const isMaster = useSelector(PromoDetailSlice.selectors.isMaster);
  const { t } = useTranslation('promoPage');
  const styles = usePromoDetailsStyles();

  return (
    <Collapse className="mb-2" defaultActiveKey={1}>
      <Collapse.Panel header={t('PROMO_DETAILS')} key={1}>
        <Row gutter={[16, 16]} className={styles.descriptions}>
          <Col xs={24} md={15}>
            <Row gutter={[16, 16]} className="w-100">
              {!isMaster && (
              <Col xs={24} sm={9} className={styles.pictureWrapper}>
                <PromoPicturePreview filteredLanguages={['tr']} className={styles.picture} />
              </Col>
              )}
              <Col xs={24} sm={isMaster ? 24 : 15}>
                {
                  promo.isParentPromo ? (

                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <BasicInformation />
                      </Col>
                      <Col span={24}>
                        <UsageInformation />
                      </Col>
                    </Row>
                  ) : (
                    <BasicInformation />
                  )
                }
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={9}>
            {promo.isParentPromo ? (
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ParentPromoDetails />
                </Col>
                <Col span={24}>
                  <InactiveParentAlert />
                </Col>
              </Row>
            ) : (
              <UsageInformation />
            )}
          </Col>
        </Row>
      </Collapse.Panel>
    </Collapse>
  );
}
