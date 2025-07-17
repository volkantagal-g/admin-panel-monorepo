import { Button } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PlusOutlined } from '@ant-design/icons';

function RedirectButton({ title, to }) {

  return (
    <>
      <Link to={to}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
        >
          {title}
        </Button>
      </Link>
    </>
  );
}

RedirectButton.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
};

export default RedirectButton;
