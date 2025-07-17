import { Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import permKey from '@shared/shared/permKey.json';
import useStyles from './styles';
import { ROUTE } from '@app/routes';
import { RedirectButton } from '@shared/components/GUI';

const Header = () => {
  const classes = useStyles();
  const { t } = useTranslation('basketConfigPage');
  return (
    <Row data-testid="basket-configs-header">
      <Col flex={1}>
        <p className={classes.title}>{t('TITLE')}</p>
      </Col>
      <Col>
        <RedirectButton
          permKey={permKey.PAGE_MARKET_FEES_BULK_UPLOAD}
          to={ROUTE.MARKET_FEES_BULK_UPLOAD.path}
          size="small"
          type="primary"
          text={(
            <span>
              {t('BULK_UPDATE_LINK_TEXT')} <ArrowRightOutlined />
            </span>
          )}
        />
      </Col>
    </Row>
  );
};
export default Header;
