import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Row, Col, Modal, Switch, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { Creators } from '../../redux/actions';
import { getSupplierByIdSelector } from '../../redux/selectors';

import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { isAllowedToOperate } from '../../utils';

import useStyles from './styles';

const Header = () => {
  const { t } = useTranslation('supplierPage');
  const dispatch = useDispatch();
  const selectedCountry = useSelector(getSelectedCountryV2);
  const supplier = useSelector(getSupplierByIdSelector.getData);
  const [modal, confirmationModalContext] = Modal.useModal();
  const [isActive, setIsActive] = useState();
  const { canAccess } = usePermission();
  const hasPermissionToChangeSupplierActiveness = canAccess(
    permKey.PAGE_SUPPLIER_DETAIL_CHANGE_ACTIVENESS,
  );

  const classes = useStyles();

  useEffect(() => {
    setIsActive(supplier.isActive);
  }, [supplier.isActive]);

  const activateSupplier = () => {
    const modalConfig = {
      content: <>{t('CONFIRM_ACTIVATION')}</>,
      icon: null,
      okText: t('button:ACTIVATE'),
      cancelText: t('button:CANCEL'),
      onOk: () => {
        dispatch(Creators.activateSupplierRequest({ id: supplier._id }));
      },
      centered: true,
    };
    modal.confirm(modalConfig);
  };

  const inactivateSupplier = () => {
    const modalConfig = {
      content: <>{t('CONFIRM_INACTIVATION')}</>,
      icon: null,
      okText: t('button:INACTIVATE'),
      cancelText: t('button:CANCEL'),
      onOk: () => {
        dispatch(Creators.deactivateSupplierRequest({ id: supplier._id }));
      },
      centered: true,
    };
    modal.confirm(modalConfig);
  };

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('global:PAGE_TITLE.SUPPLIER.DETAIL')}
          />
        </Col>
        <Col className={classes.flexboxCenter}>
          {supplier.isDeleted ? (
            <Tag color="red">{t('global:DELETED')}</Tag>
          ) : (
            <Switch
              disabled={
                !hasPermissionToChangeSupplierActiveness ||
                !isAllowedToOperate(selectedCountry)
              }
              checked={isActive}
              onChange={value => {
                if (value) {
                  activateSupplier();
                }
                else {
                  inactivateSupplier();
                }
              }}
              checkedChildren={t('global:ACTIVE')}
              unCheckedChildren={t('global:INACTIVE')}
              className={isActive ? 'bg-success' : 'bg-danger'}
            />
          )}
        </Col>
      </Row>
      {confirmationModalContext}
    </>
  );
};

export default Header;
