import { SortableContainer } from 'react-sortable-hoc';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { SortableItem } from '../index';
import useStyles from './styles';

const SortableList = SortableContainer(({ items, disabled }) => {
  const classes = useStyles();
  return (
    <div className={classes.listContainer}>
      {items.map((value, index) => (
        <SortableItem
          disabled={disabled}
          index={index}
          key={get(value, ['_id'])}
          value={get(value, ['name', getLangKey()], '-')}
        />
      ))}
    </div>
  );
});
export default SortableList;
