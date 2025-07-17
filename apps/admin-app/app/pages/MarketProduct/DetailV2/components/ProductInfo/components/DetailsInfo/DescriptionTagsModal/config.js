import { Col, Row } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Button, Image } from '@shared/components/GUI';

export const getColumns = ({
  language,
  handleEdit,
  handleRemove,
  translate,
} = {}) => [
  {
    title: translate('DETAILS_INFO.IMAGE'),
    width: 100,
    key: 'image',
    render: ({ image }) => (
      <Image hasBorder src={image} width={64} height={64} />
    ),
  },
  {
    title: translate('global:NAME_1'),
    key: 'name',
    render: record => record?.name?.[language],
  },
  {
    title: translate('global:ACTION'),
    align: 'right',
    width: 100,
    render: record => {
      return (
        <Row>
          <Col span={12}>
            <Button
              size="small"
              color="secondary"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Col>
          <Col span={12}>
            <Button
              size="small"
              color="danger"
              icon={<DeleteOutlined />}
              onClick={() => handleRemove(record._id)}
            />
          </Col>
        </Row>
      );
    },
  },
];
