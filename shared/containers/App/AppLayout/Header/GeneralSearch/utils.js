import { Typography } from 'antd';

export const getCommonTypography = text => {
  return (
    <Typography.Text ellipsis={{ tooltip: text }} style={{ color: 'unset' }}>
      {text}
    </Typography.Text>
  );
};

// assume empty if string length is less than 3
export const getValidatedSearchText = searchText => {
  const trimmed = searchText?.trim() || '';
  return trimmed.length > 2 ? trimmed : '';
};
