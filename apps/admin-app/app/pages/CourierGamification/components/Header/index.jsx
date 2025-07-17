import { Col, PageHeader, Row, Button } from 'antd';
import { useTranslation } from 'react-i18next';

const CourierGamificationTaskHeader = ({ title, handleClickEdit, handleClickDelete, isEditMode, isVisibleEditAndDeleteButton }) => {
  const { t } = useTranslation(['global']);

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={title}
        />
      </Col>
      {isVisibleEditAndDeleteButton && (
      <Col flex={1}>
        <Row justify="flex-end" align="end" gutter={1}>
          <Col span={4}>
            <Button
              type="primary"
              size="small"
              onClick={handleClickDelete}
              className="w-100"
            >
              {t('button:DELETE')}
            </Button>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              size="small"
              htmlType="submit"
              onClick={handleClickEdit}
              className="w-100"
            >
              {t(isEditMode ? 'button:CANCEL' : 'button:EDIT')}
            </Button>
          </Col>
        </Row>
      </Col>
      )}
    </Row>
  );
};

export default CourierGamificationTaskHeader;
