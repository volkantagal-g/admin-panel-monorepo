import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function DetailButton(props) {
  const { urlpath } = props;
  const { t } = useTranslation();

  return (
    <Space>
      <Button
        {...props}
        size="small"
        variant="contained"
        type="default"
      >
        <Link to={urlpath}>
          {t('global:DETAIL')}
        </Link>
      </Button>
    </Space>
  );
}

export default DetailButton;
