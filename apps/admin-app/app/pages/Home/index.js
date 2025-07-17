import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Col, Card, PageHeader, Row } from 'antd';

import { getLangKey } from '@shared/i18n';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { isMobile } from '@shared/utils/common';

import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import waveEmoji from '@shared/assets/images/emojis/wave-emoji.png';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import useStyles from './styles';
import AboutPanel from './components/AboutPanel';
import { homePageSections } from './panelData';

const HomePagePage = () => {
  const { t } = useTranslation('homePage');
  const classes = useStyles();
  const langKey = getLangKey();

  const { Can } = usePermission();

  usePageViewAnalytics({ name: ROUTE.HOME.name, squad: ROUTE.HOME.squad });

  return (
    <div className={classes.page}>
      <PageTitleHeader title={t('PAGE_TITLE')} />
      <PageHeader title={(
        <>
          {isMobile() ? t('MOBILE_TITLE') : t('TITLE')}!
          <img className={classes.titleEmoji} src={waveEmoji} alt="wave-emoji" />
        </>
      )}
      />
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={12} md={16}>
          <Row gutter={[8, 8]}>
            {homePageSections?.map(data => {
              const CanComponent = data.permKey ? Can : Fragment;
              const canProps = data.permKey ? { permKey: data.permKey } : {};
              return (
                <CanComponent key={data.en.title} {...canProps}>
                  <Col xs={24} sm={24} md={12}>
                    <Card title={data[langKey].title} bordered={false} className={classes.cardWrapper}>
                      <p>
                        {data[langKey].description}
                      </p>
                    </Card>
                  </Col>
                </CanComponent>
              );
            })}
          </Row>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Row gutter={[8, 8]}>
            <Can permKey={permKey.PAGE_HOME_CHANGELOGS_READ}>
              <Col xs={24} sm={24}>
                <AboutPanel />
              </Col>
            </Can>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomePagePage;
