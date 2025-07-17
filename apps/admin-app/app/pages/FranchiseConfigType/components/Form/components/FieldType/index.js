import { Tag } from 'antd';

import { fieldTypes } from '@app/pages/FranchiseConfigType/constants';

const findTypeLabel = type => {
  const typeLabel = fieldTypes.find(item => item.value === type);
  return typeLabel ? typeLabel.label : type;
};

const getDataTypeColor = type => {
  const colors = {
    string: 'blue',
    integer: 'green',
    boolean: 'purple',
    date: 'orange',
    objectId: 'cyan',
    translation: 'magenta',
    warehouseDomain: 'volcano',
  };

  return colors[type] || 'default';
};

const FieldType = ({ type }) => <Tag color={getDataTypeColor(type)}>{findTypeLabel(type)}</Tag>;

export default FieldType;
