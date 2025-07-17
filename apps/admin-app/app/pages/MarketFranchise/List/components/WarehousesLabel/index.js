import PropTypes from 'prop-types';
import { Collapse, Space, Typography } from 'antd';

import { getLangKey, t } from '@shared/i18n';

const { Text } = Typography;
const { Panel } = Collapse;

function WarehousesLabel(props) {
  const { warehouses } = props;

  return (
    <Space size="small">
      <Collapse ghost>
        <Panel header={`${warehouses.length} - ${t('marketFranchisePage:WAREHOUSE')}`}>
          <Space size="small" direction="vertical">
            {
              warehouses.map(warehouse => {
                if (!warehouse.city || !warehouse.city._id) {
                  return null;
                }
                return (<Text key={warehouse._id}>
                  {warehouse.name}
                  <Text type="secondary" code>
                    {warehouse.city.name[getLangKey()]}
                  </Text>
                </Text>);
              })
            }
          </Space>
        </Panel>
      </Collapse>
    </Space>
  );
}

WarehousesLabel.propTypes = { warehouses: PropTypes.array };

export default WarehousesLabel;
