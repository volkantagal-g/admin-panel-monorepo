import { Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';

import useStyles from './styles';
import { t } from '@shared/i18n';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const RedBasketInfoTable = ({ order, onClose }) => {
  const { Can } = usePermission();

  const classes = useStyles();

  return (
    <div>
      <div className={classes.markerInfoHeader}>
        <span className="pl-1 font-weight-bold">{t('global:ORDER')}</span>
        <div>
          <Can permKey={permKey.PAGE_ARTISAN_ORDER_DETAIL}>
            <Link to={ROUTE.ARTISAN_ORDER_DETAIL.path.replace(':orderDetailId', order.id)} target="_blank">
              <Button shape="round" size="small" type="ghost">
                {t('global:DETAIL')}
              </Button>
            </Link>
          </Can>
          <Button type="link" onClick={() => onClose()} danger shape="circle" size="middle" icon={<CloseCircleOutlined />} />
        </div>
      </div>
    </div>
  );
};

export default RedBasketInfoTable;
