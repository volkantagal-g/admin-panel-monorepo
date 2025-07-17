import { Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { ROUTE } from '@app/routes';
import useStyles from './styles';
import permKey from '@shared/shared/permKey.json';
import { RedirectButton } from '@shared/components/GUI';

const { Title } = Typography;

const Header = () => {
  const classes = useStyles();
  const { t } = useTranslation('feeDetailsPage');
  return (
    <div className={classes.headerWrapper}>
      <Title className={classes.title} level={3}>{t('TITLE')}</Title>
      <RedirectButton
        size="small"
        type="primary"
        to={ROUTE.MARKET_FEES_BULK_UPLOAD.path}
        permKey={permKey.PAGE_MARKET_FEES_BULK_UPLOAD}
        text={(
          <span>
            {t('sidebar:MARKET_FEES_BULK_UPLOAD')} <ArrowRightOutlined />
          </span>
        )}
      />
    </div>
  );
};

export default Header;
