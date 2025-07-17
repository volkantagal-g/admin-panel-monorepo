import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Row, Col, Modal, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { getBrandSelector } from '../../redux/selectors';

const Header = () => {
  const dispatch = useDispatch();
  const brand = useSelector(getBrandSelector.getData);
  const [modal, confirmationModalContext] = Modal.useModal();
  const [isActive, setIsActive] = useState();
  const { t } = useTranslation('brandPage');

  useEffect(() => {
    setIsActive(brand.isActive);
  }, [brand.isActive]);

  const activateBrand = () => {
    const modalConfig = {
      content: (
        <>
          {t('CONFIRM_ACTIVATION')}
        </>
      ),
      icon: null,
      okText: t('button:ACTIVATE'),
      cancelText: t('button:CANCEL'),
      onOk: () => {
        dispatch(Creators.activateBrandRequest({ id: brand._id }));
      },
      centered: true,
    };
    modal.confirm(modalConfig);
  };

  const inactivateBrand = () => {
    const modalConfig = {
      content: (
        <>
          {t('CONFIRM_INACTIVATION')}
        </>
      ),
      icon: null,
      okText: t('button:INACTIVATE'),
      cancelText: t('button:CANCEL'),
      onOk: () => {
        dispatch(Creators.deactivateBrandRequest({ id: brand._id }));
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
            title={t('global:PAGE_TITLE.BRAND.DETAIL')}
          />
        </Col>
        <Col>
          <Switch
            checked={isActive}
            onChange={value => {
              if (value) {
                activateBrand();
              }
              else {
                inactivateBrand();
              }
            }}
            checkedChildren={t('global:ACTIVE')}
            unCheckedChildren={t('global:INACTIVE')}
            className={isActive ? 'bg-success' : 'bg-danger'}
          />
        </Col>
      </Row>
      {confirmationModalContext}
    </>
  );
};

export default Header;
