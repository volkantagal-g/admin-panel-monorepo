import { Col, Row } from 'antd';
import { useTheme } from 'react-jss';
import _ from 'lodash';
import { SortableContainer } from 'react-sortable-hoc';

import SortableItem from '@app/pages/MarketProduct/Sort/components/ProductSort/SortableList/SortableItem';

const SortableList = SortableContainer(({ items, areInactivesShowing, isSortable, subCategoryElementId }) => {
  const theme = useTheme();

  return (
    <Row gutter={theme.spacing(3)}>
      {items.map((item, index) => {
        const displayType = _.get(item, ['item', 'displayType'], '');

        if (!item.isVisible && !areInactivesShowing) return null;

        return (
          <Col
            key={item.item._id}
            className="mb-2"
            span={ displayType ? 24 : 8 }
          >
            <SortableItem
              key={item.item._id}
              subCategoryElementId={subCategoryElementId}
              index={index}
              item={item}
              disabled={!item.isVisible && !areInactivesShowing}
              areInactivesShowing={areInactivesShowing}
              isSortable={isSortable}
            />
          </Col>
        );
      })}
    </Row>
  );
});

export default SortableList;
