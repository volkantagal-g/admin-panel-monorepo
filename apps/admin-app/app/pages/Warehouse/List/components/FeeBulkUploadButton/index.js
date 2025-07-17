import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';

import useStyles from './styles';

function FeeBulkUploadButton({ title, to }) {
  const classes = useStyles();

  return (
    <Button size="small" variant="contained" type="primary" icon={<PlusOutlined />} className={classes.feeBulkUploadButton}>
      <Link to={to}>{title}</Link>
    </Button>
  );
}

FeeBulkUploadButton.propTypes = {};

export default FeeBulkUploadButton;
