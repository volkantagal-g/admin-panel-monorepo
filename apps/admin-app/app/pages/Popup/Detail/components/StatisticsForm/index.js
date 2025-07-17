import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Badge, Card, Statistic } from 'antd';
import { useSelector } from 'react-redux';

import { useTheme } from 'react-jss';

import AntCard from '@shared/components/UI/AntCard';
import { getLangKey } from '@shared/i18n';
import LiveClock from '@shared/components/UI/LiveClock';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

import { getPopupDetailSelector } from '@app/pages/Popup/Detail/redux/selectors';

const StatisticsForm = () => {
  const { t } = useTranslation('marketing');
  const theme = useTheme();

  const popupDetail = useSelector(getPopupDetailSelector.getData);

  return (
    <Badge.Ribbon text={<Ribbon />}>
      <AntCard bordered={false} title={t('STATISTICS')}>
        <Row>
          <Col xs={24} sm={12} lg={12}>
            <Card>
              <Row align="middle" justify="center" gutter={32}>
                <Col>
                  <Statistic
                    title={t('STATISTIC_INFO.TOTAL_SHOW_COUNT')}
                    value={popupDetail?.stats?.totalShowCount ? popupDetail?.stats?.totalShowCount : '-'}
                    valueStyle={{ color: theme.color.getir.purple, textAlign: 'center' }}
                  />
                </Col>
                <Col>
                  <Statistic
                    title={t('STATISTIC_INFO.UNIQUE_USER_VIEW_COUNT')}
                    value={popupDetail?.stats?.uniqueUserViewCount ? popupDetail?.stats?.uniqueUserViewCount : '-'}
                    valueStyle={{ color: theme.color.getir.yellow, textAlign: 'center' }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={12}>
            <Card>
              <Row align="middle" justify="center" gutter={32}>
                <Col>
                  <Statistic
                    title={t('STATISTIC_INFO.POSITIVE_BUTTON_CLICK_COUNT')}
                    value={popupDetail?.stats?.button1ClickCount ? popupDetail?.stats?.button1ClickCount : '-'}
                    valueStyle={{ color: theme.color.getir.purple, textAlign: 'center' }}
                  />
                </Col>
                <Col>
                  <Statistic
                    title={t('STATISTIC_INFO.NEGATIVE_BUTTON_CLICK_COUNT')}
                    value={popupDetail?.stats?.button2ClickCount ? popupDetail?.stats?.button2ClickCount : '-'}
                    valueStyle={{ color: theme.color.getir.lightGray, textAlign: 'center' }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </AntCard>
    </Badge.Ribbon>
  );
};

const Ribbon = () => {
  return (
    <>
      <span className="mr-2">{getSelectedCountry().name[getLangKey()]}</span>
      <LiveClock />
    </>
  );
};

export default memo(StatisticsForm);
