import { Card, Col, Row } from 'antd';
import { uniqueId } from 'lodash';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { LeftOutlined } from '@ant-design/icons';

import useStyles from './styles';

const { Meta } = Card;

const AnalysisLegend = ({ style }) => {
  const classes = useStyles();
  const { t } = useTranslation('gisLocationIntelligencePage');

  const grades = style?.paint?.['fill-color'];
  const title = grades[1][1][1];

  const renderStylingGradeItem = useCallback(arr => {
    return arr.map(element => {
      const { sign, value, color } = element;
      return (
        <div className={classes.legendItem} key={uniqueId()}>
          <Row gutter={[10]}>
            <Col span={4}>{value.lower ? value.lower : 0 }</Col>
            <Col span={3}>{sign.lower}</Col>
            <Col style={{ backgroundColor: color, borderRadius: '5px', margin: '1px' }} span={6} />
            <Col span={3}>{sign.higher}</Col>
            <Col span={4}>{value.higher}</Col>
          </Row>
        </div>
      );
    });
  }, [classes.legendItem]);

  const renderStylingGradesList = useCallback(() => {
    const result = [];
    for (let i = 0; i < grades?.length; i++) {
      if (i % 2 !== 0 && i > 0) {
        if (Array.isArray(grades[i])) {
          const element = {
            sign: { lower: <LeftOutlined />, higher: <LeftOutlined /> },
            value: { lower: grades[i - 2]?.[2], higher: grades[i][2] },
            color: grades[i + 1],
          };
          result.push(element);
        }
        else {
          const element = {
            sign: { lower: <LeftOutlined />, higher: null },
            value: { lower: grades[i - 2][2], higher: null },
            color: grades[i],
          };
          result.push(element);
        }
      }
    }
    return renderStylingGradeItem(result);
  }, [grades, renderStylingGradeItem]);

  return (
    <Card
      className={classes.cardWrapper}
    >
      <Meta title={t('LEGEND_TITLE')} description={t(`STAT_TYPES.${title}`)} />
      <hr />
      {renderStylingGradesList()}
    </Card>
  );
};

export default AnalysisLegend;
