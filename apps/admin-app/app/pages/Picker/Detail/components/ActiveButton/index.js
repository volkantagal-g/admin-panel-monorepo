import { Popconfirm, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { usePermission } from '@shared/hooks';
import { pickerDetailSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import permKey from '@shared/shared/permKey.json';

function ActiveButton({ id }) {
  const { t } = useTranslation('pickerDetailPage');
  const { isActivated } = useSelector(pickerDetailSelector.getData);
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const isAuthorizedToChangeActiveness = canAccess(
    permKey.PAGE_PICKER_DETAIL_SET_PICKER_ACTIVATE,
  );
  return (
    <div>
      <Popconfirm
        title={t('UPDATE_ACTIVE_POPUP_MESSAGE', { active: isActivated ? t('DEACTIVATE') : t('ACTIVATE') })}
        onConfirm={() => {
          if (isAuthorizedToChangeActiveness) {
            if (!isActivated) {
              dispatch(Creators.activatePickerRequest({ id }));
            }
            else {
              dispatch(Creators.deactivatePickerRequest({ id }));
            }
          }
        }}
        okText={t('global:YES')}
        cancelText={t('global:NO')}
        disabled={!isAuthorizedToChangeActiveness}
      >
        {isActivated ? (
          <Button type="primary">{t('ACTIVE')}</Button>
        ) : (
          <Button type="danger">{t('INACTIVE')}</Button>
        )}
      </Popconfirm>
    </div>
  );
}

export default ActiveButton;
