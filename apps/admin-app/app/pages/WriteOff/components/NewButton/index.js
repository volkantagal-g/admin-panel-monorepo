import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { usePermission } from '@shared/hooks';
import useStyles from './styles';

function NewButton({ path, label, permKey }) {
  const classes = useStyles();
  const { Can } = usePermission();

  return (
    <Can permKey={permKey}>
      <Button
        size="small"
        variant="contained"
        type="primary"
        icon={<PlusOutlined />}
        className={classes.newButton}
      >
        <Link to={path}>
          {label}
        </Link>
      </Button>
    </Can>
  );
}

export default NewButton;
