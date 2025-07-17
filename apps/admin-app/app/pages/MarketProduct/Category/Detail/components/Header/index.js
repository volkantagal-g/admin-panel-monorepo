import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Row, Col, Modal, Switch, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Creators } from '../../redux/actions';
import { getMarketProductCategoryByIdSelector, getMarketProductCategorySlugsSelector } from '../../redux/selectors';
import { GETIR_DOMAIN_TYPES, MARKET_PRODUCT_CATEGORY_STATUS } from '@shared/shared/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { usePrevious } from '@shared/hooks';

import JsonModal from '@shared/components/UI/JsonModal';

const Header = () => {
  const dispatch = useDispatch();
  const marketProductCategory = useSelector(getMarketProductCategoryByIdSelector.getData) || {};
  const [modal, confirmationModalContext] = Modal.useModal();
  const [isActive, setIsActive] = useState();
  const [isCategorySlugsModalVisible, setIsCategorySlugsModalVisible] = useState(false);
  const { t } = useTranslation('marketProductCategoryPage');
  const categorySlugs = useSelector(getMarketProductCategorySlugsSelector.getData);
  const isGetSlugsPending = useSelector(getMarketProductCategorySlugsSelector.getIsPending);
  const prevIsGetSlugsPending = usePrevious(isGetSlugsPending);

  useEffect(() => {
    const _isActive = MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE === marketProductCategory.status;
    setIsActive(_isActive);
  }, [marketProductCategory.status]);

  useEffect(() => {
    if (prevIsGetSlugsPending && !isGetSlugsPending) {
      if (_.isEmpty(categorySlugs)) {
        dispatch(ToastCreators.error({ message: t('global:SLUG_NOT_FOUND_ERROR') }));
      }
      else {
        setIsCategorySlugsModalVisible(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlugs]);

  const activateCategory = () => {
    const domainTypes = marketProductCategory?.domainTypes || [];

    let requiredImagesFilled = false;

    const hasValidPic = (pic, key) => pic[key] &&
      typeof pic[key] === 'object' &&
      'tr' in pic[key] &&
      'en' in pic[key];

    if (domainTypes.includes(GETIR_DOMAIN_TYPES.GETIR10) && domainTypes.includes(GETIR_DOMAIN_TYPES.MARKET)) {
      requiredImagesFilled = marketProductCategory?.picURLs?.some(pic => (pic.domainType === GETIR_DOMAIN_TYPES.GETIR10 && hasValidPic(pic, 'squarePicURL'))) &&
        marketProductCategory?.picURLs?.some(pic => (pic.domainType === GETIR_DOMAIN_TYPES.MARKET
          && hasValidPic(pic, 'squarePicURL') && hasValidPic(pic, 'widePicURL')));
    }
    else if (domainTypes.includes(GETIR_DOMAIN_TYPES.GETIR10)) {
      requiredImagesFilled = marketProductCategory?.picURLs?.some(pic => pic.domainType === GETIR_DOMAIN_TYPES.GETIR10 && hasValidPic(pic, 'squarePicURL'));
    }
    else if (domainTypes.includes(GETIR_DOMAIN_TYPES.MARKET)) {
      requiredImagesFilled = marketProductCategory?.picURLs?.some(pic => pic.domainType === GETIR_DOMAIN_TYPES.MARKET
        && hasValidPic(pic, 'squarePicURL') && hasValidPic(pic, 'widePicURL'));
    }

    if (!requiredImagesFilled && !marketProductCategory.isSubCategory) {
      dispatch(ToastCreators.error({ message: t('IMAGE_INFO.ACTIVE_WARNING') }));
      return;
    }

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
        dispatch(Creators.activateMarketProductCategoryRequest({ id: marketProductCategory._id }));
      },
      centered: true,
    };
    modal.confirm(modalConfig);
  };

  const handleShowSlugsClick = () => {
    dispatch(Creators.getMarketProductCategorySlugsRequest({ id: marketProductCategory._id }));
  };

  const handleCategorySlugsModalCancel = () => {
    setIsCategorySlugsModalVisible(false);
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
        dispatch(Creators.deactivateMarketProductCategoryRequest({ id: marketProductCategory._id }));
      },
      centered: true,
    };
    modal.confirm(modalConfig);
  };

  return (
    <>
      <JsonModal
        title={t('CATEGORY_SLUGS_TITLE')}
        data={categorySlugs}
        visible={isCategorySlugsModalVisible}
        handleCancel={handleCategorySlugsModalCancel}
      />
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('global:PAGE_TITLE.MARKET_PRODUCT_CATEGORY.DETAIL')}
          />
        </Col>
        <Col>
          {marketProductCategory._id && (
          <Button
            onClick={handleShowSlugsClick}
            className="mr-2"
          >
            {t('SHOW_SLUGS')}
          </Button>
          )}
          <Switch
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
