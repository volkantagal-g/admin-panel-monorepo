import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, Menu, Popconfirm, Space, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

import { formatDateWithSecond } from '@shared/utils/dateHelper';
import { getDurationText, getLastBusyOptionText } from '../../utils';
import useStyles from './styles';
import {
  COURIER_STATUS_BUSY,
  COURIER_STATUS_FREE,
  NEW_COURIER_TYPE,
} from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { Creators } from '../../redux/actions';
import { courierOperationSelector } from '../../redux/selectors';
import SetCourierBusyModal from '../SetBusyModal';
import { courierStatuses } from '@shared/shared/constantValues';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

function OperationsHeader({ courierDetail, courierBusyOptions }) {
  const classes = useStyles();
  const { t } = useTranslation(['courierPage']);
  const dispatch = useDispatch();
  const isPending = useSelector(courierOperationSelector.getIsPending);
  const [isBusyModalVisible, setIsBusyModalVisible] = useState(false);
  const [isSwitchEditable, setIsSwitchEditable] = useState(true);
  const { Can, canAccess } = usePermission();

  const hasFinanceEmployeeRole = canAccess(permKey.PAGE_COURIER_DETAIL_COMPONENT_GETIR_FINANCE_EMPLOYEE);

  const handleMenuClick = () => {};

  const setFree = () => {
    dispatch(Creators.setCourierFreeRequest({ id: courierDetail._id }));
  };
  const openSetBusyModal = () => {
    setIsBusyModalVisible(true);
  };

  const handleStatusChange = status => {
    if (status) {
      dispatch(Creators.setCourierActivateRequest({ id: courierDetail._id }));
    }
    else {
      dispatch(Creators.setCourierDeactivateRequest({ id: courierDetail._id }));
    }
  };

  const canAccessActivationSwitch = useMemo(
    () => canAccess(permKey.PAGE_COURIER_DETAIL_ACTIVATE) &&
      canAccess(permKey.PAGE_COURIER_DETAIL_DEACTIVATE),
    [canAccess],
  );

  useEffect(() => {
    if ((courierDetail?.courierType === NEW_COURIER_TYPE.TMS || courierDetail?.courierType === NEW_COURIER_TYPE.RDU) && courierDetail.isLoggedIn === true) {
      setIsSwitchEditable(true);
    }
    else if (
      courierDetail.isLoggedIn === true ||
        (courierDetail.person && courierDetail.person.isActivated !== true)
    ) {
      setIsSwitchEditable(false);
    }
  }, [courierDetail]);

  const menu = (
    <Menu onClick={handleMenuClick}>
      {courierDetail.status !== COURIER_STATUS_FREE && (
        <Popconfirm
          onConfirm={setFree}
          okText={t('button:YES')}
          cancelText={t('button:CANCEL')}
          title={t('CONFIRM_COURIER_SET_FREE')}
        >
          <Menu.Item key="Item-free">{t('SET_FREE')}</Menu.Item>
        </Popconfirm>
      )}
      {courierDetail.status !== COURIER_STATUS_BUSY && (
        <Menu.Item key="Item-busy" onClick={openSetBusyModal}>
          {t('SET_BUSY')}
        </Menu.Item>
      )}
    </Menu>
  );

  const handleCourierStatus = courierDetails => {
    let element = (
      <Can permKey={permKey.PAGE_COURIER_DETAIL_STATUS}>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button
            danger={courierDetails.status !== COURIER_STATUS_FREE}
            disabled={isPending}
          >
            <Space>
              {courierDetail?.status &&
          courierStatuses[courierDetails.status]?.[getLangKey()]}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Can>
    );
    if (courierDetails?.courierType === NEW_COURIER_TYPE.TMS || courierDetails?.courierType === NEW_COURIER_TYPE.RDU) {
      element = null;
    }
    return element;
  };

  return (
    <div className={classes.wrapper}>
      <span className={classes.text}>
        {courierDetail.statusLastChangedAt &&
          `${formatDateWithSecond(
            courierDetail.statusLastChangedAt,
          )} - ${getDurationText(courierDetail.statusLastChangedAt)}`}
        {courierDetail.lastBusyOption &&
          ` - ${getLastBusyOptionText(
            courierBusyOptions,
            courierDetail.lastBusyOption,
          )}`}
      </span>
      {
        !hasFinanceEmployeeRole && (
          <>
            {courierDetail.hasBusyRequest && (<strong className="text-danger">{t('HAS_BUSY_REQUEST')}</strong>)}
            {handleCourierStatus(courierDetail)}
            {canAccessActivationSwitch && (
            <Switch
              checkedChildren={t('global:ACTIVE')}
              unCheckedChildren={t('global:INACTIVE')}
              disabled={!isSwitchEditable || isPending}
              checked={courierDetail.isActivated}
              onChange={handleStatusChange}
            />
            )}
            <SetCourierBusyModal
              isModalVisible={isBusyModalVisible}
              setIsModalVisible={setIsBusyModalVisible}
              courierDetail={courierDetail}
            />
          </>
        )
      }
    </div>
  );
}

export default OperationsHeader;
