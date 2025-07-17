import { DragOutlined } from '@ant-design/icons';
import { SortableElement } from 'react-sortable-hoc';

import Card from '@shared/components/UI/AntCard';

const SortableItem = SortableElement(({ value }) => (
  <Card className="toast-z-index">
    <DragOutlined />
    {value}
  </Card>
));

export default SortableItem;
