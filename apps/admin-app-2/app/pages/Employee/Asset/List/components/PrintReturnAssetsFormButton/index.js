import { Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { employeeAssetListSelector } from '../../redux/selectors';

const PrintReturnAssetsFormButton = ({ employeeId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['employeePage', 'assetPage']);
  const isPending = useSelector(employeeAssetListSelector.getIsPending);

  const handleClick = () => {
    dispatch(Creators.printReturnAssetsForm({ t, employeeId }));
  };

  return (
    <Button
      loading={isPending}
      onClick={handleClick}
      icon={<PrinterOutlined />}
    >
      {t('BUTTONS.PRINT_ASSETS_RETURN_FORM')}
    </Button>
  );
};

export default PrintReturnAssetsFormButton;
