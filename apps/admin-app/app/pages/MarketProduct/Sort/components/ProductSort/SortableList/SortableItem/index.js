import { Button, Row, Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { SortableElement } from 'react-sortable-hoc';

import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import { ROUTE } from '@app/routes';
import ImageWithPopover from '@shared/components/UI/ImageWithPopover';
import { currency } from '@shared/utils/common';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';

const SortableItem = SortableElement(({
  item,
  areInactivesShowing,
  isSortable,
  subCategoryElementId,
}) => {
  const { t } = useTranslation('marketProductPage');
  const picURL = _.get(item, ['item', 'picURL', getLangKey()], '');
  const widePicURL = _.get(item, ['item', 'widePicURL', getLangKey()], '');
  const fullName = _.get(item, ['item', 'fullName', getLangKey()], '');
  const price = _.get(item, ['item', 'price'], '');
  const hasBorder = _.get(item, 'hasBorder', false);

  const isActive = _.get(item, 'item.status') === MARKET_PRODUCT_STATUS.ACTIVE;
  const classes = useStyles({ isActive });

  const TooltipWrapper = ({
    children,
    visible,
  }) => {
    if (visible) {
      return (
        <Tooltip title={t('PRODUCT_SORT.PRODUCT_SORTING_INACTIVE_WARNING')}>
          {children}
        </Tooltip>
      );
    }
    return children;
  };

  const productId = _.get(item, 'item._id');
  const path = ROUTE.MARKET_PRODUCT_DETAIL.path.replace(':id', productId);

  return (
    <Card
      key={item.item._id}
      aria-label={subCategoryElementId}
      aria-valuetext={fullName}
      aria-placeholder={path}
      style={{ opacity: (!item.isVisible && areInactivesShowing) ? 0.5 : 1 }}
      className={['pr-0', classes.card, hasBorder ? classes.cardBorder : '']}>
      <TooltipWrapper visible={!item.isVisible && isSortable}>
        <Row align="middle" justify="center">
          {widePicURL ? (
            <ImageWithPopover src={widePicURL} height={50} alt="wide-image"/>
          ) : (
            <ImageWithPopover src={picURL} height={50} alt="square-image"/>
          )}
        </Row>
        <div className={classes.productTitle}>
          {fullName}
        </div>
        <div className={classes.productPrice}>
          <div>{price} {currency()}</div>
          <div>
            <Link to={path}>
              <Button className={classes.detailButton}>D</Button>
            </Link>
          </div>
        </div>
      </TooltipWrapper>
    </Card>
  );
});

export default SortableItem;
