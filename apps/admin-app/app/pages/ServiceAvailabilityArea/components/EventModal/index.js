import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import useStyles from './styles';

export default function EventModal({ event = { x: 100, y: 200 }, onClose, title, children }) {
  const classes = useStyles({ ...event });
  return (
    <div className={classes.modal}>
      <div className={classes.title}>
        <b>{title}</b>
        <Button onClick={onClose}>
          <CloseOutlined />
        </Button>
      </div>
      {children}
    </div>
  );
}
