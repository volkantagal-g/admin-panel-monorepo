import PropTypes from 'prop-types';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GoogleOutlined } from '@ant-design/icons';

import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import permKey from '@shared/shared/permKey.json';
import useStyles from './styles';
import { ROUTE } from '@app/routes';

function ActionButtons(props) {
  const { _id, urlPath, toLat, toLng } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const handleClick = () => { };
  const feeDetailsUrl = ROUTE.MARKET_FEES_DETAILS.path.replace(':warehouseId', _id);
  const basketAmountDetailsUrl = ROUTE.GETIR_MARKET_BASKET_CONFIG_DETAILS.path.replace(':warehouseId', _id);
  return (
    <Space>
      <RedirectButtonV2
        text={t('global:FEE')}
        to={feeDetailsUrl}
        permKey={permKey.PAGE_MARKET_FEES_DETAILS}
        target="_blank"
        size="small"
      />
      <RedirectButtonV2
        text={t('global:BASKET')}
        to={basketAmountDetailsUrl}
        permKey={permKey.PAGE_GETIR_MARKET_BASKET_CONFIG_DETAILS}
        target="_blank"
        size="small"
      />
      <Button
        id={_id}
        size="small"
        variant="contained"
        onClick={handleClick}
        type="default"
      >
        <Link to={`${urlPath}${_id}`}>
          {t('global:DETAIL')}
        </Link>
      </Button>
      <RedirectButtonV2
        text={t('global:MAP')}
        to={`/warehouse/liveMap/${_id}`}
        permKey={permKey.PAGE_WAREHOUSE_LIVE_MAP}
        target="_blank"
        size="small"
      />
      {
        (toLat && toLng) ? (
          [
            <Button
              key={_id}
              type="default"
              onClick={handleClick}
              size="small"
              variant="contained"
              target="_blank"
              href={`http://maps.google.com/maps?daddr=${toLat},${toLng}&amp;ll=`}
              className={classes.googleMapButton}
            >
              <GoogleOutlined />
            </Button>,
            <Button
              key={_id}
              type="default"
              onClick={handleClick}
              size="small"
              variant="contained"
              target="_blank"
              href={`https://harita.yandex.com.tr/?rtext=${toLat}%2C${toLng}`}
              className={classes.yandexMapButton}
            >
              Y
            </Button>,
          ]
        ) : null
      }
    </Space>
  );
}

ActionButtons.propTypes = {
  _id: PropTypes.string.isRequired,
  urlPath: PropTypes.string.isRequired,
  toLat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  toLng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ActionButtons.defaultProps = {
  toLat: undefined,
  toLng: undefined,
};

export default ActionButtons;
