import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { get, sortBy } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Tooltip, Card } from 'antd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { useTheme } from 'react-jss';

import arrayMove from '@shared/utils/arrayMove';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { getSubCategoryPositionsSelector, updateSubCategoryOrderBulkSelector } from '../../redux/selectors';
import Spinner from '@shared/components/Spinner';
import { ROUTE } from '@app/routes';
import AntCard from '@shared/components/UI/AntCard';
import { createMap, getDiffObj } from '@shared/utils/common';

const getFormattedSubCategoryPositions = subCategoryPositions => {
  let newCategoryPositions = (subCategoryPositions || [])
    .filter(subCategoryPosition => {
      const subCategoryId = get(subCategoryPosition, 'subCategory._id', '');
      return !!subCategoryId;
    });
  newCategoryPositions = sortBy(newCategoryPositions, 'subCategory.order');
  const lastArrItems = [];

  newCategoryPositions = newCategoryPositions.filter(item => {
    if (item && item.category && item.category.order <= 0) {
      lastArrItems.push(item);
      return false;
    }
    return item;
  });
  return [...newCategoryPositions, ...lastArrItems];
};

const SubCategorySort = () => {
  const dispatch = useDispatch();
  const data = useSelector(getSubCategoryPositionsSelector.getData);
  const isPending = useSelector(getSubCategoryPositionsSelector.getIsPending);
  const isUpdatePending = useSelector(updateSubCategoryOrderBulkSelector.getIsPending);
  const classes = useStyles();
  const { t } = useTranslation('marketProductCategoryPage');
  const subCategoryPositionsData = getFormattedSubCategoryPositions(data);
  const [subCategoryPositions, setSubCategoryPositions] = useState(subCategoryPositionsData);
  const [changedSubCategoryPositions, setChangedSubCategoryPositions] = useState([]);
  const [isSortable, setIsSortable] = useState(false);
  const { categoryId } = useParams();
  const theme = useTheme();

  useEffect(() => {
    dispatch(Creators.getSubCategoryPositionsRequest({ categoryId }));
  }, [categoryId, dispatch]);

  useEffect(() => {
    setSubCategoryPositions(getFormattedSubCategoryPositions(data));
    setChangedSubCategoryPositions([]);
  }, [data]);

  const handleSave = () => {
    const body = subCategoryPositions.map((item, index) => {
      return {
        position: index + 1,
        subCategory: item?.subCategory?._id,
      };
    });
    dispatch(Creators.updateSubCategoryOrderBulkRequest({ categoryId, body }));
    setIsSortable(false);
  };

  const onSortEnd = result => {
    const { oldIndex, newIndex } = result;
    const reorderedSubCategories = arrayMove(subCategoryPositions, oldIndex, newIndex);
    const { newValues: _changedCategoryPositionsObject } = getDiffObj(subCategoryPositionsData, reorderedSubCategories);
    const _changedCategoryPositions = Object.entries(_changedCategoryPositionsObject).map(([key, value]) => {
      return {
        ...value,
        position: Number(key),
        subCategory: { ...value.subCategory },
      };
    });

    setSubCategoryPositions(reorderedSubCategories.slice());
    setChangedSubCategoryPositions(_changedCategoryPositions);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isSortable ? (
        <>
          <Col>
            <Button
              size="small"
              onClick={() => {
                setSubCategoryPositions(getFormattedSubCategoryPositions(data));
                setChangedSubCategoryPositions([]);
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
              disabled={!changedSubCategoryPositions?.length}
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

  const SortableItem = SortableElement(({ item, index }) => {
    const changedSubCategoriesMap = createMap(changedSubCategoryPositions, { field: 'subCategory._id' });
    let hasBorder = false;
    const subCategoryId = get(item, 'subCategory._id');
    if (get(changedSubCategoriesMap, [subCategoryId])) {
      hasBorder = true;
    }
    const subCategoryName = get(item, ['subCategory', 'name', getLangKey()], '');
    return (
      <Col className={classes.sortableItem} key={toString(index)} span={24}>
        <Card className={['mb-2', 'mr-2', hasBorder ? classes.cardBorder : '']}>
          <Row align="middle">
            <Col flex={1}>
              {subCategoryName}
            </Col>
            <Col>
              <Tooltip title={t('CATEGORY_SORT.BUTTON.CATEGORY_DETAIL')}>
                <Link to={ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path.replace(':id', subCategoryId)}>
                  <Button type="primary" size="small">
                    {t('CATEGORY_SORT.BUTTON.CATEGORY_DETAIL_SHORT')}
                  </Button>
                </Link>
              </Tooltip>
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
          const subCategoryId = get(item, 'subCategory._id', '');
          return (
            <SortableItem
              key={subCategoryId}
              index={index}
              item={item}
            />
          );
        })}
      </Row>
    );
  });

  return (
    <div>
      {isPending ? (
        <Spinner />
      ) : (
        <Row>
          <Col span={24}>
            <AntCard footer={cardFooter} bordered={false} title={t('CATEGORY_SORT.TITLE')}>
              <Col span={16}>
                <div className={classes.listHeader}>
                  {get(data, `0.category.name.${getLangKey()}`)}
                </div>
                <SortableList
                  items={subCategoryPositions}
                  onSortEnd={onSortEnd}
                  axis="y"
                  useDragHandle={!isSortable}
                />
              </Col>
            </AntCard>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default SubCategorySort;
