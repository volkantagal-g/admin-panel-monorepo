import PropTypes from 'prop-types';
import { Button, Collapse, Space, Typography } from 'antd';

import { t } from '@shared/i18n';

const { Text } = Typography;
const { Panel } = Collapse;

function OwnersLabel(props) {
  const { owners } = props;
  return !owners.length ? null : (
    <Space size="small">
      <Collapse ghost>
        <Panel header={`${owners.length} - ${t('marketFranchisePage:OWNER')}`}>
          <Space size="small" direction="vertical">
            {
              owners.map(owner => {
                return (
                  <Text key={owner._id}>
                    {owner.name}
                     - 
                    <Button type="link" href={`tel:+90${owner.gsm}`}>{owner.gsm}</Button>
                  </Text>
                );;
              })
            }
          </Space>
        </Panel>
      </Collapse>
    </Space>
  );
}

OwnersLabel.propTypes = { owners: PropTypes.array };

export default OwnersLabel;
