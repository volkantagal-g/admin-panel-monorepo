import { Skeleton, Empty, Row, Col, Divider } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import useStyles from './styles';
import useVerticalConfig from './useVerticalConfig';

export const SummarySkeleton = ({ vertical }) => {
  const config = useVerticalConfig(vertical);
  const { t } = useTranslation(config.translationKey);
  const classes = useStyles();

  return (
    <AntCard title={t('SUMMARY.TITLE')} className={classes.card}>
      <Row gutter={[12, 12]}>
        <Col span={14}>
          <Skeleton.Input active className={classes.skeletonSummaryTitle} />
        </Col>
        <Col span={10}>
          <Skeleton.Input active className={classes.skeletonSummaryValue} />
        </Col>
        <Col span={24}>
          <Skeleton.Button active className={classes.skeletonSummaryButton} />
        </Col>
      </Row>

      {[1, 2, 3, 4].map(categoryKey => (
        <div key={categoryKey}>
          <Divider />
          <Skeleton.Input active className={classes.skeletonCategoryTitle} />
          {[1, 2, 3, 4].map(fieldKey => (
            <Row key={fieldKey} gutter={[12, 8]}>
              <Col span={14}>
                <Skeleton.Input active className={classes.skeletonCategoryLabel} />
              </Col>
              <Col span={10}>
                <Skeleton.Input active className={classes.skeletonCategoryValue} />
              </Col>
            </Row>
          ))}
        </div>
      ))}
    </AntCard>
  );
};

export const SummaryEmpty = ({ vertical }) => {
  const config = useVerticalConfig(vertical);
  const { t } = useTranslation(config.translationKey);
  const classes = useStyles();

  return (
    <AntCard title={t('SUMMARY.TITLE')} className={classes.card}>
      <Empty
        description={t('NO_DATA')}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </AntCard>
  );
};
