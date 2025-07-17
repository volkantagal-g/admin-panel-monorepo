import { Button, Select, Tooltip, Space, Row } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const useCursorPagination = ({
  limit = 10,
  limitOptions = [10, 20, 50, 100],
  isLoading = false,
  handleNext,
  handlePrevious,
  hasNext,
  hasPrev,
  handleLimit,
  disabled,
}) => {
  const { t } = useTranslation(['global']);
  const disable = isLoading || disabled;

  const renderPageSizeOptions = (
    <Select
      options={limitOptions.map(value => ({ value }))}
      defaultValue={limit}
      onChange={handleLimit}
      disabled={disable}
    />
  );
  const prevButton = (
    <Tooltip title={t('PREV')}>
      <Button title={t('PREV')} disabled={!hasPrev || disable} onClick={handlePrevious} icon={<LeftOutlined />} />
    </Tooltip>
  );
  const nextButton = (
    <Tooltip title={t('NEXT')}>
      <Button title={t('NEXT')} disabled={!hasNext || disable} onClick={handleNext} icon={<RightOutlined />} />
    </Tooltip>
  );

  return (
    <Row justify="end">
      <Space>
        {renderPageSizeOptions}
        {prevButton}
        {nextButton}
      </Space>
    </Row>
  );
};

export default useCursorPagination;
