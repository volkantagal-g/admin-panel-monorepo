import { useState } from 'react';
import { Tag } from 'antd';
import * as Yup from 'yup';

const TagRender = props => {
  const { label, value, closable, onClose } = props;
  const [hasError, setHasError] = useState(false);
  const onPreventMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  const schema = Yup.object().shape({ value: Yup.string().email() });
  schema.validate({ value }).catch(() => setHasError(true));

  return (
    <Tag
      color={hasError ? 'error' : ''}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
    >
      {label}
    </Tag>
  );
};

export default TagRender;
