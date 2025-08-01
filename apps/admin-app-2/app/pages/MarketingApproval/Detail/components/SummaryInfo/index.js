import { Col, Row, Skeleton } from 'antd';
import { memo } from 'react';

import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { Button, Space } from '@shared/components/GUI';
import { promoDomainTypes } from '@app/pages/Promo/constantValues';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { updateNotificationsSelector } from '@app/pages/MarketingApproval/Detail/redux/selectors';
import { STATUS } from '@app/pages/MarketingApproval/constants';

const SummaryInfo = memo(({
  handleSubmit,
  countryCode,
  promoCode,
  status,
  description,
  domains,
  isGeneratedContentPending,
}) => {
  const selectedLanguage = useSelector(getSelectedLanguage);
  const { t } = useTranslation('marketingApproval');
  const isUpdateNotificationPending = useSelector(updateNotificationsSelector.getIsPending);
  const domainsText = promoDomainTypes[domains]?.[selectedLanguage];

  return (
    <Space>
      {isGeneratedContentPending ? <Skeleton active paragraph={{ rows: 1 }} /> : (
        <Row gutter={[20, 20]}>
          <Col xs={24} md={24}>
            <Row className="flex-nowrap justify-content-between align-items-center">
              <Col lg={20}>
                <Row>
                  <Col lg={24}>
                    <div className="d-inline pr-4 border-right"><b>{t('PROMO_CODE')} :</b> {promoCode}</div>
                    <div className="d-inline px-4 border-right"><b>{t('COUNTRY')} :</b> {countryCode}</div>
                    <div className="d-inline px-4"><b> {t('DOMAINS')} :</b> {domainsText}</div>
                  </Col>
                  <Col lg={24} className="pt-4">
                    <div><b>{t('DESCRIPTION')} :</b> {description}</div>
                  </Col>
                </Row>
              </Col>
              <Col lg={4}>
                {isUpdateNotificationPending ? (
                  <Skeleton.Button active className="float-right" />
                )
                  : (
                    <Button
                      disabled={status !== STATUS.WAITING}
                      color="primary"
                      className="float-right px-3"
                      onClick={handleSubmit}
                    >
                      {/* Only on waiting status */}
                      {t('button:SEND')}
                    </Button>
                  )}

              </Col>

            </Row>
          </Col>
        </Row>
      )}
    </Space>
  );
});

export default SummaryInfo;
