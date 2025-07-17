import { PageHeader, Col, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { QuestionCircleOutlined } from '@ant-design/icons';

import useStyles from './styles';

const Header = () => {
  const { t } = useTranslation('foodMealCardReconciliation');
  const classes = useStyles();

  const getTitle = () => (
    <>
      {t('global:PAGE_TITLE.FOOD.MEAL_CARD_RECONCILIATION')}
      <Tooltip title={t('foodMealCardReconciliation:TOOLTIP')}>
        <sup>
          <QuestionCircleOutlined className={classes.tooltip} />
        </sup>
      </Tooltip>
    </>
  ); 

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={getTitle()}
        />
      </Col>
    </Row>
  );
};

export default Header;
