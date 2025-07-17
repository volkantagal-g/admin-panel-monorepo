import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, Row, Col, Card, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import arrayMove from '@shared/utils/arrayMove';
import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { createMap, getDiffObj } from '@shared/utils/common';
import Image from '@shared/components/UI/Image';
import { ROUTE } from '@app/routes';
import AntCard from '@shared/components/UI/AntCard';
import {
  getRecipeOrdersSelector,
  toggleRecipeActivenessSwitchSelector,
  updateRecipeOrderBulkSelector,
} from '../../redux/selectors';
import { getLangKey } from '@shared/i18n';
import useQuery from '@shared/shared/hooks/useQuery';

const RecipeSort = ({ domainType }) => {
  const dispatch = useDispatch();

  const query = useQuery();
  const countryCode = query.get('country');

  const getRecipeOrdersData = useSelector(getRecipeOrdersSelector.getData);
  const getRecipeOrdersIsPending = useSelector(getRecipeOrdersSelector.getIsPending);
  const [recipeOrders, setRecipeOrders] = useState(getRecipeOrdersData);
  const isUpdatePending = useSelector(updateRecipeOrderBulkSelector.getIsPending);
  const showInactives = useSelector(toggleRecipeActivenessSwitchSelector.getData);

  const classes = useStyles();
  const [changedRecipeOrders, setChangedRecipeOrders] = useState([]);
  const [isSortable, setIsSortable] = useState(false);
  const { t } = useTranslation('recipesPage');
  const theme = useTheme();

  useEffect(() => {
    setRecipeOrders(getRecipeOrdersData);
    setChangedRecipeOrders([]);
  }, [getRecipeOrdersData]);

  const handleSave = () => {
    const body = recipeOrders.map((item, index) => {
      return {
        order: index + 1,
        recipe: _.get(item, '_id'),
      };
    });
    dispatch(Creators.updateRecipeOrderBulkRequest({ body, domainType, showInactives, countryCode: countryCode ? countryCode.toUpperCase() : undefined }));
    setIsSortable(false);
  };

  const onSortEnd = result => {
    const { oldIndex, newIndex } = result;
    const reorderedRecipes = arrayMove(recipeOrders, oldIndex, newIndex);
    const { newValues: _changedRecipeOrdersObject } = getDiffObj(getRecipeOrdersData, reorderedRecipes);
    const _changedRecipeOrders = Object.entries(_changedRecipeOrdersObject).map(([key, value]) => {
      return {
        ...value,
        recipe: {
          ...value._id,
          order: Number(key) + 1,
        },
      };
    });

    setRecipeOrders(reorderedRecipes.slice());
    setChangedRecipeOrders(_changedRecipeOrders);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isSortable ? (
        <>
          <Col>
            <Button
              size="small"
              onClick={() => {
                setRecipeOrders(getRecipeOrdersData);
                setChangedRecipeOrders([]);
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
              disabled={!changedRecipeOrders?.length}
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
    const recipeStatus = _.get(item, 'status', false);
    const changedRecipesMap = createMap(changedRecipeOrders, { field: '_id' });

    let hasBorder = false;
    const recipeId = _.get(item, '_id');
    if (_.get(changedRecipesMap, [recipeId])) {
      hasBorder = true;
    }

    return (
      <Col data-testid="sortable-item" sm={16} md={12} lg={8} style={{ opacity: recipeStatus === 1 ? 1 : 0.5 }}>
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
                <Tooltip title={t('SORT.BUTTON.RECIPE_DETAIL')}>
                  <Button
                    type="primary"
                    size="small"
                    className={classes.button}
                    onClick={() => {
                      const path = ROUTE.MARKET_PRODUCT_RECIPES_DETAIL.path.replace(':id', recipeId);
                      window.open(path, '_blank');
                    }}
                  >
                    {t('SORT.BUTTON.RECIPE_DETAIL_SHORT')}
                  </Button>
                </Tooltip>
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
          const recipeId = _.get(item, '_id', '');
          return (
            <SortableItem
              key={recipeId}
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
      <AntCard footer={cardFooter} bordered={false} title={t('SORT.TITLE')} loading={getRecipeOrdersIsPending}>
        <Col xs={24} xl={21} xxl={18}>
          <SortableList
            items={recipeOrders}
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

export default RecipeSort;
