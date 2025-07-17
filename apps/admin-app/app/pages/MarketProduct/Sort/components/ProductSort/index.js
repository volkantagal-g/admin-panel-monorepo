import { useEffect, useState, useMemo } from 'react';
import { Button, Col, Row, Divider, Tooltip } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get, inRange, cloneDeep, isEmpty } from 'lodash';

import arrayMove from '@shared/utils/arrayMove';
import useStyles from './styles';
import { Creators } from '../../redux/actions';
import {
  getProductPositionsByCategorySelector,
  updateProductPositionsBulkSelector,
  toggleCategoryActivenessSwitchSelector,
} from '../../redux/selectors';
import { getLangKey } from '@shared/i18n';
import AntCard from '@shared/components/UI/AntCard';
import { PRODUCT_DISPLAY_TYPE } from '@shared/shared/constants';
import SortableList from '@app/pages/MarketProduct/Sort/components/ProductSort/SortableList';
import { ROUTE } from '@app/routes';
import {
  getFormattedProductPositions,
  getFormattedItemsBeforeSave,
  getChangedProductPositions,
  checkInactiveProductPositionChange,
} from '@app/pages/MarketProduct/Sort/components/ProductSort/utils';
import { getDiffObj } from '@shared/utils/common';
import { usePrevious } from '@shared/hooks';
import StickyWrapper from '@shared/components/UI/StickyWrapper';
import CategoryChangeModal from '@app/pages/MarketProduct/Sort/components/ProductSort/CategoryChangeModal';
import ScrollTo from '@shared/components/UI/ScrollTo';

const ProductSort = () => {
  const dispatch = useDispatch();
  const data = useSelector(getProductPositionsByCategorySelector.getData);
  const isGetPending = useSelector(getProductPositionsByCategorySelector.getIsPending);
  const isUpdatePending = useSelector(updateProductPositionsBulkSelector.getIsPending);
  const areInactivesShowing = useSelector(toggleCategoryActivenessSwitchSelector.getData);
  const prevIsGetPending = usePrevious(isGetPending);

  const classes = useStyles();
  const { t } = useTranslation('marketProductPage');
  const { subCategoryId } = useParams();

  const productPositionsBackup = useMemo(
    () => getFormattedProductPositions(data, areInactivesShowing),
    // NOTE: areInactivesShowing dependency is not added purposely.
    // TODO: This part needs refactor to solve the eslint. TASK: https://getirdev.atlassian.net/browse/PM-182
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [data],
  );

  const [productPositions, setProductPositions] = useState([]);
  const [isSortable, setIsSortable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [topAndBottomOffsetsOfContainer, setTopAndBottomOffsetsOfContainer] = useState([0, 0]);
  const [draggableProductDetails, setDraggableProductDetails] = useState({
    productName: '',
    productLink: '',
  });
  const [categoryChangeModalVisible, setCategoryChangeModalVisible] = useState(false);
  const [isInactiveProductPositionUpdated, setIsInactiveProductPositionUpdated] = useState(false);
  const theme = useTheme();

  const changedProductPositions = useMemo(() => getChangedProductPositions(productPositions), [productPositions]);

  useEffect(() => {
    dispatch(Creators.getProductPositionsByCategoryRequest({ id: subCategoryId }));
  }, [dispatch, subCategoryId]);

  useEffect(() => {
    setProductPositions(getFormattedProductPositions(productPositions, areInactivesShowing));
    // TODO: This part needs refactor to solve the eslint. TASK: https://getirdev.atlassian.net/browse/PM-182
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [areInactivesShowing]);

  useEffect(() => {
    setProductPositions(cloneDeep(productPositionsBackup));
  }, [productPositionsBackup]);

  useEffect(() => {
    if (checkInactiveProductPositionChange(productPositions)) {
      setIsInactiveProductPositionUpdated(true);
    }
    else {
      setIsInactiveProductPositionUpdated(false);
    }
  }, [productPositions]);

  useEffect(() => {
    if (isUpdatePending) {
      setIsSortable(false);
    }
    if (prevIsGetPending && !isGetPending) {
      setIsEditable(false);
    }
  }, [prevIsGetPending, isUpdatePending, isGetPending]);

  const handleSave = () => {
    setIsInactiveProductPositionUpdated(false);
    const body = changedProductPositions.map(item => {
      const items = getFormattedItemsBeforeSave(item.items);
      return {
        category: get(item, 'category._id'),
        items,
        subCategory: get(item, 'subCategory._id'),
        version: item.version,
      };
    });
    dispatch(Creators.updateProductPositionsBulkRequest({
      id: subCategoryId,
      body,
    }));
  };

  const categoryName = get(productPositions, `0.category.name.${getLangKey()}`);

  const handleSubCategoryTagClick = subCatId => {
    const subCategoryElementId = `subCategory-${subCatId}`;
    const element = document.getElementById(subCategoryElementId);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  const onSortEnd = (result, currentProductPositionId, productDisplayType, squareProducts, wideProducts) => {
    const {
      oldIndex,
      newIndex,
    } = result;

    const filterByProductDisplay = productItem => {
      return productItem.item && productItem.item.displayType === productDisplayType;
    };

    const sortByProductPosition = (a, b) => {
      return a?.position < b?.position ? -1 : 1;
    };

    const originalProductPosition = productPositionsBackup.find(item => item._id === currentProductPositionId);
    const currentProductPosition = productPositions.find(item => item._id === currentProductPositionId);

    if (!get(currentProductPosition, 'items')) {
      return null;
    }

    const originalProductPositionItems = originalProductPosition.items.sort(sortByProductPosition).filter(filterByProductDisplay);
    const currentProductPositionItems = currentProductPosition.items.sort(sortByProductPosition).filter(filterByProductDisplay);

    const reorderedItems = arrayMove(currentProductPositionItems, oldIndex, newIndex);

    const { newValues: diffObject } = getDiffObj(originalProductPositionItems, reorderedItems);
    const changedItemIds = Object.entries(diffObject).map(([, item]) => get(item, 'item._id'));

    let borderedReorderedItems = reorderedItems.map((item, index) => {
      const id = get(item, 'item._id');
      let hasBorder = false;
      if (changedItemIds.includes(id)) {
        hasBorder = true;
      }
      return {
        ...item,
        hasBorder,
        position: index,
      };
    });

    borderedReorderedItems = [...wideProducts, ...squareProducts, ...borderedReorderedItems];

    const newProductPositions = productPositions.map(item => {
      if (item._id === currentProductPosition._id) {
        return {
          ...currentProductPosition,
          items: borderedReorderedItems,
        };
      }
      return item;
    });

    setProductPositions(newProductPositions);
    return null;
  };

  const handleCancel = () => {
    if (areInactivesShowing) {
      setProductPositions(getFormattedProductPositions(productPositionsBackup, areInactivesShowing));
    }
    else {
      setProductPositions(productPositionsBackup);
    }
    setIsSortable(false);
    setIsEditable(false);
    setIsInactiveProductPositionUpdated(false);
  };

  const handleDragItem = element => {
    const productName = element.ariaValueText;
    const productLink = element.ariaPlaceholder;
    const nodeID = element.ariaLabel;
    const node = document.getElementById(nodeID);
    const offsetTop = (node?.getBoundingClientRect()?.top || 0) + window.scrollY;
    const offsetBottom = offsetTop + node.offsetHeight;

    setTopAndBottomOffsetsOfContainer([offsetTop, offsetBottom]);
    setDraggableProductDetails({
      productName,
      productLink,
    });
  };

  const handleDetectOutside = (event, result, productPositionID, productDisplayType, squareProductsArray, wideProductsArray) => {
    const topOffsetOfContainer = topAndBottomOffsetsOfContainer[0];
    const bottomOffsetOfContainer = topAndBottomOffsetsOfContainer[1];
    const isInRange = inRange(event.pageY, topOffsetOfContainer, bottomOffsetOfContainer);
    if (isInRange) {
      onSortEnd(result, productPositionID, productDisplayType, squareProductsArray, wideProductsArray);
    }
    else {
      setCategoryChangeModalVisible(true);
    }
  };

  const cardFooter = (
    <div id="edit-footer">
      <StickyWrapper targetItemID="edit-footer">
        {isEditable ? (
          <Tooltip
            placement="top"
            visible={isInactiveProductPositionUpdated}
            color={theme.color.status.warning}
            title={t('PRODUCT_SORT.PRODUCT_SORTING_INACTIVE_CHANGE_WARNING')}
            getPopupContainer={triggerNode => triggerNode.parentNode}
          >
            <Row justify="end" gutter={[theme.spacing(2)]}>
              <Col>
                <Button
                  size="small"
                  onClick={handleCancel}
                >
                  {t('button:CANCEL')}
                </Button>
              </Col>
              <Col>

                <Button
                  size="small"
                  type="primary"
                  loading={isGetPending || isUpdatePending}
                  onClick={handleSave}
                  disabled={!changedProductPositions?.length}
                >
                  {t('button:SAVE')}
                </Button>
              </Col>
            </Row>
          </Tooltip>
        ) : (
          <Col>
            <Button
              size="small"
              onClick={() => {
                setIsSortable(true);
                setIsEditable(true);
              }}
            >
              {t('button:EDIT')}
            </Button>
          </Col>
        )}
      </StickyWrapper>
    </div>
  );

  return (
    <>
      <Row>
        <Col span={24}>
          <AntCard
            footer={cardFooter}
            bordered={false}
            title={t('PRODUCT_SORT.TITLE')}
            loading={isGetPending && isEmpty(data)}
          >
            <Col xs={24} md={24} lg={24} xl={16} xxl={12}>
              <Row>
                <Col span={24}>
                  <div className={classes.productHeader}>
                    {categoryName}
                  </div>
                  <div className={classes.productSelection}>
                    {productPositions.filter(productPosition => {
                      return get(productPosition, 'subCategory');
                    })
                      .map(productPosition => {
                        const subCategoryName = get(productPosition, ['subCategory', 'name', getLangKey()], '');
                        const subCatId = get(productPosition, ['subCategory', '_id'], '');
                        const isSubCategoryVisible = get(productPosition, ['isSubCategoryVisible'], '');
                        const subCategoryStatus = get(productPosition, ['subCategory', 'status'], '');

                        if (subCategoryName && isSubCategoryVisible) {
                          return (
                            <Button
                              key={subCatId}
                              onClick={() => handleSubCategoryTagClick(subCatId)}
                              className={classes.productSelectionBox}
                              type="button"
                              style={{ opacity: subCategoryStatus === 0 ? 0.5 : 1 }}
                            >
                              {subCategoryName}
                            </Button>
                          );
                        }
                        return null;
                      })}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div>
                    {productPositions
                      .filter(productPosition => {
                        const subCategoryName = get(productPosition, ['subCategory', 'name', getLangKey()], '');
                        return !!subCategoryName;
                      })
                      .map(productPosition => {
                        if (!productPosition.isSubCategoryVisible) return null;

                        const subCategoryName = get(productPosition, ['subCategory', 'name', getLangKey()], '');
                        const wideProducts = productPosition.items
                          .filter(productItem => productItem.item && productItem.item.displayType === PRODUCT_DISPLAY_TYPE.WIDE)
                          .sort((a, b) => a.position - b.position);
                        const squareProducts = productPosition.items
                          .filter(productItem => productItem.item && productItem.item.displayType === PRODUCT_DISPLAY_TYPE.SQUARE)
                          .sort((a, b) => a.position - b.position);
                        const isSubCategoryVisible = get(productPosition, ['isSubCategoryVisible'], '');
                        const subCatId = get(productPosition, 'subCategory._id');

                        const subCategoryDetailPath = ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path.replace(':id', subCatId);
                        const subCategoryElementId = `subCategory-${subCatId}`;
                        return (
                          <div key={productPosition._id} id={subCategoryElementId}>
                            {isSubCategoryVisible && subCategoryName && (
                              <div className={`${classes.productSubTitle} mb-2 mt-2`}>
                                {subCategoryName}
                                <Link to={subCategoryDetailPath}>
                                  <Button className={classes.detailButton}>D</Button>
                                </Link>
                              </div>
                            )}
                            {!isEmpty(wideProducts) && (
                              <SortableList
                                useWindowAsScrollContainer
                                items={wideProducts}
                                onSortEnd={(result, event) => {
                                  handleDetectOutside(event, result, productPosition._id, PRODUCT_DISPLAY_TYPE.WIDE, squareProducts, []);
                                }}
                                updateBeforeSortStart={({ node }) => {
                                  handleDragItem(node);
                                }}
                                axis="y"
                                useDragHandle={!isSortable}
                                isSortable={isSortable}
                                areInactivesShowing={areInactivesShowing}
                                subCategoryElementId={subCategoryElementId}
                              />
                            )}
                            {!isEmpty(squareProducts) && (
                              <SortableList
                                useWindowAsScrollContainer
                                items={squareProducts}
                                onSortEnd={(result, event) => {
                                  handleDetectOutside(event, result, productPosition._id, PRODUCT_DISPLAY_TYPE.SQUARE, [], wideProducts);
                                }}
                                updateBeforeSortStart={({ node }) => {
                                  handleDragItem(node);
                                }}
                                axis="xy"
                                useDragHandle={!isSortable}
                                isSortable={isSortable}
                                areInactivesShowing={areInactivesShowing}
                                subCategoryElementId={subCategoryElementId}
                              />
                            )}
                            <Divider className="mt-2 mb-2" />
                          </div>
                        );
                      })}
                  </div>
                </Col>
              </Row>
            </Col>
          </AntCard>
        </Col>
      </Row>
      <CategoryChangeModal
        draggableProductDetails={draggableProductDetails}
        visible={categoryChangeModalVisible}
        onCancel={() => setCategoryChangeModalVisible(false)}
      />
      <ScrollTo borderDisappearTimeout={5000} />
    </>
  );
};

export default ProductSort;
