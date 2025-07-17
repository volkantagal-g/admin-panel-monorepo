import { Empty } from 'antd';

import imgEmpty from '@shared/assets/images/empty.svg';

const TableEmpty = ({ caption, children }) => (
  <Empty
    image={imgEmpty}
    imageStyle={{ height: 60 }}
    style={{ padding: '1rem' }}
    description={(
      <span>
        {caption}
      </span>
    )}
  >
    {children}
  </Empty>
);

export default TableEmpty;
