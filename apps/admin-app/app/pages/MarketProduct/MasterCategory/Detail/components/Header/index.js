import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Row, Col, Modal, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { getMarketProductMasterCategorySelector, updateMarketProductMasterCategorySelector } from '../../redux/selectors';
import { MARKET_PRODUCT_MASTER_CATEGORY_STATUS } from '@shared/shared/constants';

const Header = () => {
  const dispatch = useDispatch();
  const masterCategory = useSelector(getMarketProductMasterCategorySelector.getData);
  const isUpdatePending = useSelector(updateMarketProductMasterCategorySelector.getIsPending);
  const [modal, confirmationModalContext] = Modal.useModal();
  const [isActive, setIsActive] = useState();
  const { t } = useTranslation('marketProductMasterCategoryPage');

  useEffect(() => {
    const _isActive = MARKET_PRODUCT_MASTER_CATEGORY_STATUS.ACTIVE === masterCategory.status;
    setIsActive(_isActive);
  }, [masterCategory.status]);

  const activateCategory = () => {
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
        const body = { status: MARKET_PRODUCT_MASTER_CATEGORY_STATUS.ACTIVE };
        dispatch(Creators.updateMarketProductMasterCategoryRequest({ id: masterCategory._id, body }));
      },
      centered: true,
    };
    modal.confirm(modalConfig);
  };

  const inactivateCategory = () => {
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
        const body = { status: MARKET_PRODUCT_MASTER_CATEGORY_STATUS.INACTIVE };
        dispatch(Creators.updateMarketProductMasterCategoryRequest({ id: masterCategory._id, body }));
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
            title={t('global:PAGE_TITLE.MARKET_PRODUCT_MASTER_CATEGORY.DETAIL')}
          />
        </Col>
        <Col>
          <Switch
            loading={isUpdatePending}
            checked={isActive}
            onChange={value => {
              if (value) {
                activateCategory();
              }
              else {
                inactivateCategory();
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
