import { Link } from 'react-router-dom';
import { Row, Typography } from 'antd';

import externalLink from '@shared/assets/GUI/Icons/Outline/external-link.svg';
import { usePermission } from '@shared/hooks';

const { Text } = Typography;

const RedirectText = ({ to, text, target, permKey, isIconVisible }) => {
  const { canAccess } = usePermission();

  if (permKey && canAccess(permKey)) {
    if (isIconVisible) {
      return (
        <Row>
          <Text> {text} </Text>
          <Link className="ml-1" to={to} target={target}>  <img src={externalLink} alt="external link icon" width={20} height={20} /></Link>
        </Row>
      );
    }
    return (
      <Link to={to} target={target}>{ text}</Link>
    );
  }

  return text || '';
};

export default RedirectText;
