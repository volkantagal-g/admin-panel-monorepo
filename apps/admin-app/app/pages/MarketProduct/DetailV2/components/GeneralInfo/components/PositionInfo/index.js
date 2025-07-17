import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTheme } from 'react-jss';
import { get } from 'lodash';

import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { PRODUCT_DETAIL_COMPONENT_ID, PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import { Space, Button } from '@shared/components/GUI';
import { NewPositionModal } from './NewPositionModal';
import PositionList from './PositionList';
import edit from '@shared/assets/GUI/Icons/Solid/Edit.svg';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';

const PositionInfo = () => {
  const dispatch = useDispatch();
  const positions = useSelector(getMarketProductByIdSelector.getPositions);
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const [isNewPositionModalVisible, setIsNewPositionModal] = useState(false);
  const { t } = useTranslation('marketProductPageV2');
  const theme = useTheme();
  const [modal, confirmationModalContext] = Modal.useModal();
  const [isTableEditable, setIsTableEditable] = useState(false);
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.POSITION_INFO.containerId });

  const handleAddPositionClick = () => {
    setIsNewPositionModal(true);
  };

  const handleNewPositionModalCancel = () => {
    setIsNewPositionModal(false);
  };

  const positionsMap = {};
  positions.forEach(position => {
    const id = get(position, 'subCategory._id');
    positionsMap[id] = position;
  });

  const isMainCategoryFunc = item => {
    const subCategoryId = get(item, 'subCategory._id');
    const mainCategoryId = get(positionsMap, [
      get(marketProduct, 'subCategory._id'),
      'subCategory',
      '_id',
    ]);
    return mainCategoryId === subCategoryId;
  };

  const addCategoryPosition = (categoryId, subCategoryId, enteredPosition) => {
    const modalMessage = enteredPosition ?
      t('POSITION_INFO.CONFIRM_ADD_PRODUCT_POSITION') :
      t('POSITION_INFO.CONFIRM_ADD_PRODUCT_POSITION_LAST');
    const config = {
      content: (
        <span>
          {modalMessage}
        </span>
      ),
      icon: null,
      onOk: () => {
        dispatch(Creators.addMarketCategoryPositionRequest({
          id: marketProduct._id,
          categoryId,
          subCategoryId,
          enteredPosition,
        }));
      },
      okText: t('button:YES'),
      cancelText: t('button:NO'),
      centered: true,
    };
    modal.confirm(config);
  };

  const deleteCategoryPosition = (categoryId, subCategoryId) => {
    const config = {
      content: (
        <span>
          {t('POSITION_INFO.CONFIRM_PRODUCT_POSITION_REMOVE')}
        </span>
      ),
      icon: null,
      onOk: () => {
        dispatch(Creators.deleteMarketCategoryPositionRequest({
          id: marketProduct._id,
          categoryId,
          subCategoryId,
        }));
      },
      okText: t('button:YES'),
      cancelText: t('button:NO'),
      centered: true,
    };
    modal.confirm(config);
  };

  const makeMainCategory = (categoryId, subCategoryId) => {
    const config = {
      content: (
        <span>
          {t('POSITION_INFO.CONFIRM_MAIN_CATEGORY')}
        </span>
      ),
      icon: null,
      onOk: () => {
        const body = {
          id: marketProduct._id,
          category: categoryId,
          subCategory: subCategoryId,
        };

        dispatch(Creators.updateMainCategoryRequest({
          id: marketProduct._id,
          body,
        }));
      },
      okText: t('button:YES'),
      cancelText: t('button:NO'),
      centered: true,
    };
    modal.confirm(config);
  };

  return (
    <>
      <Space
        id={PRODUCT_DETAIL_COMPONENT_ID.POSITION_INFO}
        title={t('POSITION_INFO.TITLE')}
        errorBadgeProps={{
          title: t('PRODUCT_ACTIVATION_ERRORS'),
          errors: activationErrors,
        }}
      >
        <Row key="row-1">
          <Col span={24}>
            <PositionList
              isMainCategoryFunc={isMainCategoryFunc}
              makeMainCategory={makeMainCategory}
              deleteCategoryPosition={deleteCategoryPosition}
              isTableEditable={isTableEditable}
            />
          </Col>
        </Row>
        <Row
          justify="end"
          align="middle"
          gutter={[theme.spacing(2)]}
        >
          {isTableEditable ? (
            <>
              <Col>
                <Button
                  size="small"
                  onClick={handleAddPositionClick}
                  icon={<PlusOutlined />}
                  color="secondary"
                >
                  {t('POSITION_INFO.NEW_POSITION')}
                </Button>
              </Col>
              <Col>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => setIsTableEditable(false)}
                >{t('global:CANCEL')}
                </Button>
              </Col>
            </>
          )
            : (
              <Col>
                <Button
                  size="small"
                  icon={(<img src={edit} alt="edit-icon" />)}
                  onClick={() => setIsTableEditable(true)}
                >{t('global:EDIT')}
                </Button>
              </Col>
            )}
        </Row>
      </Space>
      {confirmationModalContext}
      {isNewPositionModalVisible && (
        <NewPositionModal
          addCategoryPosition={addCategoryPosition}
          onCancel={handleNewPositionModalCancel}
          isMainCategoryFunc={isMainCategoryFunc}
          isTableEditable={isTableEditable}
        />
      )}
    </>
  );
};

export default PositionInfo;
