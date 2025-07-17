import PropTypes from 'prop-types';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GoogleOutlined } from '@ant-design/icons';

import useStyles from './styles';

function ActionButtons(props) {
  const { _id, urlPath, toLat, toLng } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  
  const handleClick = () => { };
  
  return (
    <Space>
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
              <GoogleOutlined></GoogleOutlined>
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
  _id: PropTypes.string,
  urlPath: PropTypes.string,
  toLat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  toLng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ActionButtons;
