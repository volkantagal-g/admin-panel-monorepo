import PropTypes from 'prop-types';
import { Button, Space } from 'antd';
import { SlackSquareFilled } from '@ant-design/icons';

function ActionButton(props) {
  const { label, urlPath, isSlack } = props;
  
  const handleClick = () => { };
  
  const getButtonType = () => {
    if (urlPath) {
      return 'link';
    }

    if (label) {
      return 'default';
    }

    if (isSlack) {
      return 'primary';
    }

    return '';
  };

  return (
    <Space>
      <Button
        id={label}
        size="small"
        onClick={handleClick}
        type={getButtonType()}
        icon={isSlack ? <SlackSquareFilled /> : null}
        href={urlPath}
      >
        {label}
      </Button>
    </Space>
  );
}

ActionButton.propTypes = {
  label: PropTypes.string,
  urlPath: PropTypes.string,
  isSlack: PropTypes.bool,
};

export default ActionButton;
