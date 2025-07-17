import { memo } from 'react';
import { Badge, Popover, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { danger } from '@shared/components/GUI/styles/guiThemes';

const { Paragraph, Text } = Typography;

export const ErrorBadge = memo(function ErrorBadge({ title, errors }) {
  const popoverContent = (
    <div>
      {errors?.map(error => {
        return (
          <Paragraph>
            <CloseCircleOutlined style={{ color: danger }} className="mr-1" />
            <Text strong className="mr-1">
              {error?.message}
            </Text>
          </Paragraph>
        );
      })}
    </div>
  );

  return (
    <Popover placement="bottom" title={title} content={popoverContent}>
      <Badge count={errors?.length} className="ml-2" />
    </Popover>
  );
});

ErrorBadge.propTypes = {
  title: PropTypes.string,
  errors: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
};

ErrorBadge.defaultProps = {
  title: '',
  errors: undefined,
};
