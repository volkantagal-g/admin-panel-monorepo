import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, Row, Col, Card, Tooltip, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';

import arrayMove from '@shared/utils/arrayMove';
import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { createMap, getDiffObj } from '@shared/utils/common';
import Image from '@shared/components/UI/Image';
import { ROUTE } from '@app/routes';
import AntCard from '@shared/components/UI/AntCard';
import {
  getCategoryOrdersSelector,
  updateCategoryOrderBulkSelector,
} from '../../redux/selectors';
import { getLangKey } from '@shared/i18n';

const CategorySort = ({ domainType }) => {
  const dispatch = useDispatch();
  const getCategoryOrdersData = useSelector(getCategoryOrdersSelector.getData);
  const getCategoryOrdersIsPending = useSelector(getCategoryOrdersSelector.getIsPending);
  const [categoryOrders, setCategoryOrders] = useState(getCategoryOrdersData);
  const isUpdatePending = useSelector(updateCategoryOrderBulkSelector.getIsPending);

  const classes = useStyles();
  const [changedCategoryOrders, setChangedCategoryOrders] = useState([]);
  const [isSortable, setIsSortable] = useState(false);
  const { t } = useTranslation('marketProductCategoryPage');
  const theme = useTheme();

  useEffect(() => {
    setCategoryOrders(getCategoryOrdersData);
    setChangedCategoryOrders([]);
  }, [getCategoryOrdersData]);

  const handleSave = () => {
    const body = categoryOrders.map((item, index) => {
      return {
        order: index + 1,
        category: _.get(item, '_id'),
      };
    });
    dispatch(Creators.updateCategoryOrderBulkRequest({ body, domainType }));
    setIsSortable(false);
  };

  const onSortEnd = result => {
    const { oldIndex, newIndex } = result;
    const reorderedCategories = arrayMove(categoryOrders, oldIndex, newIndex);
    const { newValues: _changedCategoryOrdersObject } = getDiffObj(getCategoryOrdersData, reorderedCategories);
    const _changedCategoryOrders = Object.entries(_changedCategoryOrdersObject).map(([key, value]) => {
      return {
        ...value,
        category: {
          ...value.category,
          order: Number(key) + 1,
        },
      };
    });

    setCategoryOrders(reorderedCategories.slice());
    setChangedCategoryOrders(_changedCategoryOrders);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isSortable ? (
        <>
          <Col>
            <Button
              size="small"
              onClick={() => {
                setCategoryOrders(getCategoryOrdersData);
                setChangedCategoryOrders([]);
                setIsSortable(false);
              }}
            >
              {t('button:CANCEL')}
            </Button>
          </Col>
          <Col>
            <Button
              size="small"
              type="primary"
              loading={isUpdatePending}
              onClick={handleSave}
              disabled={!changedCategoryOrders?.length}
            >
              {t('button:SAVE')}
            </Button>
          </Col>
        </>
      ) : (
        <Col>
          <Button
            size="small"
            onClick={() => {
              setIsSortable(true);
            }}
          >
            {t('button:EDIT')}
          </Button>
        </Col>
      )}
    </Row>
  );

  const SortableItem = SortableElement(({ item }) => {
    const categoryStatus = _.get(item, 'status', false);
    const changedCategoriesMap = createMap(changedCategoryOrders, { field: '_id' });

    let hasBorder = false;
    const categoryId = _.get(item, '_id');
    if (_.get(changedCategoriesMap, [categoryId])) {
      hasBorder = true;
    }

    return (
      <Col data-testid="sortable-item" sm={16} md={12} lg={8} style={{ opacity: categoryStatus === 1 ? 1 : 0.5 }}>
        <Card
          hoverable={isSortable}
          className={['mb-2', 'mr-2', hasBorder ? classes.cardBorder : '']}
        >
          <Row gutter={theme.spacing(3)}>
            <Col span={12} className="d-flex align-items justify-content-center">
              <Image src={_.get(item, ['picURL', getLangKey()])} height="150px" alt="image" />
            </Col>
            <Col span={12}>
              <div className={classes.title}>
                {_.get(item, ['name', getLangKey()], '')}
              </div>

              <Row gutter={theme.spacing(2)} align="end" className={classes.buttonSpace}>
                <Popconfirm
                  title={t('CONFIRM_TEXT')}
                  onConfirm={() => {
                    window.location.href = ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path.replace(':id', categoryId);
                  }}
                >
                  <Tooltip title={t('CATEGORY_SORT.BUTTON.CATEGORY_DETAIL')}>
                    <Link to={ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path.replace(':id', categoryId)}>
                      <Button
                        type="primary"
                        size="small"
                        className={classes.button}
                      >
                        {t('CATEGORY_SORT.BUTTON.CATEGORY_DETAIL_SHORT')}
                      </Button>
                    </Link>
                  </Tooltip>
                </Popconfirm>
                <Popconfirm
                  title={t('CONFIRM_TEXT')}
                  onConfirm={() => {
                    window.location.href = ROUTE.MARKET_PRODUCT_SUB_CATEGORY_SORT.path.replace(':categoryId', categoryId);
                  }}
                >
                  <Tooltip title={t('CATEGORY_SORT.BUTTON.SUB_CATEGORY_SORTING')}>
                    <Link to={ROUTE.MARKET_PRODUCT_SUB_CATEGORY_SORT.path.replace(':categoryId', categoryId)}>
                      <Button
                        type="primary"
                        size="small"
                        className={classes.button}
                      >
                        {t('CATEGORY_SORT.BUTTON.SUB_CATEGORY_SORTING_SHORT')}
                      </Button>
                    </Link>
                  </Tooltip>
                </Popconfirm>
                <Popconfirm
                  title={t('CONFIRM_TEXT')}
                  onConfirm={() => {
                    window.location.href = ROUTE.MARKET_PRODUCT_SORT.path.replace(':subCategoryId', categoryId);
                  }}
                >
                  <Tooltip title={t('CATEGORY_SORT.BUTTON.PRODUCT_SORTING')}>
                    <Link to={ROUTE.MARKET_PRODUCT_SORT.path.replace(':subCategoryId', categoryId)}>
                      <Button
                        type="primary"
                        size="small"
                        className={classes.button}
                      >
                        {t('CATEGORY_SORT.BUTTON.PRODUCT_SORTING_SHORT')}
                      </Button>
                    </Link>
                  </Tooltip>
                </Popconfirm>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    );
  });

  const SortableList = SortableContainer(({ items = [] }) => {
    return (
      <Row>
        {items.map((item, index) => {
          const categoryId = _.get(item, '_id', '');
          return (
            <SortableItem
              key={categoryId}
              index={index}
              item={item}
            />
          );
        })}
      </Row>
    );
  });

  return (
    <Row>
      <AntCard footer={cardFooter} bordered={false} title={t('CATEGORY_SORT.TITLE')} loading={getCategoryOrdersIsPending}>
        <Col xs={24} xl={21} xxl={18}>
          <SortableList
            items={categoryOrders}
            onSortEnd={onSortEnd}
            axis="xy"
            useDragHandle={!isSortable}
            helperClass={classes.sortableHelper}
          />
        </Col>
      </AntCard>
    </Row>
  );
};

export default CategorySort;
