import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import FormWrapper from '@app/pages/Lottery/common/FormWrapper';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

const { Title } = Typography;

const LotteryNewPage = () => {
  usePageViewAnalytics({ name: ROUTE.LOTTERY_NEW.name, squad: ROUTE.LOTTERY_NEW.squad });

  const { t } = useTranslation('lotteryPage');
  const pageTitle = t('global:PAGE_TITLE.LOTTERY.NEW');

  return (
    <>
      <Row gutter={[0, 8]} justify="space-between" align="middle">
        <Title level={3}>{pageTitle}</Title>
      </Row>

      <Row gutter={[0, 8]}>
        <Col span={24}>
          <FormWrapper />
        </Col>
      </Row>
    </>
  );
};

export default LotteryNewPage;
